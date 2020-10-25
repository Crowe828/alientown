$(document).ready(() => {
  function getPosts(shape, time) {
    $.get("all/" + shape + "/" + time).then(
      (window.location.href = "/all/" + shape + "/" + time)
    );
  }

  $(".submitFilter").on("click", event => {
    event.preventDefault(event);
    const shape = $("#shapeChoice").val();
    const time = $("#timeFrame").val();
    getPosts(shape, time);
  });
});
