
//Slideshow for mobile home page
let slideIndex = -1;
function showSlides() {
  let slides = document.getElementsByClassName("slideImages");
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("show");
  }
  
  slideIndex++;
  
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }  
  
  slides[slideIndex].classList.add("show");
}

if (window.location.pathname.endsWith("index.html")) {
  window.onload = function() {
    showSlides(); 
    setInterval(showSlides, 3000);
  };
}

const navigationPage = document.getElementById("navPage");
const closeNavButton = document.getElementById("closeNavPageButton");
const openNavButton = document.getElementById("navButton");

function openNav() {
  var x = document.getElementById("navPage");
  if (x.className === "navButtons") {
    x.className += " responsive";
  } else {
    x.className = "navButtons";
  }
}

function closeNav(){
  navPage.style.display = "none";
}