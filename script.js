const playboard = document.querySelector('.playboard')
const radios = document.querySelectorAll('.buttons input[type="radio"]');
//let arr = [];
const savebutton = document.getElementById('savemap')


if(!localStorage.getItem("currentSave")) {
    console.log("No saved container found");
    for (let i = 0; i < 400; i++) {

        const clickdiv = document.createElement('div');

        clickdiv.classList.add('trava')



        playboard.append(clickdiv)
        //arr.push(clickdiv);

    }

    attachTileEvents()
} else {
    console.log('save')



    playboard.innerHTML = JSON.parse(localStorage.getItem("currentSave")).content;


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


savebutton.addEventListener('click', (e) =>{
    const savedmap = {
        map: {
            name: "GrassTile",
            content: playboard.innerHTML
        }
    };

    localStorage.setItem("savedContainer", JSON.stringify(savedmap));



})


//const saved = localStorage.getItem("savedContainer"); if (saved) { container.innerHTML = saved; }


function checkstate(){

}