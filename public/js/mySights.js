$(document).ready(() => {
$(".delete-sighting").on("click", function (event) {
        event.preventDefault(event);
        console.log("hellooooo")
        var id = this.id
        getData(id)

    });


    function getData(id) {
        $.get("/api/posts/" + id, function(data) {
          if (data) {
            // If this post exists, prefill our forms with its data
            titleInput.val(data.title);
            bodyInput.val(data.body);
            postCategorySelect.val(data.category);

            
            // If we have a post with this id, set a flag for us to know to update the post
            // when we hit submit
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
        })
          .then(function() {
            window.location.href = "/blog";
          });
      }

});