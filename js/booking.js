//Check if user entered all required field before proceed to next form step
function validateForm(n) { 
  let currentFormId = "step" + n;
  let f = document.getElementById(currentFormId); // get form content
  let formInputs = f.getElementsByTagName("input");
  let fillAllErrorMessage = document.getElementsByClassName("fillAllErrorMessage");
  let selectedPaymentOption = "";

  for (let i = 0; i < formInputs.length; i++) {
    if (formInputs[i].type === "radio" && formInputs[i].checked) {
      selectedPaymentOption = formInputs[i].value;
    }

    if (formInputs[i].value.trim() === "" && !formInputs[i].id.contains("optional")) { // users did not enter all information in required filled (ignore optional field)
      fillAllErrorMessage[i].style.display = "block"; // display the error message for the corresponding input field
      formInputs[i].setCustomValidity("Please fill in all fields."); // set custom validity message
      alert("Please fill in all fields.");
      return false;
    } else {
      fillAllErrorMessage[i].style.display = "none"; // hide the error message if the input is filled
      formInputs[i].setCustomValidity(""); // reset custom validity message
    }
    }
  
//In step 3, check the payment method chosen and proceed to next page accordingly
  if ( n ==3 && selectedPaymentOption === "") {
    fillAllErrorMessage[2].style.display = "block"; // display the error message for none selecting payment option
    alert("Please select a payment option.");
    return false;
  } else {
    fillAllErrorMessage[2].style.display = "none"; // hide the error message if payment option is selected
  }

  if (selectedPaymentOption === "paypal") {
    nextBookStep(5); // Payment done through Paypal - Direct to confirmation page
  } else if (selectedPaymentOption === "creditCard") {
    nextBookStep(3); // Direct to credit card detail page
  }

  return true;
}

function nextBookStep(n) { //Form processing
    let currentFormId = "step" + n;
    let nextFormId = "step" + (n + 1); //Get the next form id
    document.getElementById(currentFormId).style.display = "none"; //hide current form
    document.getElementById(nextFormId).style.display = "block"; // Proceed to next step
}

function prevBookStep(n) {
    let currentFormId = "step" + n;
    let prevFormId = "";

    if (currentFormId != "step6") {
    prevFormId = "step" + (n - 1);
    } else {
     prevFormId = "step" + (n - 3); // If user is in step 6 confirm page, jump back to step 3 to choose payment method again
    }

    document.getElementById(currentFormId).style.display = "none"; //hide current form
    document.getElementById(prevFormId).style.display = "block"; //go back to previous form
  }

function calBookFee(n){
    let fee = parseInt(n) * 1.10;
    let feeElements = document.getElementsByClassName("bookFee"); //Find every book fee display elements across forms
    for (let i = 0; i < feeElements.length; i++) {
        feeElements[i].textContent = "$" + fee.toFixed(2);//Change the booking fee display & round to two decimal places
      }
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

//Define User input value in book form
let dateInput = document.getElementById("date-id");
let timeInput = document.getElementById("time-id");

//Check reservation date, disable past dates selection
let today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);

//Disable past expire date selection in card details
let currentDate = new Date();
let year = currentDate.getFullYear();
let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
let yearMonth = year + "-" + month;
let expireDateInput = document.getElementById("expireDate-id");
expireDateInput.setAttribute("min", yearMonth);

//Check that if user selects a date before select available time
function checkDateTime() {
    if (dateInput.value === "") {
      // If date is not selected, prevent user from selecting time & notify
      timeInput.disabled = true;
      timeInput.selectedIndex = 0; // Reset the selected time option
      alert("Please select a reservation date first.");
    } else {
      // If date is selected, enable user to choose the time
      timeInput.disabled = false;
    }
}

//Validate any input field to follow the pattern and display inline error message, including Full Name/Card holder Name/card number/CVV/phone number
function validatePattern(inputId, errorMessageId) {
  let field = document.getElementById(inputId);
  let errorMessage = document.getElementById(errorMessageId);

  if (field.validity.patternMismatch) { 
    //set to invalid display and return error
    field.setCustomValidity("Invalid input format");
    errorMessage.style.display = "block";
    return false;
    } 
    //set to normal display and enable user to proceed
    field.setCustomValidity("");
    errorMessage.style.display = "none";
    return true;
}
