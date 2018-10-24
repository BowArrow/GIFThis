$.fn.gifThis = function () {
    var t = this;
    t.topicsArr = ["The Flash", "EDM", "Programming", "The Dark Crystal", "Owen Wilson", "Ryan Reynolds", "Javascript", "Game of Thrones", "Destiny 2", "Comedy"];
    t.colorsArr = ["peach", "purple", "blue", "aqua", "amy-crisp", "ripe-malinka", "morpheus-den", "dusty-grass", "tempting-azure"]
    t.slice = 0;
    t.renderButtons = function () {
        t.clearGIFs();
        t.buttons = $("#buttons-goHere").text();
        for (var i = 0; i < t.topicsArr.length; i++) {
            t.colorPick = t.colorsArr[Math.floor(Math.random() * 9)]
            t.button = $("<button>");
            t.button.addClass(`btn ${t.colorPick}-gradient color-block float-left mx-2 my-2 z-depth-1`).attr({
                "id": t.topicsArr[i],
                "type": "button",
            }).text(t.topicsArr[i]);
            $("#buttons-goHere").append(t.button);
        };
    };
    t.clearButtons = function () {
        var buttons = $("#buttons-goHere .btn");
        buttons.remove();
    }
    t.clearGIFs = function () {
        $("#gifs-goHere").html("");
    }
    t.takeInput = function () {
        t.input = $("#user-topic").val().trim();
            if (t.topicsArr.indexOf(t.input) === -1) {
                t.topicsArr.push(t.input)
                t.clearButtons();
                t.renderButtons();
                $("#user-topic").val("");
            }
        }
    t.ajaxCall = function (name) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=15";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data
            for (var j = 0; j < results.length; j++) {
                t.colorPick = t.colorsArr[Math.floor(Math.random() * 9)]
                var gifDiv = $("<div>");
                gifDiv.attr({
                    "class": "my-2 mx-2 float-left"
                });
                var p = $("<p>");
                p.text(results[j].rating.toUpperCase()).css({
                    // "background-color": "#d1d1d1",
                    "color": "white",
                    "font-weight": "strong",
                    "text-align": "center"
                }).attr({
                    "class": `${t.colorPick}-gradient`
                })
                var img = $("<img>");
                img.attr({
                    "src": results[j].images.fixed_height_still.url,
                    "class": "gif",
                    "data-state": "still",
                    "data-still": results[j].images.fixed_height_still.url,
                    "data-animate": results[j].images.fixed_height.url
                });
                gifDiv.append(img, p);
                $("#gifs-goHere").append(gifDiv);
            }
        });
    }

    return t;
};
$(document).ready(function () {
    var GIF;
    GIF = $(window).gifThis();
    GIF.renderButtons();
    $("#button-topic").click(function () {
        GIF.takeInput();
    });
    $("body").on("click", "#buttons-goHere .btn", function () {
        t = $(this);
        GIF.clearGIFs();
        GIF.ajaxCall(t.attr("id"))
    });
    $("body").on("click", "#clear-gifs", function() {
        GIF.clearGIFs();
    })
    $("body").on("click", ".gif", function () {
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
