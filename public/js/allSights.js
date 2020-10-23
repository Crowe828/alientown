$(document).ready(() => {
  $("#myInput").on("keyup", function() {
    const value = $(this)
      .val()
      .toLowerCase();
    $(".dropdown-menu li").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });
});
