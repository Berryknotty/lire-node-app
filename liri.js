var action = process.argv[2];
var theItem = process.argv[3];

if (action === 'spotify') {
    spotifySearch();
}

else if (action === 'twitter') {
    twitters(); 
}

else if (action === 'movie') {
    movie();
}

else {
    
}

function spotifySearch(){
    var spotify = require('spotify');
    spotify.search({ type: 'track', query: action }, function(err, data) {
       
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        else {
            for (var key in data) {
                console.log("Artist:" + data[key].items[0].artists[0].name);
                console.log("The song name is " + data[key].items[0].name);
                console.log("The preview link of the song from spotify " + data[key].items[0].preview_url);
                console.log("The album that the song is from "+ data[key].items[0].album.name);
            }
        }
    });        
}

function twitters() {
    var Twitter = require('twitter');
    var tweetKeys = require("./keys.js").twitterKeys;
    var client = new Twitter ({
		consumer_key: tweetKeys.consumer_key,
		consumer_secret: tweetKeys.consumer_secret,
		access_token_key: tweetKeys.access_token_key,
		access_token_secret: tweetKeys.access_token_secret
    });

    var params = {screen_name: 'berryknotty'};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < 20; i++) {
                console.log( (i+1) + ". " + tweets[i].text);
            }
        }
    });    
}


function movie() {
    
    var apiKey = '40e9cece';
    var request = require("request");
  
    request("http://www.omdbapi.com/?t=" + theItem + "&apikey=40e9cece", function(error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log("Movie Title: " + JSON.parse(body).Title);
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        console.log("Release Date: " + JSON.parse(body).Country);
        console.log("Movie Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
    }
    });
        
}