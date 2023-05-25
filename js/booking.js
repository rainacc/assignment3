

//Check if user entered all required field before proceed to next form step
function validateForm(n) {
  let currentFormId = "step" + n;
  let f = document.getElementById(currentFormId); // get form content
  let formInputs = f.getElementsByClassName("formInputs");
  let fillAllErrorMessage = document.getElementsByClassName("fillAllErrorMessage");
  let selectedPaymentOption = "";

  // Check input fields
  for (let i = 0; i < formInputs.length; i++) {
    if (formInputs[i].value.trim() === "" && !formInputs[i].id.includes("optional")) {
      fillAllErrorMessage[n-1].style.display = "block"; // display the error message for the corresponding input field
      formInputs[i].setCustomValidity("Please fill in all fields."); // set custom validity message
      return false;
    } else {
      fillAllErrorMessage[n-1].style.display = "none"; // hide the error message if the input is filled
      formInputs[i].setCustomValidity(""); // reset custom validity message
    }

    if (n === 3 && formInputs[i].type === "radio" && formInputs[i].checked) {
      selectedPaymentOption = formInputs[i].value;
    }
  }

  // In step 3, check the payment method chosen and proceed to payment page accordingly
    if (n === 3 && selectedPaymentOption === "") {
      fillAllErrorMessage[n-1].style.display = "block"; // display the error message for not selecting a payment option
      return false;
    } else {
      fillAllErrorMessage[n-1].style.display = "none"; // hide the error message if payment option is selected
    }

    if (n === 3 && selectedPaymentOption === "paypal") {
      updateConfirmPage(); //Update entered detail
      document.getElementById("step3").style.display = "none"; //hide current form
      document.getElementById("step6").style.display = "block"; // Proceed to next step
    } else if (selectedPaymentOption === "creditCard") {
      nextBookStep(3); // Proceed to enter credit card details
    }

  //Ensure check box is ticked before payment at step 6
  if (n === 6) {
    let selectedCheckBox = document.getElementById("check-id");
    if (!selectedCheckBox.checked) {
      fillAllErrorMessage[n - 1].style.display = "block"; // display the error message for not checking the checkbox
      selectedCheckBox.setCustomValidity("Please tick the check box."); // set custom validity message
      return false;
    } else {
      fillAllErrorMessage[n - 1].style.display = "none"; // hide the error message if the checkbox is checked
      selectedCheckBox.setCustomValidity(""); // reset custom validity message
    }
  }
  return true;
}


//Form processing
//Show & hide form display
  function nextBookStep(n) { 
      let currentFormId = "step" + n;
      let nextFormId = "step" + (n + 1); //Get the next form id
      
      //Hide navigation bar and next page button to provide space for form content (PC version)
      if (nextFormId !== 1){
        document.getElementById("navB").style.display="none";
        document.getElementsByClassName('nextPageField')[0].style.display = "none";
      } 
      document.getElementById(currentFormId).style.display = "none"; //hide current form
      document.getElementById(nextFormId).style.display = "block"; // Proceed to next step
    }

  function prevBookStep(n) {
      let currentFormId = "step" + n;
      let prevFormId = "";

      if (currentFormId != "step6") {
      prevFormId = "step" + (n - 1);
      } else {// If user is in step 6 confirm page, jump back to step 3 to choose payment method again
      prevFormId = "step" + (n - 3); 
      }

     if (n === 2){ //When back to step 1 shows nav bar again
        document.getElementById("navB").style.display="flex";
        document.getElementsByClassName('nextPageField')[0].style.display = "flex";
      }

      document.getElementById(currentFormId).style.display = "none"; //hide current form
      document.getElementById(prevFormId).style.display = "block"; //go back to previous form
    }

  //Run the payment loading animation before success page
  function processPayment() {
      // Display the loading spinner
      document.getElementById("loading-spinner").style.display = "block";
    
      // Simulate a delay of 3 seconds for processing payment
      setTimeout(function () {
        // Proceed to the booking successful page
        document.getElementById("step7").style.display = "none";
        document.getElementById("step8").style.display = "block";
      }, 3000);
  }


//Calculation & Selection
//Calculate book fee after user selects guest number
  function calBookFee(n){
      let fee = parseInt(n) * 1.10;
      let feeElements = document.getElementsByClassName("bookFee"); //Find every book fee display elements across forms
      for (let i = 0; i < feeElements.length; i++) {
          feeElements[i].textContent = "$" + fee.toFixed(2);//Change the booking fee display & round to two decimal places
        }
  }

//Prevent Users selecting past dates/months
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


//Validate user input according to input format & display inline error message
  //Validate any input field to follow the pattern set
  //including: Full Name/Phone number/Card holder Name/Card number/CVV/City/State/Postcode
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


//Update user input for Confirm Details & Booking Success page
// Collect all the entered information and display in confirmation page
function updateConfirmPage() {
  // Get all user input in previous steps
  let fullName = document.getElementById("name-id").value;
  let phoneNumber = document.getElementById("phone-id").value;
  let emailAddress = document.getElementById("email-id").value;

	let bookDate = document.getElementById("date-id").value;
  let bookTime = document.getElementById("time-id").value;
  let guests = document.getElementById("guests-id").value;
  let specialRequest = document.getElementById("special-id-optional").value;

  let paymentChosen = document.querySelector('input[name="payment-option"]:checked').value;
  let cardInput = document.getElementById("card-id").value;
  let cardEndNumber = cardInput.substring(cardInput.length - 4); //get last 4 digit of the card

  let address = document.getElementById("address-id").value;
  let city = document.getElementById("city-id").value;
  let state = document.getElementById("state-id").value;
  let postalCode = document.getElementById("post-id").value;
  let country = document.getElementById("country-id").value;

// Update the reservation details section (seperately to align with icons)
  let filledBookDate = document.getElementsByClassName("filledBookDate");
  for (let i = 0; i < filledBookDate.length; i++) {
    filledBookDate[i].innerHTML = bookDate;
  }

  let filledBookTime = document.getElementsByClassName("filledBookTime");
  for (let i = 0; i < filledBookTime.length; i++) {
    filledBookTime[i].innerHTML = bookTime;
  }

  let filledBookGuests = document.getElementsByClassName("filledBookGuests");
  for (let i = 0; i < filledBookGuests.length; i++) {  
  filledBookGuests[i].innerHTML = guests + " Guests";
  }

// Update the guest contact details section
  let filledGuestDetails = document.getElementsByClassName("filledGuestDetails");
  for (let i = 0; i < filledGuestDetails.length; i++) {
  filledGuestDetails[i].innerHTML =
    "Name: " + fullName + "<br>" +
    "Phone: " + phoneNumber + "<br>" +
    "Email: " + emailAddress + "<br>" +
    "Special Request: " + specialRequest + "<br><br>";
  }
  
// Update payment method section
  let paymentMethod = document.getElementsByClassName("paymentMethod");
  for (let i = 0; i < paymentMethod.length; i++) {  
  if (paymentChosen === "creditCard") {
    paymentMethod[i].innerHTML = "Credit Card ending with *" + cardEndNumber;
  } else if (paymentChosen === "paypal") {
    paymentMethod[i].innerHTML = "Pay with PayPal";
  }}
  
// Update the billing address section
  let filledAddressDetails = document.getElementsByClassName("filledAddressDetails");
  for (let i = 0; i < filledAddressDetails.length; i++) {  
  if (paymentChosen === "creditCard") {
  filledAddressDetails[i].innerHTML =
    address + " ," + city + "<br>" +
    state + postalCode + "<br>" +
    country;
  } else { //Default address to represent PayPal option
    filledAddressDetails[i].innerHTML = "100 Paypal Rd, <br> Box Hill VIC 3128 <br> Australia";
  }}
}