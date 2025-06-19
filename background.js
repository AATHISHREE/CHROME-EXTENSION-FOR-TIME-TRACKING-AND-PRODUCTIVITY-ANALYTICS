let currentSite = null;
let startTime = Date.now();

function updateSiteTime(url) {
  try {
    if (!url || !url.startsWith("http")) return;

    const domain = new URL(url).hostname;
    const now = Date.now();

    if (currentSite) {
      const timeSpent = now - startTime;

      chrome.storage.local.get("usage", (res) => {
        const usage = res.usage || {};
        usage[currentSite] = (usage[currentSite] || 0) + timeSpent;
        chrome.storage.local.set({ usage });
      });
    }

    currentSite = domain;
    startTime = now;
  } catch (err) {
    console.error("Invalid URL:", url, err);
  }
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  updateSiteTime(tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    updateSiteTime(tab.url);
  }
});


