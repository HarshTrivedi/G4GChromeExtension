

chrome.storage.sync.get(['user_id','password']) , function(user){
	if(user.user_id && user.password){
		$('#user_id').text(user.user_id);
		$('#password').text(user.password);
	}
});


$('#save_details').on('click' , function(){
	chrome.storage.sync.set({user_id: $('#user_id').text() });
	chrome.storage.sync.set({user_id: $('#password').text() });
});

$('#save_scheduler').on('click' , function(){
	if($('#auto_login').checked){
		chrome.storage.sync.set({auto_login: true });
		chrome.storage.sync.set({minutes: true });
	}
});