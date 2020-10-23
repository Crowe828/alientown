$(document).ready(() => {
  function getPosts(shape) {
    console.log(shape);
    $.ajax({
      method: "GET",
      url: "all/" + shape
    }).then(() => {
      window.location.href = "/all/" + shape;
    });
  }

  $("#searchAll").on("submit", () => {
    const shape = $("#shapeChoice").val();
    getPosts(shape);
  });
});
