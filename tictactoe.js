// DOM Manipulation i.e- selecting tag 

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let restart = document.querySelector("#restart");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// select player for turn 

let turn0 = true; // playerX playerO
let count = 0;

// winning condition

const winPatterns = [
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]
];

//  For Restart Game

const resetGame =()=>{
    turn0 = true;
    count = 0;
    enableBoxes ();
    msgContainer.classList.add("hide");
}

//  For all 9 boxes 
boxes.forEach((box) => {
    box.addEventListener("click", () => {
 
       if (turn0) {   // player 0 turn
           box.innerText = "O";
           box.classList.add("colorchange1");  // Text color of 'O' is "Red"
           turn0 = false;
       } 
       else {    // player X turn
        box.innerText = "X";
        box.classList.add("colorchange2");  // Text color of  'X' is "Green"
        turn0 = true;
       }
       box.disabled = true;
       count++;

      let isWinner =  checkWinner();  

      if(count === 9 && !isWinner) {
          gameDraw();
      }  // Function call for winner 
    });
});

// For Draw Game 

const gameDraw = () =>{
    msg.innerText = `Game Was Draw.`;
    msgContainer.classList.remove("hide");   // For remove hide class
    disableBoxes();
}

// For disabled boxes after game over

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

// For enable boxes for reset and restart game

const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

// For Display Winner and congratulate them

const showWinner = (winner) =>{
    msg.innerText = `Congratulations ${winner}, You Won The Game!`;
    msgContainer.classList.remove("hide");   // For remove hide class
    disableBoxes();
}


// check winner function 

const checkWinner = ()=>{
    for ( let pattern of winPatterns) {
        
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != ""&& pos3val != ""){    
            if(pos1val === pos2val && pos2val === pos3val ){
                console.log("Winner", pos1val);

                showWinner(pos1val);
                return true;
            }
        }
    }
};

// for restart game

restart.addEventListener("click", resetGame);

// for reset game

reset.addEventListener("click", resetGame);



