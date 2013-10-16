$(document).on("click", "a.confirm", function(event) {
  if (!confirm("Are you sure?")) {
    event.preventDefault();
  }
});
