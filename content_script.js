
if(window.location.pathname.match('\/[^/]*\/')[0] == window.location.pathname){
	chrome.runtime.sendMessage({action: "show"});
}

