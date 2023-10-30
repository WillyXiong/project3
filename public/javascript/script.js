document.addEventListener("DOMContentLoaded", function () {
      const menuIcon = document.getElementById("menu-icon");
      const navbar = document.querySelector(".navbar");

      menuIcon.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent the click from propagating to the document
        navbar.classList.toggle("active");
        menuIcon.classList.toggle("active");
      });

      document.addEventListener("click", function (e) {
        if (!navbar.contains(e.target) && e.target !== menuIcon) {
          // Clicked outside the navbar and menu icon, so close the navbar
          navbar.classList.remove("active");
          menuIcon.classList.remove("active");
        }
      });
    });