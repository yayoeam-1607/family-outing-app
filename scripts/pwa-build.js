import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve, relative } from "node:path";
import { createHash } from "node:crypto";
export const appBase = "/family-outing-app/";
export async function buildWorker(outDir, base = appBase) {
  async function files(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    return (
      await Promise.all(
        entries.map((e) =>
          e.isDirectory()
            ? files(resolve(dir, e.name))
            : [resolve(dir, e.name)],
        ),
      )
    ).flat();
  }
  const assets = (await files(outDir))
    .filter(
      (path) =>
        !["sw.js", ".nojekyll"].includes(relative(outDir, path)) &&
        !path.endsWith(".map"),
    )
    .sort();
  const template = await readFile(
    new URL("./service-worker.template.js", import.meta.url),
    "utf8",
  );
  const digest = createHash("sha256").update(template).update(base);
  for (const path of assets)
    digest.update(relative(outDir, path)).update(await readFile(path));
  const version = digest.digest("hex").slice(0, 20);
  const worker = template
    .replace("__BUILD_VERSION__", JSON.stringify(version))
    .replace("__APP_BASE__", JSON.stringify(base))
    .replace(
      "__PRECACHE_ASSETS__",
      JSON.stringify(
        assets.map(
          (path) => base + relative(outDir, path).split("\\").join("/"),
        ),
      ),
    );
  await writeFile(resolve(outDir, "sw.js"), worker);
  await writeFile(resolve(outDir, ".nojekyll"), "");
  return { version, assets: assets.map((path) => relative(outDir, path)) };
}
export function pwaBuild() {
  let outDir;
  return {
    name: "family-outing-pwa",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      await buildWorker(outDir);
    },
  };
}
