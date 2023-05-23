
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

//Responsive Navigation menu on mobile website
function openNav() {
  let x = document.getElementById("myNavPage");
  let navBtn = document.getElementById("navButton");
  let closeBtn = document.getElementById("closeButton");
  if (x.className=== "cluster navPage") {
    x.classList.remove("cluster");
    x.className += " responsive";
    navBtn.style.display="none";
    closeBtn.style.display="block";
  } else {
    x.className = "cluster navPage";
  }
}

//Close the navigation bar
function closeNav() {
  let x = document.getElementById("myNavPage");
  let navBtn = document.getElementById("navButton");
  let closeBtn = document.getElementById("closeButton");
  let nb = document.getElementById("navB");
  if (x.className==="navPage responsive") {
    closeBtn.style.display="none";
    navBtn.style.display="block";
    x.className = "cluster navPage";
  }
}
