function showFood(foodId){
    document.getElementById(foodId).style.display ="block"; //Show food card details with dark overlay on background
    document.getElementsByClassName('scrollDownField')[0].style.display = "none";//Hide next page button when open up food detail
}

function hideFood(foodId){
    document.getElementById(foodId).style.display ="none";
    document.getElementsByClassName('scrollDownField')[0].style.display = "block";
 }
