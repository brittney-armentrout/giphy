//Initialize Variables
var topics = ["birds", "cats", "dogs", "hedgehogs", "narwhals", "snakes", "lions", "pikachu", "monster", "taco", "nachos", 
            "sunshine", "skiing", "music", "dance", "waterfall"];


$(document).ready(function () {

    function renderButtons() {
        $("#button-area").empty();

        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("gif btn-primary align-center");
            newButton.attr("data-name", topics[i]);
            newButton.text(topics[i]);
            $("#button-area").append(newButton);
        };
    };

    $("#add-gif").on("click", function (event) {

        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        // Adding subject from the textbox to our array
        topics.push(gif);

        renderButtons();
    });

    function displayGifs() {

        var gifName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            gifName + "&api_key=k7CBQf6b6cm7pL4RJkBQlizNk5kPP0Px&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET"
            })

            .done(function (response) {

                var results = response.data;
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var r = $("<p>").text(" Rating: " + rating);

                    var title = results[i].title;
                    var t = $("<h5>").text("Title: " + title);

                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    console.log(results[i]);
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    gifImage.attr("data-state", "still");
                    gifImage.attr("class", "image");
                    
                    gifDiv.prepend(r);
                    gifDiv.prepend(t);
                    
                    gifDiv.prepend(gifImage);
                    $("#giphy-area").prepend(gifDiv);
                }

                $(".image").on("click", function () {


                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });



    };


    $(document).on("click", ".gif", displayGifs);

    renderButtons();

});