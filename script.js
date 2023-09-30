let ruleBtn = document.querySelector(".rules-btn");
let crossBtn = document.querySelector(".close-btn");
let modalRules = document.querySelector(".modal");


let choosedBtn = document.querySelectorAll(".choosed-btn");
let gameDiv = document.querySelector(".game");
let resultsDiv = document.querySelector(".results");
let resultMiddle = document.querySelectorAll(".results__middle");

let resultWinner = document.querySelector(".results_text-area");
let resultText = document.querySelector(".results__text");
let againstPcText = document.querySelector(".against-pc");
let plyAgnBtn = document.querySelector(".play-again");


let nextBtn = document.querySelector(".next-btn");

let pcUpdatedScore = document.querySelector(".pc-updated-score");
let userUpdatedScore = document.querySelector(".your-updated-score");

let pcScoreValue = localStorage.getItem("pc-updated-score");
let myScoreValue = localStorage.getItem("your-updated-score");



if (pcScoreValue == null) {
    localStorage.setItem("pc-updated-score", 0);
} else {
    pcUpdatedScore.innerText = pcScoreValue;
}
if (myScoreValue == null) {
    localStorage.setItem("your-updated-score", 0);
} else {
    userUpdatedScore.innerText = myScoreValue;
}

let pcScore = 0;
let myScore = 0;

pcScore = parseInt(localStorage.getItem('pc-updated-score'));
myScore = parseInt(localStorage.getItem('your-updated-score'));



let picked = [
    {
        name: "paper",
        beats: "rock"
    },
    {
        name: "scissors",
        beats: "paper"
    },
    {
        name: "rock",
        beats: "scissors"
    },
];

choosedBtn.forEach(button => {
    button.addEventListener("click",() => {
        let pickedName = button.dataset.choice;
        let choice = picked.find(choice => choice.name === pickedName);
        choose(choice);
    })
}); 

function choose(choice){
    let pcPicked = pcChoose();
    displayResults([choice,pcPicked]);
    displayWinner([choice,pcPicked]);
}

function pcChoose(){
    let rand = Math.floor(Math.random() * picked.length);
    return picked[rand];
}

function displayResults(results){
    resultMiddle.forEach((resultDiv,idx) => {
        resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
            <img src="${results[idx].name}.png" alt="${results[idx].name}"/>
        </div>
        `;
    });

    gameDiv.classList.toggle("disp");
    resultsDiv.classList.toggle("disp");
}

function displayWinner(results) {
    let userWins = isWinner(results);
    let pcWins = isWinner(results.reverse());

    if(userWins)
    {
        resultText.innerText = "YOU WIN";
        againstPcText.innerText = "AGAINST PC";
        plyAgnBtn.textContent = "PLAY AGAIN";
        ruleBtn.classList.add("shift-rules-btn");
        resultMiddle[0].classList.toggle("winner");
        nextBtn.classList.add("show-next-btn");
        myScore = myScore + 1;
        localStorage.setItem("your-updated-score",userUpdatedScore.innerText = myScore);
    }
    else if(pcWins){
        resultText.innerText = "YOU LOST";
        againstPcText.innerText = "AGAINST PC";
        plyAgnBtn.textContent = "PLAY AGAIN";
        resultMiddle[1].classList.toggle("winner");
        pcScore = pcScore + 1;
        localStorage.setItem("pc-updated-score",pcUpdatedScore.innerText = pcScore);
    }
    else{
        resultText.innerText = "TIE UP";
        plyAgnBtn.textContent = "REPLAY";
    }

    resultWinner.classList.toggle("disp");
    resultsDiv.classList.toggle("show-winner");
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

plyAgnBtn.addEventListener("click",() => {
    gameDiv.classList.toggle("disp");
    resultsDiv.classList.toggle("disp");

    resultMiddle.forEach(resultDiv => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove("winner");
    });

    resultText.innerText = "";
    againstPcText.innerText = "";
    resultWinner.classList.toggle("disp");
    resultsDiv.classList.toggle("show-winner");

    ruleBtn.classList.remove("shift-rules-btn");
    nextBtn.classList.remove("show-next-btn");
});

function rulesClicked(){
    modalRules.classList.toggle("show-modal");
}

function closeClicked(){
    modalRules.classList.toggle("show-modal");
}

ruleBtn.addEventListener("click",rulesClicked);
crossBtn.addEventListener("click",closeClicked);

nextBtn.addEventListener("click",() => {
    location.href = "win.html";
});
function show_rules(){
    let box = document.querySelector('.borderArea');
    box.style.display = "block";
}
function closedBtn(){
    let box = document.querySelector('.borderArea');
    box.style.display = "none";
}

function homepage(){
    window.location.href = "index.html";
}


