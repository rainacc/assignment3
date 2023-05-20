
function validateForm(n) {
//Check if every input field have been filled
let currentFormId = "step" + n;
let f = document.getElementById(currentFormId); //get form content
let formInputs = f.getElementsByTagName("input");
for (let i = 0; i < formInputs.length; i++) {
  if (formInputs[i].value.trim() === "") {
    alert("Please fill in all fields.");
    return false;
  }
}
return true;
}

function nextBookStep(n) { //Form processing
    let currentFormId = "step" + n;
    let nextFormId = "step" + (n + 1); //Get the next form id
    document.getElementById(currentFormId).style.display = "none";
    document.getElementById(nextFormId).style.display = "block"; // Proceed to next step
}

function prevBookStep(n) {
    let currentFormId = "step" + n;
    let prevFormId = "step" + (n - 1);
    document.getElementById(currentFormId).style.display = "none";
    document.getElementById(prevFormId).style.display = "block";
  }

function calBookFee(n){
    let fee = parseInt(n) * 1.10;
    let feeElements = document.getElementsByClassName("bookFee"); //Find every book fee display elements across forms
    for (let i = 0; i < feeElements.length; i++) {
        feeElements[i].textContent = "$" + fee.toFixed(2);//Change the booking fee display & round to two decimal places
      }
}


function checkPhone() {
    let phoneInput = document.getElementById("phone-id");
    if (phoneInput.validity.patternMismatch) {
        alert("Please enter a valid phone number.");
        return false;
    }
    return true;
}
