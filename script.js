playboard = document.querySelector('.playboard')
let arr = [];

for(let i = 0; i < 400; i++){

    const clickdiv = document.createElement('div');
    clickdiv.classList.add('trava')




    clickdiv.addEventListener('click', (e) =>{

    if(clickdiv.classList.contains('trava')){
        clickdiv.classList.remove('trava')
        clickdiv.classList.add('streetup')
        clickdiv.classList.add('street')
    }else {

        if (clickdiv.classList.contains('street')) {
            clickdiv.classList.remove('street')
            clickdiv.classList.remove('streetup')
            clickdiv.classList.remove('streetright')

            clickdiv.classList.add('water')
        } else {

            clickdiv.classList.remove('water')
            clickdiv.classList.add('trava')
        }


    }

    if(clickdiv.classList.contains('streetup')){
        // console.log(arr);
        // console.log(arr.indexOf(clickdiv));
        // console.log(playboard.children[arr.indexOf(clickdiv)+1]);
        if(clickdiv.previousElementSibling.classList.contains('streetup')
            && clickdiv.nextElementSibling.classList.contains('streetup')){

            clickdiv.nextElementSibling.classList.remove('streetup')

            clickdiv.nextElementSibling.classList.add('streetright')

            clickdiv.classList.remove('streetup')

            clickdiv.classList.add('streetright')

            clickdiv.previousElementSibling.classList.remove('streetup')

            clickdiv.previousElementSibling.classList.add('streetright')


            // clickdiv.classList.add('street')

        }

    }

    })


    playboard.append(clickdiv)
    arr.push(clickdiv);

}
playboard.forEach((clickdiv) =>{


})
function checkstate(){

}