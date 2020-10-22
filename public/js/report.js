$(document).ready(() => {
  // Getting jQuery references to the post body, title, form, and author select
  const dateInput = $("#date");
  const cityInput = $("#city");
  const stateInput = $("#state");
  const shapeInput = $("#shape");
  const durationInput = $("#duration");
  const summaryInput = $("#summary");
  const datePosted = $("#datePosted");
  let updating = false;
  const url = window.location.search;
  let postId;

  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getData(postId);
  }
  // Adding an event listener for when the form is submitted
  $("#newUfo").on("submit", event => {
    event.preventDefault(event);
    // Constructing a newPost object to hand to the database
    const newPost = {
      date: dateInput.val(),
      city: cityInput.val(),
      state: stateInput.val(),
      shape: shapeInput.val(),
      duration: durationInput.val(),
      summary: summaryInput.val(),
      datePosted: datePosted.val()
    };

    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    } else {
      submitPost(newPost);
    }
  });

  // Submits a new post and brings user to blog page upon completion
  function submitPost(post) {
    $.post("/api/posts", post, () => {
      window.location.href = "/sightings";
    });
  }

  // If we're updating a post run updatePost to update a post
  // Otherwise run submitPost to create a whole new post

  $(".delete-sighting").on("click", function(event) {
    event.preventDefault(event);
    const id = $(this).data("id");
    deletePost(id);
  });
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    }).then(() => {
      window.location.href = "/sightings";
    });
  }
  $(".edit-sighting").on("click", function(event) {
    event.preventDefault(event);
    const id = $(this).data("id");
    window.location.href = "/reports?post_id=" + id;
    getData(id);
  });

  function getData(id) {
    $.get("/api/posts/" + id, data => {
      if (data) {
        console.log(data);
        // If this post exists, prefill our forms with its data
        dateInput.val(data.date);
        cityInput.val(data.city);
        stateInput.val(data.state);
        shapeInput.val(data.shape);
        summaryInput.val(data.summary);
        datePosted.val(data.datePosted);
        updating = true;
      }
    });
  }
  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    }).then(() => {
      window.location.href = "/mySightings";
    });
  }
});
