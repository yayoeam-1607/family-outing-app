export function isStandalone(win) {
  return (
    win.matchMedia("(display-mode: standalone)").matches ||
    win.navigator.standalone === true
  );
}
export function isAppleMobile(nav) {
  return (
    /iPad|iPhone|iPod/.test(nav.userAgent) ||
    (nav.platform === "MacIntel" && nav.maxTouchPoints > 1)
  );
}
export function installPwa(
  win = window,
  doc = document,
  { production = import.meta.env.PROD, base = import.meta.env.BASE_URL } = {},
) {
  const section = doc.getElementById("pwa-install"),
    button = doc.getElementById("pwa-install-button"),
    help = doc.getElementById("pwa-install-help");
  let pending = null;
  const render = () => {
    section.hidden = isStandalone(win);
    if (section.hidden) return;
    const apple = isAppleMobile(win.navigator);
    button.hidden = !pending || apple;
    help.textContent = apple
      ? "Safariの共有ボタン →「ホーム画面に追加」で、アプリとして使えます。"
      : "Chrome等のメニュー →「アプリをインストール」または「ホーム画面に追加」。";
  };
  win.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    pending = event;
    render();
  });
  win.addEventListener("appinstalled", () => {
    pending = null;
    section.hidden = true;
  });
  win
    .matchMedia("(display-mode: standalone)")
    .addEventListener("change", render);
  button.addEventListener("click", async () => {
    if (!pending) return;
    const prompt = pending;
    pending = null;
    button.disabled = true;
    try {
      await prompt.prompt();
      await prompt.userChoice;
    } catch {
      // Browsers may cancel the install prompt; the menu instructions remain available.
    } finally {
      button.disabled = false;
      render();
    }
  });
  render();
  if (
    !production ||
    !win.isSecureContext ||
    !("serviceWorker" in win.navigator)
  )
    return;
  const register = async () => {
    try {
      const registration = await win.navigator.serviceWorker.register(
        base + "sw.js",
        { scope: base, updateViaCache: "none" },
      );
      // A new build activates automatically. Do not interrupt unsaved forms by reloading.
      const update = () => {
        if (win.navigator.onLine) registration.update().catch(() => {});
      };
      update();
      doc.addEventListener("visibilitychange", () => {
        if (doc.visibilityState === "visible") update();
      });
      win.addEventListener("online", update);
    } catch (error) {
      console.warn(
        "オフライン起動の準備ができませんでした。オンライン利用と保存データはそのまま使えます。",
        error,
      );
    }
  };
  if (doc.readyState === "complete") void register();
  else win.addEventListener("load", register, { once: true });
}
