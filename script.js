const playboard = document.querySelector('.playboard')
const radios = document.querySelectorAll('.buttons input[type="radio"]');
//let arr = [];
const savebutton = document.getElementById('savemap')
const popup = document.getElementById("popup");
const overlay = document.getElementById("popup-overlay");
const formsave = document.getElementById("form-save");
let saves = JSON.parse(localStorage.getItem("savedContainer")) || [];

const current = JSON.parse(localStorage.getItem("currentSave") || "null");



if(!current) {
    console.log("No saved container found");
    for (let i = 0; i < 400; i++) {

        const clickdiv = document.createElement('div');

        clickdiv.classList.add('trava')



        playboard.append(clickdiv)
        //arr.push(clickdiv);

    }

    attachTileEvents()
} else {




    playboard.innerHTML = current.map.content;


    attachTileEvents();



}
function attachTileEvents() {
    const tiles = playboard.querySelectorAll("div");

    tiles.forEach(tile => {
        tile.addEventListener("click", () => {

            if (tile.classList.contains('trava')) {
                tile.classList.remove('trava');
                tile.classList.add('streetup', 'street');
            } else if (tile.classList.contains('street')) {
                tile.classList.remove('street', 'streetup', 'streetright');
                tile.classList.add('water');
            } else {
                tile.classList.remove('water');
                tile.classList.add('trava');
            }

            if (tile.classList.contains('streetup')) {
                if (tile.previousElementSibling?.classList.contains('streetup') &&
                    tile.nextElementSibling?.classList.contains('streetup')) {

                    tile.nextElementSibling.classList.remove('streetup');
                    tile.nextElementSibling.classList.add('streetright');

                    tile.classList.remove('streetup');
                    tile.classList.add('streetright');

                    tile.previousElementSibling.classList.remove('streetup');
                    tile.previousElementSibling.classList.add('streetright');
                }
            }
        });
    });
}



radios.forEach(radio => {
    radio.addEventListener('mousedown', () => {
        radio.wasChecked = radio.checked;
    });

    radio.addEventListener('click', event => {
        if (radio.wasChecked) {
            event.preventDefault();
        }
    });

    radio.addEventListener('mouseup', () => {
        if (radio.wasChecked) {
            radio.checked = false;
        }
    });
});


// savebutton.addEventListener('click', (e) =>{
//     const savedmap = {
//         map: {
//             name: "GrassTile",
//             content: playboard.innerHTML
//         }
//     };
//
//     localStorage.setItem("savedContainer", JSON.stringify(savedmap));
//
//
//
// })
formsave.addEventListener('submit', (e) => {
    e.preventDefault();

    if(formsave.savename.value !== '') {


        const savedmap = {
            map: {
                name: formsave.savename.value,
                content: playboard.innerHTML
            }
        };

        formsave.savename.value = '';

        // Always load fresh and ensure it's an array

        if (!Array.isArray(saves)) {
            saves = [];
        }

        saves.push(savedmap);

        localStorage.setItem("savedContainer", JSON.stringify(saves));
        localStorage.setItem("currentSave", JSON.stringify(savedmap));
    }
});









document.getElementById("open-popup").addEventListener("click", () => {
    popup.classList.remove("hidden");
    overlay.classList.remove("hidden");
});

document.getElementById("close-popup").addEventListener("click", () => {
    popup.classList.add("hidden");
    overlay.classList.add("hidden");
});


overlay.addEventListener("click", () => {
    popup.classList.add("hidden");
    overlay.classList.add("hidden");
});


function exportJSON(data, filename = "data.json") {
    const json = JSON.stringify(data, null, 2); // hezké formátování
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}
// document.getElementById("jsonFile").addEventListener("change", function () {
//     const file = this.files[0];
//     const reader = new FileReader();
//
//     reader.onload = function () {
//         const data = JSON.parse(reader.result);
//         saves.push(data)
//
//
//     };
//
//     reader.readAsText(file);
// });


