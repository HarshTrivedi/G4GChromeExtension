
chrome.tabs.query({active: true , currentWindow: true} , function(tabs){
	url = tabs[0].url;
	var article_name =	url.replace("http://www.geeksforgeeks.org/" , "").replace("/" , "");
	var read_key = "read:" + article_name;
	var difficulty_key = "diff:" + article_name;
	var last_view_key = "date:" + article_name;
	chrome.storage.sync.get(difficulty_key , function(result){
		if( result[difficulty_key] ){
			var difficulty = result[difficulty_key];
			difficulty = Number(difficulty);
			var radios = document.getElementsByTagName('input');
			var value;
			for (var i = 0; i < radios.length; i++) {
			    if (radios[i].type === 'radio' && radios[i].value == difficulty) {
			    	radios[i].checked = true;
			    }
			}
		}
	});
	chrome.storage.sync.get(read_key , function(result){
		if( result[read_key] ){
				var count = result[read_key];
				$('#read_times').html("Read Times " + count);
		}
	});
});


$('#read').on('click' , function(){
	chrome.tabs.query({active: true , currentWindow: true} , function(tabs){
		url = tabs[0].url;
		var article_name =	url.replace("http://www.geeksforgeeks.org/" , "").replace("/" , "");
		var read_key = "read:" + article_name;
		var difficulty_key = "diff:" + article_name;
		var last_view_key = "date:" + article_name;
		chrome.storage.sync.get(read_key , function(result){
			if( result[read_key] ){
				var count = result[read_key];
				count = Number(count);
				$('#read_times').html("Read Times " + count);
				var storage_obj = {};
				storage_obj[read_key] = count + 1;
				chrome.storage.sync.set( storage_obj );
			}else{
				var storage_obj = {};
				storage_obj[read_key] = 1;
				chrome.storage.sync.set( storage_obj );
			}
			date = new Date();
			date = date.getDate() + "|" + date.getMonth() + "|" + (date.getYear() + 1900);
			storage_obj = {};
			storage_obj[last_view_key] = date;
			chrome.storage.sync.set( storage_obj );			
		});
		var radios = document.getElementsByTagName('input');
		var value;
		for (var i = 0; i < radios.length; i++) {
		    if (radios[i].type === 'radio' && radios[i].checked) {
		        difficulty = radios[i].value;
				var storage_obj = {};
				storage_obj[difficulty_key] = difficulty;
		        chrome.storage.sync.set( storage_obj );
		    }
		}
		var options = {
			type: "basic",
			title: "GeeksforGeeks",
			message: "Marked article Read!",
			iconUrl: "icon.png"
		}
		chrome.notifications.create("read" , options , function(){
			window.close();
		});

	});		
});


$('input:radio').on('click' , function(){
	chrome.tabs.query({active: true , currentWindow: true} , function(tabs){
		url = tabs[0].url;
		var article_name =	url.replace("http://www.geeksforgeeks.org/" , "").replace("/" , "");
		var read_key = "read:" + article_name;
		var difficulty_key = "diff:" + article_name;
		var last_view_key = "date:" + article_name;
		var radios = document.getElementsByTagName('input');
		for (var i = 0; i < radios.length; i++) {
		    if (radios[i].type === 'radio' && radios[i].checked) {
		        var difficulty = radios[i].value;
				var storage_obj = {};
				storage_obj[difficulty_key] = difficulty;
		        chrome.storage.sync.set( storage_obj );
		    }
		}
	});
});
