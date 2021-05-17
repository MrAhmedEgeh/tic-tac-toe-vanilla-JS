
/* ------------------initialization ---------------*/
let game = 1;
let player = {
    name: 'You',
    turn : null,
    type : null,
    win : null,
    score : ''
}
let computer = {
    name: 'Computer',
    turn : null,
    type : null,
    win : null,
    score : ''
}
let xo = ["x","o"];

let cellState = ["empty","empty","empty","empty","empty","empty","empty","empty","empty"];
let cell = document.querySelectorAll('[data-selection]');


const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
/* ------------------END initialization ---------------*/





/*----------------who starts first---------------------*/

(function whoStartsFirst(){
    let i,j;
    for(;;){
        i = Math.floor(Math.random()*2);
        j = Math.floor(Math.random()*2);
        if(i != j){
            player.turn = i;
            player.type = xo[i];
            computer.turn = j;
            computer.type = xo[j];
            break;
        }
    }

    if(i > j){thePlayer();}else{theComputer();}

})()


/*----------------END who starts first---------------------*/
  

/*---------------thePlayer Function-------------------------*/
function thePlayer(){
    if(player.turn !== 1 || game === 0){return;}

    let el = document.querySelector('div.container');

    el.addEventListener("click",function handl(e){
        store = parseInt(e.target.getAttribute("data-selection"));
        if(cellState[store] === computer.type){return}  // prevent clicking on cliked cell

        cell[store].classList.add(player.type);
        cellState[store] = player.type;

        //check who won
        if(checkWin(player.type)){
            endGame(player.name, true);
        }else if(isDraw(player.type)){
            endGame(player.name, false);
        }


        e.currentTarget.removeEventListener(e.type, handl);
        [player.turn, computer.turn] = [computer.turn, player.turn];
        setTimeout(() => {theComputer();},1500);
    });


}






/*---------------END OF thePlayer Function--------------------*/


/*--------------theComputer function---------------------------*/
function theComputer(){
    if(computer.turn !== 1 || game === 0){return;}

    for(;;){
        let i = Math.floor(Math.random()*9);  // random number
        if(cellState[i] !== "o" && cellState[i] !== "x"){ // if cell is empty
            cell[i].classList.add(computer.type);
            cellState[i] = computer.type;

            if(checkWin(computer.type)){
                endGame(computer.name, true);
            }else if(isDraw(computer.type)){
                endGame(computer.name, false);
            }
            break;
        }
    }
    [player.turn, computer.turn] = [computer.turn, player.turn];  // swapping values
    thePlayer();
}







/*--------------END theComputer function---------------------------*/





function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return cell[index].classList.contains(currentClass)
      })
    })
  }




function endGame(name, bool){
    if(bool){
        player.turn = 0;
        computer.turn = 0;
        game = 0;
        console.log(`${name} has won the game`);
    }else{
        player.turn = 0;
        computer.turn = 0;
        game = 0;
        console.log(`its a draw`);
    }
}



function isDraw() {
    return [...cell].every(cel => {
      return cel.classList.contains(player.type) || cel.classList.contains(computer.type)
    })
  }