//hover interaction for navigation button in mobile version
function changeNavButton() {
  document.getElementById("navButton").src = "../images/icons/navButton_hover.png";
}

function resetNavButton() {
  document.getElementById("navButton").src = "../images/icons/navButton.png";
}
  
//Slideshow for mobile home page
let slideIndexHome = -1;
function showSlidesHome() {
  let slidesH = document.getElementsByClassName("slideImages-home");
  for (let i = 0; i < slidesH.length; i++) {
    slidesH[i].classList.remove("show");
  }
  
  slideIndexHome++;
  
  if (slideIndexHome >= slidesH.length) {
    slideIndexHome = 0;
  }  
  
  slidesH[slideIndexHome].classList.add("show");
}

if (window.location.pathname.endsWith("index.html")) {
  window.onload = function() {
    showSlidesHome(); 
    setInterval(showSlidesHome, 3000);
  };
}
  

//Slideshow for mobile about us page
let slideIndexAbout = -1;
function showSlidesAbout() {
  let slidesA = document.getElementsByClassName("slideImages-about");
  for (let i = 0; i < slidesA.length; i++) {
    slidesA[i].classList.remove("show");
  }
  
  slideIndexAbout++;
  
  if (slideIndexAbout >= slidesA.length) {
    slideIndexAbout = 0;
  }  
  
  slidesA[slideIndexAbout].classList.add("show");
}

if (window.location.pathname.endsWith("about.html")) {
  window.onload = function() { //run slideshow upon page open
    showSlidesAbout(); 
    setInterval(showSlidesAbout, 3000);
  };
}


const navigationPage = document.getElementById("navPage");
const closeNavButton = document.getElementById("closeNavPageButton");
const openNavButton = document.getElementById("navButton");

function openNav() {
  navPage.style.display = "block";
}

function closeNav(){
  navPage.style.display = "none";
}