// popup.js
chrome.storage.local.get("usage", (res) => {
  const usage = res.usage || {};
  const list = document.getElementById("list");

  for (const [site, time] of Object.entries(usage)) {
    const li = document.createElement("li");
    li.textContent = `${site}: ${(time / 1000).toFixed(1)} sec`;
    list.appendChild(li);
  }
});
