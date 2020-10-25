$(document).ready(() => {
  function getPosts(shape, time) {
    $.get("all/" + shape + "/" + time).then(
      (window.location.href = "/all/" + shape + "/" + time)
    );
  }

  $(".submitFilter").on("click", event => {
    event.preventDefault(event);
    let shape = $("#shapeChoice").val();
    let time = $("#timeFrame").val();
    if ($("#shapeChoice").val() === "") {
      shape = "all-shapes";
    }
    if ($("#timeFrame").val() === "") {
      time = "all-years";
    }
    getPosts(shape, time);
  });
});
