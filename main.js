const fieldArr = document.querySelectorAll('.choose');
const cell = document.querySelectorAll('.field');
let isChoose = 0;
let x = '<div class="choose cross"></div>';
let o = '<div class="choose zero"></div>';
let player = x;
let playerName = "Крестиков";
let winIndex = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [3,5,7],
    [1,5,9]
]

for ( let i = 1; i <= 9; i++) {
    cell[i - 1].setAttribute('pos', i);
}

for (let f = 0; f < cell.length; f++) {
    let el = cell[f];
    el.addEventListener('click', cellClick, false); 
}
function cellClick() {
    let data = [];
    if (!this.innerHTML) {
        this.innerHTML = player;
    } else {
        alert('Ячейка занята!');
        return;
    }
    for ( let i in cell) {
        if ( cell[i].innerHTML === player) {
            data.push(parseInt(cell[i].getAttribute('pos')))
        }
    }   
    player =  player == x ? o : x;
    if (checkWin(data)) {
        alert('Победа ' + playerName);
        counter(playerName);
        location.reload();
    } else {
        let draw = true; 
        for ( let i in cell ) {
            if ( cell[i].innerHTML == '' ) draw = false;
        }
        if ( draw ) {
            alert('Ничья!');
            location.reload();
        }
    }
    console.log(data);
    playerName = playerName == "Крестиков" ? 'Ноликов' : 'Крестиков';
}

function checkWin(data) {
    for ( let i in winIndex ) {
        let win = true;
        for ( let j in winIndex[i] ) {
            let id = winIndex[i][j];
            let ind = data.indexOf(id);
            if ( ind == -1 ) {
                win = false
            }
        }
        if (win) return true;
    }
} 

function counter(playerName){
    if ( playerName == "Крестиков") {
        let counterX = parseInt(localStorage.getItem('countX'));
        counterX += 1;
        localStorage.setItem('countX', counterX);
    } else {
        let counterO = parseInt(localStorage.getItem('countO'));
        counterO += 1;
        localStorage.setItem('countO', counterO);
    }
}

document.querySelector('.one').innerHTML = localStorage.getItem('countX');
document.querySelector('.two').innerHTML = localStorage.getItem('countO');

let refresh = document.querySelector('.header-btn');

refresh.onclick = () => {
    let counterO = 0;
    localStorage.setItem('countO', counterO);
    let counterX = 0;
    localStorage.setItem('countX', counterX);
    location.reload();
}



