//returns to home page and clears all item in shopping cart
let clearCart = document.getElementById("home-page-link");
clearCart.addEventListener("click", () => {
    localStorage.clear();
});