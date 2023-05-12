//Check reservation date, avoid selecting passed date
let today = new Date().toISOString().split("T")[0];
let dateInput = document.getElementById("date");
dateInput.setAttribute("min", today);