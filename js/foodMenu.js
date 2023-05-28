function showFood(foodId){
    document.getElementById(foodId).style.display ="block"; //Show food card details with dark overlay on background
    document.getElementsByClassName('nextPageField')[0].style.display = "none";//Hide next page button when open up food detail
}

function hideFood(foodId){
    document.getElementById(foodId).style.display ="none";
    document.getElementsByClassName('nextPageField')[0].style.display = "flex";
 }
