//Define User input value in book form
let dateInput = document.getElementById("date-id");
let timeInput = document.getElementById("time-id");

//Check reservation date, disable past dates selection
let today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);

//Check if user selects a date before select available time
function checkDateTime (){
if (dateInput.value === "") { 
    //if date is not selected, prevent user from selecting time & notify
    timeInput.disabled = true;
    alert("Please select a reservation date first.");
}
else {
    //if date is selected, enable user to choose the time
    timeInput.disabled = false;
}
}
//Run validatation when user selects the time
dateInput.addEventListener("change", checkDateTime);