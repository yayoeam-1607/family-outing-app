import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, mkdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildWorker, appBase } from "../scripts/pwa-build.js";
import { isStandalone, isAppleMobile, installPwa } from "../pwa.js";
const manifest = JSON.parse(
  await readFile(
    new URL("../public/manifest.webmanifest", import.meta.url),
    "utf8",
  ),
);
function platform({ apple = false, standalone = false } = {}) {
  const media = new EventTarget();
  media.matches = standalone;
  const win = new EventTarget();
  win.matchMedia = () => media;
  win.navigator = {
    userAgent: apple ? "iPhone" : "Android",
    platform: apple ? "iPhone" : "Linux",
    maxTouchPoints: 1,
    standalone,
  };
  win.isSecureContext = true;
  const nodes = Object.fromEntries(
    ["pwa-install", "pwa-install-button", "pwa-install-help"].map((id) => [
      id,
      Object.assign(new EventTarget(), {
        hidden: false,
        disabled: false,
        textContent: "",
      }),
    ]),
  );
  const doc = new EventTarget();
  doc.getElementById = (id) => nodes[id];
  doc.readyState = "complete";
  doc.visibilityState = "visible";
  return { win, doc, nodes, media };
}
test("manifestとアイコンはGitHub Pagesの同じサブパス・standaloneに揃う", async () => {
  assert.equal(manifest.name, "今日どこ行く？");
  assert.equal(manifest.short_name, manifest.name);
  assert.equal(
    manifest.description,
    "家族のおでかけ先を探して、思い出も残せる家族専用おでかけアプリ",
  );
  assert.equal(manifest.start_url, appBase);
  assert.equal(manifest.scope, appBase);
  assert.equal(manifest.id, appBase);
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.orientation, "portrait-primary");
  for (const icon of manifest.icons) {
    assert.ok(icon.src.startsWith(appBase));
    const data = await readFile(
      new URL("../public/" + icon.src.slice(appBase.length), import.meta.url),
    );
    assert.equal(data.subarray(1, 4).toString(), "PNG");
    const [w, h] = icon.sizes.split("x").map(Number);
    assert.equal(data.readUInt32BE(16), w);
    assert.equal(data.readUInt32BE(20), h);
  }
  assert.ok(manifest.icons.some((i) => i.sizes === "192x192"));
  assert.ok(
    manifest.icons.some(
      (i) => i.sizes === "512x512" && i.purpose === "maskable",
    ),
  );
  const apple = await readFile(
    new URL("../public/icons/apple-touch-icon.png", import.meta.url),
  );
  assert.equal(apple.readUInt32BE(16), 180);
});
test("ビルドの内容とworker変更で更新識別子が変わり、再ビルドだけでは変わらない", async () => {
  const dir = await mkdtemp(join(tmpdir(), "outing-pwa-"));
  try {
    await mkdir(join(dir, "assets"));
    await writeFile(join(dir, "index.html"), "old");
    await writeFile(join(dir, "assets", "app.js"), "old");
    await writeFile(join(dir, "assets", "app.js.map"), "not cached");
    const first = await buildWorker(dir);
    const identical = await buildWorker(dir);
    assert.equal(first.version, identical.version);
    assert.deepEqual(first.assets, ["assets/app.js", "index.html"]);
    const sw = await readFile(join(dir, "sw.js"), "utf8");
    assert.ok(sw.includes("/family-outing-app/assets/app.js"));
    assert.ok(sw.includes("self.skipWaiting()"));
    assert.ok(sw.includes("self.clients.claim()"));
    assert.equal(sw.includes("localStorage."), false);
    assert.ok(!sw.includes("__BUILD_VERSION__"));
    await writeFile(join(dir, "assets", "app.js"), "new");
    const second = await buildWorker(dir);
    assert.notEqual(first.version, second.version);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
test("standaloneでは案内を隠し、iPhoneとiPadは共有からの案内を表示する", () => {
  const installed = platform({ standalone: true });
  installPwa(installed.win, installed.doc, {
    production: false,
    base: appBase,
  });
  assert.equal(installed.nodes["pwa-install"].hidden, true);
  assert.equal(isStandalone(installed.win), true);
  const apple = platform({ apple: true });
  installPwa(apple.win, apple.doc, { production: false, base: appBase });
  assert.ok(apple.nodes["pwa-install-help"].textContent.includes("共有ボタン"));
  assert.equal(apple.nodes["pwa-install-button"].hidden, true);
  assert.equal(
    isAppleMobile({
      userAgent: "Macintosh",
      platform: "MacIntel",
      maxTouchPoints: 5,
    }),
    true,
  );
});
test("Androidの提示イベントがある時だけ追加ボタンを出し、二重promptを防ぐ", async () => {
  const p = platform();
  installPwa(p.win, p.doc, { production: false, base: appBase });
  assert.equal(p.nodes["pwa-install-button"].hidden, true);
  let calls = 0;
  const e = new Event("beforeinstallprompt", { cancelable: true });
  e.prompt = async () => {
    calls++;
  };
  e.userChoice = Promise.resolve({ outcome: "accepted" });
  p.win.dispatchEvent(e);
  assert.equal(e.defaultPrevented, true);
  assert.equal(p.nodes["pwa-install-button"].hidden, false);
  p.nodes["pwa-install-button"].dispatchEvent(new Event("click"));
  p.nodes["pwa-install-button"].dispatchEvent(new Event("click"));
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(calls, 1);
  assert.equal(p.nodes["pwa-install-button"].hidden, true);
  p.win.dispatchEvent(new Event("appinstalled"));
  assert.equal(p.nodes["pwa-install"].hidden, true);
});
test("workerは本番だけ正しいscopeで登録し、起動・復帰・再接続に更新確認する", async () => {
  const p = platform();
  let args,
    updates = 0;
  p.win.navigator.onLine = true;
  p.win.navigator.serviceWorker = {
    register: async (...values) => {
      args = values;
      return {
        update: async () => {
          updates++;
        },
      };
    },
  };
  installPwa(p.win, p.doc, { production: true, base: appBase });
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual(args, [
    appBase + "sw.js",
    { scope: appBase, updateViaCache: "none" },
  ]);
  assert.equal(updates, 1);
  p.doc.dispatchEvent(new Event("visibilitychange"));
  p.win.dispatchEvent(new Event("online"));
  assert.equal(updates, 3);
  const dev = platform();
  let registered = false;
  dev.win.navigator.serviceWorker = {
    register: async () => {
      registered = true;
    },
  };
  installPwa(dev.win, dev.doc, { production: false, base: appBase });
  assert.equal(registered, false);
});
