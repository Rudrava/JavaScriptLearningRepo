// API PARSE
var SoundCloudAPI = {
	init: function () {
		SC.initialize({
			client_id: "cd9be64eeb32d1741c17cb39e41d254d",
		});
	},

	getTrack: function (query) {
		SC.get("/tracks", {
			q: query
		}).then(function (tracks) {
			console.log(tracks);
			if (tracks[0] === undefined){
				SoundCloudAPI.artist("na", "no artist found", "http://lorempixel.com/100/140/abstract")
			}
			
			SoundCloudAPI.trackCards(tracks);
			SoundCloudAPI.artist(tracks[0]['user']['permalink_url'], tracks[0]['user']['username'], tracks[0]['user']['avatar_url'])
		});
	},

	artist: function(link, name, photo){
		// console.log(name, photo);
		// aartist wrapper start
		var artistWrapper = document.querySelector('.artist-showcase');
		
		var contentHeader = document.createElement("div");
		contentHeader.className = "artistHeader";
		artistWrapper.appendChild(contentHeader);

		// artistName 
		var artistName = document.createElement("h1");
		artistName.innerText = name; 
		contentHeader.appendChild(artistName);

		// artist image
		var image = document.createElement("img");
		image.className = "artistImage";
		image.src = photo || "https://via.placeholder.com/290x290";
		artistWrapper.appendChild(image);
		
	},

	trackCards: function (cardInfo) {

		cardInfo.forEach(function(track){
			var wrapper = document.querySelector(".js-search-results");
			// card wrapper
			var card = document.createElement("div");
			card.className = "card";
			card.id = "removeThis"

			// display Image
			var imageDiv = document.createElement("div");
			imageDiv.className = "image";

			var image = document.createElement("img");
			image.className = "image_img";
			image.src = track['artwork_url'] || "http://lorempixel.com/100/140/abstract";
			imageDiv.appendChild(image);

			//content - start
			//content-wrapper
			var content = document.createElement("div");
			content.className = "content";

			// content header

			var contentHeader = document.createElement("div");
			contentHeader.className = "header";
			content.appendChild(contentHeader);

			// link
			var songLink = document.createElement("a");
			songLink.href =
				track['permalink_url'];
			songLink.target = "_blank";
			songLink.innerText = track['title'];
			contentHeader.appendChild(songLink);

			//content-end

			//button
			var button = document.createElement("div");
			button.classList.add("ui", "bottom", "attached", "button", "js-button");

			// i dunno what
			var icon = document.createElement("i");
			icon.classList.add("add", "icon");
			button.appendChild(icon);

			var span = document.createElement("span");
			span.innerText = "Add to playlist";
			button.appendChild(span);

			// card-end
			wrapper.insertBefore(card, wrapper.firstChild);
			card.appendChild(imageDiv);
			card.appendChild(content);
			card.appendChild(button);
			// add to pplaylist function
			button.addEventListener("click", function () {
				SoundCloudAPI.adddToPlaylist(track.permalink_url)
			})
		});
	},

	// add to playlist
	adddToPlaylist: function (songURL) {
		// console.log('click');
		SC.oEmbed(songURL, {
		  auto_play: true
		}).then(function(embed){
		  // console.log('oEmbed response: ', embed);

		  var playlist = document.querySelector(".js-playlist");

		  var box = document.createElement('div');
		  box.innerHTML = embed.html;
		  playlist.insertBefore(box, playlist.firstChild);
		  localStorage.setItem("key", playlist.innerHTML);
		});
	}

};

var search = document.querySelector('.js-search');
var submit = document.querySelector('.js-submit');
submit.addEventListener('click', function(){
	var artistWrapper = document.querySelector('.artist-showcase');
	if (artistWrapper.contains(document.querySelector(".artistHeader"))) {
    	 	// console.log('contains artistHeader deleting');
    	 	document.querySelector(".artistHeader").remove()
    	 }
    if (artistWrapper.contains(document.querySelector(".artistImage"))) {
    	 	document.querySelector(".artistImage").remove()
    	 }

	var searchText = search.value
	// console.log(searchText);
	SoundCloudAPI.getTrack(searchText);
})
search.addEventListener('keypress', function(pressed){

	if (pressed.key === 'Enter'){
		var artistWrapper = document.querySelector('.artist-showcase');
		if (artistWrapper.contains(document.querySelector(".artistHeader"))) {
	    	 	// console.log('contains artistHeader deleting');
	    	 	document.querySelector(".artistHeader").remove()
	    	 }
	    if (artistWrapper.contains(document.querySelector(".artistImage"))) {
	    	 	document.querySelector(".artistImage").remove()
	    	 }
	    
	  
		var searchText = search.value
		SoundCloudAPI.getTrack(searchText);
	}
})

var playlist = document.querySelector(".js-playlist");
playlist.innerHTML = localStorage.getItem("key");
SoundCloudAPI.init();
SoundCloudAPI.getTrack("Aryendra Khan");
