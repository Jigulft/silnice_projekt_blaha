const form = document.getElementById("myForm");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // stops the page from reloading

    console.log("Form submitted");
    console.log(form.username.value);
});
