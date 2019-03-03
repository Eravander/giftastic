var topics = ["Star Trek", "Beer", "Full Metal Alchemist", "Spaceballs"];

function displayGifs() {
  var search = $(this).attr("data-search")
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="

  $.ajax({
    url: queryURL,
    method: "GET",
    data: {
      q: search,
      limit: 10,
      rating: "pg",
      apikey: ""
    }
  }).then(function (response) {
    console.log(response)
    var results = response.data
    for (var i = 0; i <= 10; i++) {
      displayDiv = $("<div>")

      var gif = $("<img>")
      gif.attr("src", results[i].images.original_still.url)
        .attr("data-still", results[i].images.original_still.url)
        .attr("data-animate", results[i].images.original.url)
        .attr("data-state", "still")
        .attr("class", "col-md-3")
        .attr("class", "gif");
      displayDiv.append(gif);

      var rating = results[i].rating;
      console.log(response);
      var ratingP = $("<p>").text("Rating: " + rating);
      displayDiv.append(ratingP)

      $("#display-images").prepend(displayDiv);
    }

  });
}

function createButtons() {
  $("#display-buttons").empty();

  topics.forEach(function (term) {

    var newButton = $("<button>")
      .attr("class", "btn btn-default")
      .attr("id", "input")
      .attr("data-search", term)
      .text(term);

    $("#display-buttons").append(newButton);
  })
  displayGifs();
}

function changeImageState() {          

  var state = $(this).attr("data-state");
  var animate = $(this).attr("data-animate");
  var still = $(this).attr("data-still");

  if(state === "still") {
      $(this).attr("src", animate);
      $(this).attr("data-state", "animate");
  }

  else if(state === "animate") {
      $(this).attr("src", still);
      $(this).attr("data-state", "still");
  }   
}

$("#submit-button").on("click", function (event) {
  event.preventDefault();

  var input = $("#user-input").val().trim();
  console.log(input);
  topics.push(input);
  $("#user-input").val("")
  

  createButtons();
 

})

createButtons();

$(document).on("click", "#input", displayGifs);
$(document).on("click", ".gif", changeImageState);