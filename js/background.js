chrome.runtime.setUninstallURL("https://1ce.org");

if (!localStorage.created) {
  chrome.tabs.create({ url: "https://1ce.org" });
  var manifest = chrome.runtime.getManifest();
  localStorage.ver = manifest.version;
  localStorage.created = 1;
}

chrome.browserAction.onClicked.addListener(function(tab) { 
    chrome.tabs.create({url:chrome.extension.getURL('pages/notepad.html')})  
});