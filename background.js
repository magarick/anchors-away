// Show page action icon in omnibar.
function showPageAction( tabId, changeInfo, tab ) {
	if(tab.url.indexOf('amazon.co') > -1){
		chrome.pageAction.show(tabId);
		console.log('a')
	};
};
// Call the above function when the url of a tab changes.
chrome.tabs.onUpdated.addListener(showPageAction);