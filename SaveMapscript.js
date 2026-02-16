const form = document.getElementById("myForm");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Form submitted");
    console.log(form.username.value);
});
