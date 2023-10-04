//shipping address variables
let firstNameInShippingAddress = document.getElementById("firstNameShippingAddress");
let lastNameInShippingAddress = document.getElementById("firstNameShippingAddress");
let email = document.getElementById("email");
let stressAddress = document.getElementById("streetAddress");
let townCity = document.getElementById("town-city");
let postcode = document.getElementById("postcode");
let country = document.getElementById("country");
let stateCounty = document.getElementById("state-county");

//payment method variables
let firstNamePaymentMethod = document.getElementById("firstNamePaymentMethod");
let lastNamePaymentMethod = document.getElementById("lastNamePaymentMethod");
let creditCardNumber = document.getElementById("creditCardNumber");
let securityCode = document.getElementById("securityCode");
let cardExpiration = document.getElementById("cardExpiration");

let purchaseBtn = document.getElementById("purchaseBtn");

purchaseBtn.addEventListener("click", function (event) {
    if (validateShippingAddress() === false || validatePaymentMethod() === false) {
        event.preventDefault();
    }
});

function validateShippingAddress() {
    if (firstNameInShippingAddress.value === '') {
        //checks if shipping address first name is empty
        firstNameInShippingAddress.classList.add("invalid-input");
        return false;
    } else if (lastNameInShippingAddress.value === '') {
        //checks if shipping address last name is empty
        lastNameInShippingAddress.classList.add("invalid-input");
        return false;
    } else if (!email.value.includes("@")) {
        //checks if email has an @
        email.classList.add("invalid-input");
        return false;
    } else if (stressAddress.value === '') {
        //checks if shipping address street address is empty
        stressAddress.classList.add("invalid-input");
        return false;
    } else if (townCity.value === '') {
        //checks if shipping address town/city is empty
        townCity.classList.add("invalid-input");
        return false;
    } else if (postcode.value.length !== 5 || isNaN(postcode.value)) {
        //checks if postcode's length is 5 and comprised of numbers only
        postcode.classList.add("invalid-input");
        return false;
    } else if (country.value === '') {
        //checks if shipping address country is empty
        country.classList.add("invalid-input");
        return false;
    } else if (stateCounty.value === '') {
        //checks if shipping address country is empty
        stateCounty.classList.add("invalid-input");
        return false;
    }
    return true;
}

function validatePaymentMethod() {
    if (firstNamePaymentMethod.value === '') {
        //checks if payment method first name is empty
        firstNamePaymentMethod.classList.add("invalid-input");
        return false;
    } else if (lastNamePaymentMethod.value === '') {
        //checks if payment method last name is empty
        lastNamePaymentMethod.classList.add("invalid-input");
        return false;
    } else if (creditCardNumber.value.length !== 16 || isNaN(creditCardNumber.value)) {
        //checks if credit card number is length is 16 and comprised of numbers only
        creditCardNumber.classList.add("invalid-input");
        return false;
    } else if (securityCode.value.length !== 3 || isNaN(securityCode.value)) {
        //checks if security code is length is 3 and comprised of numbers only
        securityCode.classList.add("invalid-input");
        return false;
    } else if (cardExpiration.value.length == '') {
        //checks if card expiration is empty
        cardExpiration.classList.add("invalid-input");
        return false;
    }
    return true;
}
