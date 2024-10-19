let boxes = document.querySelectorAll(".box");
let resetBtn= document.querySelector("#reset");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];


const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
}

let count = 0;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0 === true){
            box.innerText = "X"
            box.style.color = "#b0413e";
            turn0 = false;
        }
        else{
            box.innerText="O"
            turn0=true;
            box.style.color = "black";
        }
        box.disabled = true;
        count++;

        const isWinner = checkWinner();

        // Check if it's a draw (only if there's no winner)
        if (!isWinner && count === 9) {
            showDraw();
        }
    });
});

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
}



const enableBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}




const showWinner = (winner) => {
    msg.innerText = `Congratulations Winner is ${winner}`;
    msgContainer.classList.remove("hide")    
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPattern){
        let pos1val= boxes[pattern[0]].innerText;
        let pos2val= boxes[pattern[1]].innerText;
        let pos3val= boxes[pattern[2]].innerText;
        
        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if (pos1val===pos2val && pos2val===pos3val){
                console.log("Winner",pos1val);
                showWinner(pos1val);
                return true;
            }
        }
    }
    return false;
}

newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)