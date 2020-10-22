$(document).ready(() => {
    // Getting jQuery references to the post body, title, form, and author select
    var dateInput = $("#date");
    var cityInput = $("#city");
    var stateInput = $("#state");
    var shapeInput = $("#shape");
    var durationInput = $("#duration");
    var summaryInput = $("#summary");
    var datePosted = $("#datePosted");

    // Adding an event listener for when the form is submitted
    $("#newUfo").on("submit", function (event) {
        event.preventDefault(event);
        console.log("hellooooo")

        // Constructing a newPost object to hand to the database
        var newPost = {
            date: dateInput
                .val(),
            city: cityInput
                .val(),
            state: stateInput
                .val(),
            shape: shapeInput
                .val(),
            duration: durationInput
                .val(),
            summary: summaryInput
                .val(),
            datePosted: datePosted
                .val()
        };
        submitPost(newPost);
    });

    // Submits a new post and brings user to blog page upon completion
    function submitPost(post) {
        $.post("/api/posts", post, function () {
            window.location.href = "/sightings";
        });
    }

    $(".delete-sighting").on("click", function (event) {
        event.preventDefault(event);
        console.log("hellooooo")
        var id = $(this).data("id");
        // var id = current.id
        console.log(id)
        deletePost(id)
    
    });
    function deletePost(id) {
        console.log(id)
        $.ajax({
          method: "DELETE",
          url: "/api/posts/" + id
        })
          .then(function() {
            window.location.href = "/sightings"
          });
      }
    $(".edit-sighting").on("click", function (event) {
        event.preventDefault(event);
        var id = $(this).data("id");
        getData(id)
        

    });

    function getData(id) {
        $.get("/api/posts/", function(data) {
            
          if (data) {
              console.log(data)
            // If this post exists, prefill our forms with its data
            dateInput.val(this.data.date);
            cityInput.val(this.data.city);
            stateInput.val(data.state);
            shapeInput.val(data.shape);
            summaryInput.val(data.summary);
            datePosted.val(data.datePosted);
          }
        }).then(()=>{
            window.location.href = "reports/?post_id=" + this.id;
        })
      }
    
      // Update a given post, bring user to the blog page when done
      function updatePost(post) {
        $.ajax({
          method: "PUT",
          url: "/api/posts",
          data: post
        })
          .then(function() {
            window.location.href = "/mySightings";
          });
      }

});
