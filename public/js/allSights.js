$(document).ready(() => {
  function getPosts(shape, time) {
    $.get("all/" + shape + "/" + time, (data, status) => {
      console.log(status);
      window.location.href = "/all/" + shape + "/" + time;
    });
  }

  $(".submitFilter").on("click", (event) => {
    event.preventDefault(event);
    const shape = $("#shapeChoice").val();
    const time = $("#timeFrame").val();
    getPosts(shape, time);
  });
});
