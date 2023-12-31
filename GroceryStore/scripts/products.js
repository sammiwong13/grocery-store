let cartItems = []; // Initialize an empty cartItems array
let storedItems;
let oldValue = [];
let quantity = 1;
let subtotalArray = [];


let addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
let totalCost = document.getElementById("total-cost");

// Loop through each "Add to Cart" button and add the click event listener
addToCartBtn.forEach(myProductBtn => {
    myProductBtn.addEventListener("click", handleAddToCartClick);
});

function handleAddToCartClick() {
    //for each node in productBtns, retrieve the name, price, and image

    //retrieve name
    const parentNode = this.parentNode;
    const itemName = parentNode.getAttribute("id");

    //retrieve price
    const priceElement = parentNode.lastChild.previousSibling.previousSibling.previousSibling;
    const price = parseFloat(priceElement.textContent);

    //retrieve image
    const imageElement = parentNode.firstChild.nextSibling;
    const image = imageElement.getAttribute("src");

    //subtotal
    let subtotal = price.toFixed(2) * quantity;

    let product = {
        name: itemName,
        price: price,
        image: image,
        quantity: quantity,
        subtotal: subtotal
    }

    // Add the product to the cartItems array
    cartItems.push(product);

    //check if there are old values that exist in local storage
    if (localStorage.getItem("myCartItems")) {
        oldValue = JSON.parse(localStorage.getItem("myCartItems"));

        let combinedCart = oldValue.concat(cartItems);
        let distinctCombinedCart = distinctArray(combinedCart);

        // combine two arrays of objects (old cart and new cart)
        localStorage.setItem("myCartItems", JSON.stringify(distinctCombinedCart));

    } else {
        //there is no value stored in local storage
        localStorage.setItem("myCartItems", JSON.stringify(cartItems));
    }
}

// Retrieve the cartItems from localStorage when the page loads
storedItems = JSON.parse(localStorage.getItem("myCartItems"));

//comparing by the object's name. Since you can't compare objects, change it to string first then compare. Then change it back.
function distinctArray(array) {
    let distinctArray = [];
    let elementString;
    let elementObject;
    let distinctArray2 = [];
    for (let element of array) {
        elementString = JSON.stringify(element);
        //if  distinctArray doesn't include the element or is empty, then push it into the array
        if (!distinctArray.includes(elementString) || distinctArray.length === 0) {
            distinctArray.push(elementString);
        }
    }

    //after each iteration, all unqiue elements in distinctArray will be of type string. 
    for (let i = 0; i < distinctArray.length; i++) {
        elementObject = JSON.parse(distinctArray[i]);
        distinctArray2.push[elementObject];
    }
    for (let element of distinctArray) {
        let element2 = JSON.parse(element);
        distinctArray2.push(element2);
    }
    return distinctArray2;
}

//Making the table in shopping-cart.html
let shoppingCartTable = document.getElementById("shopping-cart-table");

if (document.URL.includes("pages/shopping-cart.html")) {
    for (let i = 0; i < storedItems.length; i++) {
        //Creating elements in table and appending it to shoppingCartTable
        let newRow = document.createElement("tr");
        let newDataImgCell = document.createElement("td");
        let newDataImg = document.createElement("img");
        let newDataName = document.createElement("td");
        let newDataPrice = document.createElement("td");
        let newDataQuantityCell = document.createElement("td");
        let newBtnDown = document.createElement("button");
        let newDataQuantity = document.createElement("div");
        let newBtnUp = document.createElement("button");
        let newDataSubtotal = document.createElement("td");

        //append the elements to quantity cell
        newDataQuantityCell.appendChild(newBtnDown);
        newDataQuantityCell.appendChild(newDataQuantity);
        newDataQuantityCell.appendChild(newBtnUp);

        //append the elements to the newRow
        newRow.appendChild(newDataImgCell);
        newRow.appendChild(newDataName);
        newRow.appendChild(newDataPrice);
        newRow.appendChild(newDataQuantityCell);
        newRow.appendChild(newDataSubtotal);

        //append each row element to the table
        shoppingCartTable.appendChild(newRow);

        //adding class attribute for each row
        newRow.setAttribute("class", "table-row")

        //adding class attribute for each subtotal
        newDataSubtotal.setAttribute("class", "table-subtotal")

        //Setting attributes of newDataImg element
        newDataImg.setAttribute("src", storedItems[i].image);
        newDataImg.setAttribute("class", "shopping-cart-images");
        newDataImgCell.appendChild(newDataImg);

        //Setting attributes for the quantity buttons
        newDataQuantityCell.setAttribute("class", "quantity-cell")
        newBtnDown.setAttribute("type", "button");
        newBtnUp.setAttribute("type", "button");
        newBtnDown.setAttribute("class", "decrease-product-quantity quantity-btn");
        newBtnUp.setAttribute("class", "increase-product-quantity quantity-btn");

        //Setting contents in quantity column
        newBtnDown.textContent = "down";
        newDataQuantity.textContent = storedItems[i].quantity;
        newBtnUp.textContent = "up";

        //Setting contents in for item name, price, and subtotal
        newDataName.textContent = storedItems[i].name.toUpperCase();
        newDataPrice.textContent = storedItems[i].price;
        newDataSubtotal.textContent = storedItems[i].subtotal;

        let myDataSubtotal;
        totalCost.textContent = "$" + total(storedItems);

        //setting hegiht and width manually but implemetn this in CSS instead
        newDataImg.setAttribute("height", "100px");
        newDataImg.setAttribute("width", "100px");

        //change quantity with click event listener
        newBtnDown.addEventListener("click", function () {
            handleBtnDownClick(newDataQuantity);
            myDataSubtotal = updateSubtotal(newDataPrice, newDataQuantity);
            newDataSubtotal.textContent = myDataSubtotal;
        });
        newBtnUp.addEventListener("click", function () {
            handleBtnUpClick(newDataQuantity);
            myDataSubtotal = updateSubtotal(newDataPrice, newDataQuantity);
            newDataSubtotal.textContent = myDataSubtotal;
        });

        //each time you click on clear cart, the table will refresh
        let clearCart = document.getElementById("clear-cart");
        clearCart.addEventListener("click", () => {
            localStorage.clear();
        });

        //creating an array of subtotal
        let subtotal = document.querySelectorAll(".table-subtotal");

        subtotal.forEach(eachSubtotal => {
            subtotalArray.push(eachSubtotal.textContent);
        });
    }

    //Update total cost when quantity buttons are clicked
    let rows = document.querySelectorAll(".table-subtotal");
    let newTotal = 0;
    let quantityBtn = document.querySelectorAll(".quantity-btn");

    quantityBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            rows.forEach(row => {
                newTotal += parseFloat(row.textContent);
            });
            totalCost.textContent = "$" + newTotal.toFixed(2);
            //resets the value
            newTotal = 0;
        });
    });
}

//Finds the total cost of items added to cart already. 
function total(storedItems) {
    let sum = 0;
    for (let i = 0; i < storedItems.length; i++) {
        sum += storedItems[i].subtotal;
    }
    sum.toFixed(2);
    return sum;
}

//Decrease quantity count
function handleBtnDownClick(element) {
    let quantity = parseInt(element.textContent);
    if (quantity <= 1) {
        //do nothing
    } else {
        quantity--;
        element.textContent = quantity;
    }
}

//Increase quantity count
function handleBtnUpClick(element) {
    let quantity = parseInt(element.textContent);
    quantity++;
    element.textContent = quantity;
}

//Calculate subtotal by multiplying price and quantity
function updateSubtotal(price, quantity) {
    //first change price to float with parseFloat() and quantity to int with parseInt(), then price * quantity
    let myPrice = parseFloat(price.textContent);
    let myQuantity = parseInt(quantity.textContent);
    let mySubtotal;

    if (!isNaN(myPrice) && !isNaN(myQuantity)) {
        mySubtotal = myPrice * myQuantity;
        return mySubtotal.toFixed(2);
    } else {
        return -1;
    }
}

//Button ripple effect (udemy day 20)
let buttons = document.querySelectorAll('.ripple')

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const x = e.pageX
        const y = e.pageY

        const buttonTop = e.target.offsetTop
        const buttonLeft = e.target.offsetLeft

        const xInside = x - buttonLeft
        const yInside = y - buttonTop

        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'

        this.appendChild(circle)

        setTimeout(() => circle.remove(), 500)
    })
})