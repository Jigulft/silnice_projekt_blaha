const template = document.getElementById("row");
const saves = JSON.parse(localStorage.getItem("savedContainer")) || [];

saves.forEach(saveditem => {

    const clone = template.content.cloneNode(true);


    const span = clone.querySelector("span");
    span.innerText = saveditem.map.name;


    const butt = clone.querySelector(".loadbutt");

    butt.addEventListener('click', () => {


        localStorage.setItem('currentSave', JSON.stringify(saveditem));


        window.location.href = "index.html";
    });

    const delbutt = clone.querySelector(".deletebutt");

    delbutt.addEventListener('click', () => {


        saves.splice(saves.indexOf(saveditem),1)


        localStorage.setItem("savedContainer", JSON.stringify(saves));

        window.location.reload()


    });

    document.body.appendChild(clone);
});


