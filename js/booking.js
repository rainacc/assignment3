//Check reservation date, avoid selecting passed date
let today = new Date().toISOString().split("T")[0];
let dateInput = document.getElementById("date-id");
dateInput.setAttribute("min", today);

//Change Book form steps//
function nextBookStep(n) {
let currentForm = "step" + n;
let nextForm = "step" + (n + 1);
document.getElementById(currentForm).style.display = "none";
document.getElementById(nextForm).style.display = "block";
}

function goBackBookStep(n){
    let currentForm = "step" + n;
    let prevForm = "step" + (n - 1);
    document.getElementById(currentForm).style.display = "none";
    document.getElementById(prevForm).style.display = "block";
}