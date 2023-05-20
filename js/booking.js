
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

//Validate user input for full name
function checkName() {
    let nameInput = document.getElementById("name-id");
    let name = nameInput.value.trim(); // Remove extra whitespace
    
    let nameErrorMessage = document.getElementById("nameErrorMessage");
    let nameParts = name.split(" ");
    
    if (!/^[a-zA-Z-'. ]+$/.test(name) || nameParts.length < 2) {
        //Set to invalid display and return error
        nameErrorMessage.style.display = "block";
        nameInput.setCustomValidity("Invalid name");
    return false;
    } 
    //Set to normal display and enable user to proceed
    nameErrorMessage.style.display = "none";
    nameInput.setCustomValidity("");
    return true;
  }

//Validate user input for email address
function checkEmail() {
    let email = document.getElementById("email-id");
    let emailValue = email.value;
    let emailErrorMessage = document.getElementById("emailErrorMessage");
    if (
      emailValue.indexOf(" ") !== -1 ||  //check no blank input
      emailValue.indexOf("@") < 1 || //checking if the @ sign at least 1 character from the beginning and 5 characters from the end of the string
      emailValue.indexOf("@") > emailValue.length - 5 || 
      emailValue.indexOf(".") - emailValue.indexOf("@") < 2 || 
      emailValue.indexOf(".") > emailValue.length - 3 //2-4 characters following the @ to have valid domain name
    ) { //Set to invalid display and return error
        email.setCustomValidity("Invalid email address"); 
        emailErrorMessage.style.display = "block";
        return false;
      } 
    //Set to normal display and enable user to proceed
    email.setCustomValidity("");
    emailErrorMessage.style.display = "none";
    return true;
      
    }

//Validate user input for phone number
function checkPhone() {
    let phone = document.getElementById("phone-id");
    if (phone.validity.patternMismatch) { //Phone number should contain numbers from 0~9 and in 10 digits
    //set to invalid display and return error
        phone.setCustomValidity("Invalid phone number");
        phoneErrorMessage.style.display = "block";
        return false;
    } 
    //set to normal display and enable user to proceed
    phone.setCustomValidity("");
    phoneErrorMessage.style.display = "none";
    return true;
}
    
