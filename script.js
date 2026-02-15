const playboard = document.querySelector('.playboard')
const radios = document.querySelectorAll('.buttons input[type="radio"]');

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

            const savedmap = {
                map: {
                    name: formsave.savename.value,
                    content: playboard.innerHTML
                }
            };


            localStorage.setItem("currentSave", JSON.stringify(savedmap));


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

        popup.classList.add("hidden");
        overlay.classList.add("hidden");
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


popup2 = document.getElementById('popup2')
overlay2 = document.getElementById('popup-overlay2')

popup3 = document.getElementById('popup3')
overlay3 = document.getElementById('popup-overlay3')


const jsoninportbutton = document.getElementById('inport-json')
const jsonexportbutton = document.getElementById('export-json')


jsoninportbutton.addEventListener('click', (e) =>{
    console.log('daf')
    popup2.classList.remove("hidden");
    overlay2.classList.remove("hidden");

})

jsonexportbutton.addEventListener('click', (e) =>{
    console.log('fad')

    popup3.classList.remove("hidden");
    overlay3.classList.remove("hidden");

})


const directory_form = document.getElementById('form-directory')


directory_form.addEventListener('submit',(e) =>{



    const savedmap = {
        map: {
            name: formsave.savename.value,
            content: playboard.innerHTML
        }
    };



    exportJSON(savedmap, directory_form.text.value)
})

const jsonfileform = document.getElementById('form-jsonfile')




jsonfileform.addEventListener('submit', (e) => {




    const file = jsonfileform.jsonfile.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {
        const data = JSON.parse(String(reader.result));

        // Add to saves
        saves.push(data);

        // Save as current save
        localStorage.setItem("currentSave", JSON.stringify(data));

        // NOW show popup (after data is loaded)
        popup2.classList.remove("hidden");
        overlay2.classList.remove("hidden");
    };

    reader.readAsText(file);
});





function exportJSON(data, filename = "data.json") {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);

    popup3.classList.remove("hidden");
    overlay3.classList.remove("hidden");
}





