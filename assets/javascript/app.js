//Initialize Variables
var topics = ["cats", "dogs", "hedgehogs", "narwhals", "snakes", "lions", "pikachu", "monster", "taco", "nachos",
    "sunshine", "skiing", "music", "dance", "waterfall", "maple", "milkshakes", "funk"
];


$(document).ready(function () {
    
    //Using topics array, create pre-loaded buttons 
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

    //Use .on("click") function to trigger the AJAX call
    $("#add-gif").on("click", function(event) {

        //this prevents the event from trying to submit itself
        event.preventDefault();

        //Grab the text from the input box
        var gif = $("#gif-input").val().trim();
        //Add subject from the textbox to our array
        topics.push(gif);

        //Call renderButtons function to re-create the buttons from array
        renderButtons();
    });

    //Using GIPHY API, display GIFs from button clicks
    function displayGifs() {

        //Construct URL, with limit of 10
        var gifName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            gifName + "&api_key=k7CBQf6b6cm7pL4RJkBQlizNk5kPP0Px&limit=10";

        //Creating AJAX call for the specific button being clicked, include the parameters 'rating' and 'title'
        //GIF should start out in static state. On cick, GIF will play. On click, GIF will go static again    
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

                //Click function to animate or stop the GIF
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

    //Using .on Click to call displayGifs function and calling renderButtons function
    $(document).on("click", ".gif", displayGifs);

    renderButtons();

});