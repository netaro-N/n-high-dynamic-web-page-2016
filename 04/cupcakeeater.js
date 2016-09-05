(function(){
    'use strict';
    const eatButton = document.getElementById('eat');
    const number = document.getElementById('cupcakes')
    let Cupcake = Math.floor( Math.random() * 450 ) + 51 ;
    number.innerText = Cupcake;
    eatButton.onclick = () => {
        Cupcake = Cupcake - 1;
        number.innerText = Cupcake;
        if(Cupcake > 0){
            return;
        } else if(Cupcake == 0){
            alert("おめでとう！カップケーキを食べ切ったぞ！");
            eatButton.disabled = "true";
        } else if(Cupcake < 0){
            alert("ページを更新してください");
        }
    }
})();