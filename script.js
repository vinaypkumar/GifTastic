$(document).ready(function() {
    var topics=["puppies", "kittens", "pigs", "hamsters", "bunnies", "hedgehogs", "goats", "bears", "elephants", "cows"];

    for (var i=0; i<topics.length; i++){
      var button=$("<button>");
      button.attr("class", "buttonMain");
      button.attr("data-name", topics[i]);
      button.text(topics[i]);       
      $("#header").append(button);      
    }


    
    $(document.body).on("click", ".buttonMain", function() {

      $("#images").html("");
      var subject=$(this).attr("data-name");
     
      var queryURL = "http://api.giphy.com/v1/gifs/search?q="+subject+"&api_key=dc6zaTOxFJmzC";

      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
      .done(function(response) {

        var results = response.data;

          // Looping over every result item
          for (var i = 0; i < 10; i++) {                   
              
              var gifDiv = $("<div class='item'>");             
              var rating = results[i].rating;           
              var p = $("<p>").text("Rating: " + rating);
              var Image = $("<img>");
              var url=results[i].images.fixed_height.url;
              var staticUrl = url.substr(0, (url.indexOf("gif")-1)) + "_s" + url.substr((url.indexOf("gif")-1));              
              Image.attr("src", staticUrl); 
              Image.attr("data-static", staticUrl);
              Image.attr("data-animated", url); 
              Image.attr("data-state", "still");  
              Image.attr("class", "animalImage");                        
              gifDiv.append(p);
              gifDiv.append(Image);
              $("#images").prepend(gifDiv);

            }

      });
    });

    $(document.body).on("click", ".animalImage", function() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-static"));
        $(this).attr("data-state", "still");
      }
    });

    $("#add").on("click", function(event) {
      
      var subject=$("#bar").val().trim();
      if (subject.length<=0){
        return;
      }

      console.log("fuck this");

      var button=$("<button>");
      button.attr("class", "buttonMain");
      button.attr("data-name", subject);
      button.text(subject);       
      $("#header").append(button);
      

    });


});