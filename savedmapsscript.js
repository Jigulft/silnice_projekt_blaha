const saved = JSON.parse(localStorage.getItem("savedContainer"));
const template = document.getElementById("row");

Object.keys(saved).forEach(key => {
    const saveditem = saved[key];

    const clone = template.content.cloneNode(true);

    const span = clone.querySelector("span");
    span.innerText = saveditem.name;

    const butt = clone.querySelector("button");

    butt.addEventListener('click',(e) => {

        localStorage.setItem('currentSave',JSON.stringify(saved[key]))

        window.location.href = "index.html";

    })


    document.body.appendChild(clone);
});

