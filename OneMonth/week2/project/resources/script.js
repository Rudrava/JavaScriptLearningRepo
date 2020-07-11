// GET INPUT

// CLICK
var searchText = '';
var button = document.getElementById('submit-button');	//gets button
button.addEventListener('click', function () {
	if (document.contains(document.getElementById("wrapper"))) {
    	 	document.getElementById("wrapper").remove()
    	 }
	// on click activates
	searchText = (document.getElementById("search-text").value);
	console.log(searchText);	//logs the search input
	go(search(searchText));
	if(searchText == ''){
		// toggle container visibility
		// by switching it to none and then its default ie. block
		// the elese stament basically unhides it 
		// and the if statement checks if blank input was given
			document.getElementById('wrapper').style.display = "none";
	}
	else{
		document.getElementById('wrapper').style.display = "block";
	}
	// pushToDOM();
});


// Enter
textInput = document.getElementById('search-text');
textInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
    	 if (document.contains(document.getElementById("wrapper"))) {
    	 	document.getElementById("wrapper").remove()
    	 }
    	// activates on Enter pressed
		searchText = (document.getElementById("search-text").value);
		console.log(searchText);	//logs the search input
		go(search(searchText));
  //   	if(searchText == ''){
		// // toggle wrapper visibility
		// // by switching it to none and then its default ie. block
		// // the elese stament basically unhides it 
		// // and the if statement checks if blank input was given
		// 	document.getElementById('wrapper').style.display = "none";
		// }
		// else{
		// document.getElementById('wrapper').style.display = "block";
		// }
    	// pushToDOM();
    }
});

// 
document.getElementById("search-text").addEventListener('focus', function () {
		button.style.backgroundColor = "green";
})



// request API
var go = function (url){
	// AJAX Request
	console.log('visiting'+url);
	var GiphyAJAXCall = new XMLHttpRequest();
	GiphyAJAXCall.open( 'GET', url );
	GiphyAJAXCall.send();

	GiphyAJAXCall.addEventListener('load',function(e){

	  var data = e.target.response;
	  pushToDOM(data);

	});
}
var search = function searchMethod(text){
	textArr = text.split(' '); 
	var searchTerm = '';
	if (textArr.length >1){
		textArr.forEach(function (searchChunk, index) {
			if(index < textArr.length - 1){
				searchTerm += searchChunk + '+';
			}
			else{
				searchTerm += searchChunk;
			}
		})
			console.log('http://api.giphy.com/v1/gifs/search?q='+searchTerm+'&api_key=xJ9Vw7eLAHrpXTnFKDENcNMOgdHWE0tz');
			return  'http://api.giphy.com/v1/gifs/search?q='+searchTerm+'&api_key=xJ9Vw7eLAHrpXTnFKDENcNMOgdHWE0tz';
	}
	else{
		console.log('http://api.giphy.com/v1/gifs/search?q='+searchTerm+'&api_key=xJ9Vw7eLAHrpXTnFKDENcNMOgdHWE0tz');
		return  'http://api.giphy.com/v1/gifs/search?q='+textArr[0]+'&api_key=xJ9Vw7eLAHrpXTnFKDENcNMOgdHWE0tz';
	}
}


/* 3. Show me the GIFs */


function pushToDOM(input) {

  var response = JSON.parse(input);
  var imageUrls = response.data;
  body = document.querySelector('body');
    var wrapper = document.createElement("div");
    wrapper.id = 'wrapper';
    body.appendChild(wrapper);

  imageUrls.forEach(function(image){

    var src = image.images.fixed_height.url;
    console.log(src);

    var container = document.createElement("div");
    container.id = 'container';
    container.innerHTML += "<img src=\"" + src + "\" class=\"container-image\">";
    wrapper.appendChild(container);
    });
}