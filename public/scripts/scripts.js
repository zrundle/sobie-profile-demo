// Loads the user to the bottom of the page 

window.onload = function () {
  if (window.location.href.includes("insert")) {
    document.getElementById("newPost").scrollIntoView();
  }
};

