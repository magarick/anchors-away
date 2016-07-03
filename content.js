//The code that is fired upon page load
//to check your plugin js is working uncomment the next line.
//$("body").append('Test');

// Constants
var tags_to_vanish = ['#regularprice_savings td.a-span12.a-color-price.a-size-base', // Regular item page 'list'
					  '#price td.a-span12.a-color-secondary.a-size-base.a-text-strike', // Regular item page 'savings'
					  '#dealprice_savings td.a-span12.a-color-price.a-size-base', // On deal of the day pages
					  '#buyBoxInner div.a-column.a-span7.a-text-right.a-span-last', // Special item page everything
					  'div.priceBlock > span.productYouSave', // Multi-item page
					  'div.priceBlock > span.savePrice', //Same as above
					  'span.a-size-small.a-color-secondary.a-text-strike',
					  '#price  .a-text-strike',
					  '#regularprice_savings'
					  ] // Need to do this a better way.
var invis_class = 'anchors_invisible';


hide_anchors = function(){
	$('.anchors_invisible').css({"display":"none"});
};

show_anchors = function(){
	$('.anchors_invisible').css({"display":"inline"});
};

set_tags = function(){
	for (var i = 0; i < tags_to_vanish.length; i++){
		$(tags_to_vanish[i]).addClass(invis_class);
	}
};


set_tags();
hide_anchors();

chrome.runtime.onMessage.addListener(function(msg, sender, sendresponse){
	console.log(msg);
	console.log(sender);
	if(msg.action && (msg.action === 'show_anchors')){
		show_anchors();
		console.log('show');
	}
	else if(msg.action && (msg.action === 'hide_anchors')){
		hide_anchors();
		console.log('hide');
	}
});

var observerConfig = {
	characterData: true,
	attributes: true,
};

var observer = new MutationObserver(function(mutations){
	console.log('what?')
	mutations.forEach(function(mutation) {
      console.log('mutation.type = ' + mutation.type);
      for (var i = 0; i < mutation.addedNodes.length; i++) {
        console.log('  "' + mutation.addedNodes[i].textContent + '" added');
      }
      
      for (var i = 0; i < mutation.removedNodes.length; i++) {
        console.log('  "' +mutation.removedNodes[i].textContent + '" removed');
      }
    });
	set_tags();
	hide_anchors();
});
//observer.observe(document.body, observerConfig)
observer.observe($('#price_feature_div')[0], observerConfig)
