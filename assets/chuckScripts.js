
var queryURL = "http://api.icndb.com/jokes/random";

$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function (response) {
        console.log(response);
        var chuckJokes = response.value.joke
        $("#chuck-jokes").append(chuckJokes);
    });
