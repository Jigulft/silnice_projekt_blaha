const playboard = document.querySelector('.playboard')
const radios = document.querySelectorAll('.buttons input[type="radio"]');
const formsave = document.getElementById("form-save");
let saves = JSON.parse(localStorage.getItem("savedContainer")) || [];
const current = JSON.parse(localStorage.getItem("currentSave") || "null");
let value = document.querySelector('input[name="tiletype"]:checked')?.value;
const clearbutton = document.getElementById('clear-button')
const radiosbuttons = document.querySelectorAll('input[type="radio"]');
const popup1 = document.getElementById("popup1");
const popup2 = document.getElementById("popup1");
const popup3 = document.getElementById("popup1");
const overlay1=document.getElementById("overlay1");
const overlay2=document.getElementById("overlay2");
const overlay3=document.getElementById("overlay3");

function clearmap(){
    for (let i = 0; i < 400; i++) {

        const clickdiv = document.createElement('div');

        clickdiv.classList.add('trava')


        playboard.append(clickdiv)


    }

    attachTileEvents()
}
clearbutton.addEventListener('click', (e) =>{


    localStorage.removeItem('currentSave')
    clearmap()
    window.location.reload()

})


if(!current) {
    console.log("No saved container found");
    clearmap()
} else {


    playboard.innerHTML = current.map.content;

    attachTileEvents();

}





for (const radio of radiosbuttons) {
    radio.addEventListener('change', (event) => {
        value = event.target.value;
        console.log("Vybraná hodnota:", value);
    });
}







function attachTileEvents() {
    const tiles = playboard.querySelectorAll("div");




    tiles.forEach(tile => {
        tile.addEventListener("click", () => {

            console.log(value)

            if(!value) {
                if (tile.classList.contains('trava')) {
                    tile.classList = ""
                    tile.classList.add('streetup', 'street');
                } else if (tile.classList.contains('street')) {
                    tile.classList = ""
                    tile.classList.add('water');
                } else {
                    tile.classList = ""
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
            }else{
                tile.classList = ""
                tile.classList.add(String(value))

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

const formsaveerror = formsave.querySelector('.error')

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



        if (!Array.isArray(saves)) {
            saves = [];
        }

        saves.push(savedmap);

        localStorage.setItem("savedContainer", JSON.stringify(saves));
        localStorage.setItem("currentSave", JSON.stringify(savedmap));

        popup1.classList.add("hidden");
        overlay1.classList.add("hidden");
    }else{

        formsaveerror.classList.remove('hidden')
    }
});











document.getElementById("open-popup").addEventListener("click", () => {
    document.getElementById("popup1").classList.remove("hidden");
    document.getElementById("overlay1").classList.remove("hidden");
});

document.getElementById("inport-json").addEventListener("click", () => {
    document.getElementById("popup2").classList.remove("hidden");
    document.getElementById("overlay2").classList.remove("hidden");
});

document.getElementById("export-json").addEventListener("click", () => {
    document.getElementById("popup3").classList.remove("hidden");
    document.getElementById("overlay3").classList.remove("hidden");
});



document.querySelectorAll(".close-popup").forEach(btn => {
    btn.addEventListener("click", () => {
        const popup = btn.closest(".popup");
        const overlay = popup.nextElementSibling;

        popup.classList.add("hidden");
        overlay.classList.add("hidden");
    });
});


document.querySelectorAll(".popup-overlay").forEach(overlay => {
    overlay.addEventListener("click", () => {
        overlay.classList.add("hidden");
        overlay.previousElementSibling.classList.add("hidden");
    });
});



const directory_form = document.getElementById('form-directory')
const exportjsonerror = directory_form.querySelector('.error')

directory_form.addEventListener('submit',(e) =>{


if(formsave.savename.value) {


    const savedmap = {
        map: {
            name: formsave.savename.value,
            content: playboard.innerHTML
        }
    };


    exportJSON(savedmap, directory_form.text.value)
}else{
    e.preventDefault()
    exportjsonerror.classList.remove('hidden')
}
})

const jsonfileform = document.getElementById('form-jsonfile')
const inportjsonerror = jsonfileform.querySelector('.error')



jsonfileform.addEventListener('submit', (e) => {




        const file = jsonfileform.jsonfile.files[0];

    if(file !== undefined) {

        const reader = new FileReader();

        reader.onload = function () {
            const data = JSON.parse(String(reader.result));


            saves.push(data);


            localStorage.setItem("currentSave", JSON.stringify(data));


            popup2.classList.remove("hidden");
            overlay2.classList.remove("hidden");
        };

        reader.readAsText(file);
    }else{
        e.preventDefault()
        inportjsonerror.classList.remove('hidden')
    }
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





