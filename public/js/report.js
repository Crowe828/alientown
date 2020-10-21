$(document).ready(() => {
    // Getting jQuery references to the post body, title, form, and author select
    var dateInput = $("#date");
    var cityInput = $("#title");
    var shapeInput = $("#shape");
    var durationInput = $("#duration");
    var summaryInput = $("#summary");
    var datePosted = $("#datePosted");
    var ufoForm = $("#newUfo");
    // Adding an event listener for when the form is submitted
    // $("#ufoForm").on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    // var url = window.location.search;
    var postId;
    // var authorId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;



    // A function for handling what happens when the form to create a new post is submitted
    $("#newUfo").on("submit", function(event){
        event.preventDefault(event);
        console.log("hellooooo")

        // Constructing a newPost object to hand to the database
        var newPost = {
            Date: dateInput
                .val()
                .trim(),
            City: cityInput
                .val()
                .trim(),
            Shape: shapeInput
                .val()
                .trim(),
            Duration: durationInput
                .val()
                .trim(),
            Summary: summaryInput
                .val()
                .trim(),
            DatePosted: datePosted
                .val()
                .trim(),
        };

        // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post
        if (updating) {
            newPost.id = postId;
            updatePost(newPost);
        }
        else {
            submitPost(newPost);
        }
    });

    // Submits a new post and brings user to blog page upon completion
    function submitPost(post) {
        console.log("hi");
        $.post("/api/posts", post, function () {
            // window.location.href = "/sightings";
            location.reload();
        });
    }
});
