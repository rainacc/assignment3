
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

    if (formInputs[i].value.trim() === "" ) { // users did not enter all information
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

//Validate user's name input in both  step2 guest name and step4 card holder
function checkName(nameType) {
  let nameInput, nameErrorMessage;
  
  if (nameType === 'Guest') {
    nameInput = document.getElementById("name-id");
    nameErrorMessage = document.getElementById("nameErrorMessage");
  } else if (nameType === 'Card'){
    nameInput = document.getElementById("cardName-id");
    nameErrorMessage = document.getElementById("cardNameErrorMessage");
  }
  
  let name = nameInput.value.trim(); // Remove extra whitespace
  let nameParts = name.split(" ");
    
  if (!/^[a-zA-Z-'. ]+$/.test(name) || nameParts.length < 2) {
    // Set to invalid display and return error
    nameErrorMessage.style.display = "block";
    nameInput.setCustomValidity("Invalid name");
    return false;
  } 
  
  // Set to normal display and enable user to proceed
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
    let phoneErrorMessage = document.getElementById("phoneErrorMessage");
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

//Validate CVV/CVC
function checkCVV() {
  let cvv = document.getElementById("cvv-id");
  let cvvErrorMessage = document.getElementById("cvvErrorMessage");
  if (cvv.validity.patternMismatch) { // CVV/CVC should contain numbers from 0~9 and be in 3~4 digits
    // Set to invalid display and return error
    cvv.setCustomValidity("Invalid CVV/CVC");
    cvvErrorMessage.style.display = "block";
    return false;
  } 
  // Set to normal display and enable user to proceed
  cvv.setCustomValidity("");
  cvvErrorMessage.style.display = "none";
  return true;
}

//Validate Credit Card Number
function checkCard() {
  let card = document.getElementById("card-id");
  let cardErrorMessage = document.getElementById("cardErrorMessage");
  if (card.validity.patternMismatch) { //card number should contain numbers from 0~9 and in 14~16 digits
  //set to invalid display and return error
      card.setCustomValidity("Invalid card number");
      cardErrorMessage.style.display = "block";
      return false;
  } 
  //set to normal display and enable user to proceed
  card.setCustomValidity("");
  cardErrorMessage.style.display = "none";
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
    
