console.log('hi');
function clickHandler(action){
	console.log(action);
	return function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    	chrome.tabs.sendMessage(tabs[0].id, {"action": action});
		});
	};
};

// document.getElementById('show').addEventListener('click', clickHandler('show_anchors'));
// document.getElementById('hide').addEventListener('click', clickHandler('hide_anchors'));
document.addEventListener('DOMContentLoaded', function(){
												document.getElementById('show').addEventListener('click', clickHandler('show_anchors'));
											});
document.addEventListener('DOMContentLoaded', function(){
												document.getElementById('hide').addEventListener('click', clickHandler('hide_anchors'));
											});