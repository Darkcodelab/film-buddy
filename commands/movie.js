//IMPORTS
require("dotenv").config();

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { RichEmbed } = require("discord.js");
//IMPORTS

//CODE TO EXECUTE
module.exports = {
  name: "movie",
  description: "information about the requested movie",
  execute(message, args) {
    const movieUrl = `http://www.omdbapi.com/?apikey=${process.env.movieAPI}&t=${args}&r=json`; //Movie (api) url

    //get movie details from url using xmlhttpsreq
    function httpGet(theUrl) {
      try {
        var xmlHttp = null;

        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        var movieDetailsText = xmlHttp.responseText;
        var movieDetailsJson = JSON.parse(movieDetailsText);
        //get movie details from url using xmlhttpsreq

        //REGEX to check if url is valid
        const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gi;
        //REGEX to check if url is valid

        //Function to test REGEX
        function urlChecker(url) {
          return urlRegex.test(url)
            ? url
            : "https://github.com/Darkcodelab/film-buddy/blob/master/images/imagenotfound.png?raw=true";
        }
        //Function to test REGEX

        if (movieDetailsJson.Response == "False") {
          message.channel.send("Error");
        } else {
          var movieDetailsEmbed = new RichEmbed()
            .setColor("#BBADFF")
            .setTitle(movieDetailsJson.Title)
            // .setThumbnail(urlChecker(movieDetailsJson.Poster))
            .setDescription(
              `**Released** : ${movieDetailsJson.Released} 
          **Rated**: ${movieDetailsJson.Rated}
          **Runtime**: ${movieDetailsJson.Runtime}
          **Genre**: ${movieDetailsJson.Genre}
          **Director**: ${movieDetailsJson.Director}
          **Actors**: ${movieDetailsJson.Actors}
          **Language**: ${movieDetailsJson.Language}
          **Awards**: ${movieDetailsJson.Awards}
          **Plot**: ${movieDetailsJson.Plot}
          **IMDB Rating**: ${movieDetailsJson.imdbRating}
          **Meta Score**: ${movieDetailsJson.Metascore}
          **IMDB ID**: ${movieDetailsJson.imdbID}
          **Box Office**: ${movieDetailsJson.BoxOffice}
          **Production**: ${movieDetailsJson.Production}
          
          `
            )
            .setImage(urlChecker(movieDetailsJson.Poster))
            .setTimestamp();
          message.channel
            .send(movieDetailsEmbed)
            .then(function(message) {
              message.react("👎");
              message.react("👍");
            })
            .catch(function() {
              msg.channel.send("error");
            });
        }
      } catch (error) {
        console.log(error);
      }
    }
    httpGet(movieUrl);
  }
};
//CODE TO EXECUTE
