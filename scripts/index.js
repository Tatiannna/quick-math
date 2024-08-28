
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
    container.append(startMessage);
    
    // COUNTDOWN todo

    const question = document.createElement('p');
    question.className = 'question';
    q = generateQuestion(difficulty);
    question.textContent = q;
    container.append(question);
}

const generateQuestion = (diff) => {
    let multiplier = 10;

    if (diff == 'medium') multiplier *= 20;
    else if (diff =='hard') multiplier *= 30;

    let operations = ["x", "+", "-", "/"];

    let num1 = Math.floor(Math.random() * multiplier);
    let num2 = Math.floor(Math.random() * multiplier);
    let operation = Math.floor(Math.random() * 3);
    let ans = 'this is the ans';

    displayAnswerChoices(ans);
    
    return `${num1} ${operations[operation]} ${num2}`
}

const displayAnswerChoices = (answer) => {
    // let questionContainer = document.createElement('div');
    // let question = document.createElement('h3');

    let answerContainer = document.createElement('div');
    answerContainer.className = 'answer-container';

    let answerChoice1 = document.createElement('div');
    let answerChoice2 = document.createElement('div');
    let answerChoice3 = document.createElement('div');
    let answerChoice4 = document.createElement('div');

    answerChoice1.className = 'answer-box';
    answerChoice2.className = 'answer-box';
    answerChoice3.className = 'answer-box';
    answerChoice4.className = 'answer-box';

    answerContainer.append(answerChoice1);
    answerContainer.append(answerChoice2);
    answerContainer.append(answerChoice3);
    answerContainer.append(answerChoice4);

    container.append(answerContainer);
}

const footer = document.createElement('div');
const linkHome = document.createElement('a');
footer.append(linkHome);
linkHome.setAttribute('href', './index.html');
linkHome.textContent = 'Restart';
container.append(footer);