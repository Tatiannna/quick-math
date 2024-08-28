
let container = document.getElementById("container");

// Webapp Title
let difficultyContainer = document.createElement('div');
let master = document.createElement('h1');
master.textContent = "Master Math";
container.append(master);


// Difficulty settings
let selectDiff = document.createElement('h3');
let easy = document.createElement('button');
let medium = document.createElement('button');
let hard = document.createElement('button');
selectDiff.textContent = "Select difficulty Level";
easy.textContent = 'Easy';
medium.textContent = 'Medium';
hard.textContent = 'Hard';
easy.className = 'easy-button';
medium.className = 'medium-button';
hard.className = 'hard-button';



// Add all difficulty elements to DOM
container.append(difficultyContainer);
difficultyContainer.append(selectDiff);
difficultyContainer.append(easy);
difficultyContainer.append(medium);
difficultyContainer.append(hard);

// Add listeners
easy.addEventListener("click", (e) => {
    startTest('easy');
    difficultyContainer.remove();
});

medium.addEventListener("click", (e) => {
    startTest("medium");
    difficultyContainer.remove();
});

hard.addEventListener("click", (e) => {
    startTest('hard');
    difficultyContainer.remove();
});

const startTest = (difficulty) => {
    let startMessage = document.createElement('p');
    startMessage.textContent = `Starting a ${difficulty} test!`;
    container.append(startMessage);
    
    // COUNTDOWN todo

    const question = document.createElement('p');
    q = getQuestion(difficulty);
    question.textContent = q;
    container.append(question);
}

const getQuestion = (diff) => {
    let multiplier = 10;

    if (diff == 'medium') multiplier *= 20;
    else if (diff =='hard') multiplier *= 30;

    let operations = ["x", "+", "-", "/"];

    let num1 = Math.floor(Math.random() * multiplier);
    let num2 = Math.floor(Math.random() * multiplier);
    let operation = Math.floor(Math.random() * 3);
    let ans = 'this is the ans';
    
    return `${num1} ${operations[operation]} ${num2}`
}

const footer = document.createElement('div');
const linkHome = document.createElement('a');
footer.append(linkHome);
linkHome.setAttribute('href', './index.html');
linkHome.textContent = 'Restart';
container.append(footer);




// let questionContainer = document.createElement('div');
// let question = document.createElement('h3');
// let answerContainer1 = document.createElement('div');
// let answerContainer2 = document.createElement('div');
// let answerContainer3 = document.createElement('div');
// let answerContainer4 = document.createElement('div');

// answerContainer1.className = 'answer-box';
// answerContainer2.className = 'answer-box';
// answerContainer3.className = 'answer-box';
// answerContainer4.className = 'answer-box';

