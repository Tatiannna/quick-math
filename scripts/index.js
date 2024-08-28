
let container = document.getElementById("container");

// Webapp Title
let difficultyContainer = document.createElement('div');
let master = document.createElement('h1');
master.textContent = "Math Master";
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

const startTest = async (difficulty) => {
    
    let questionContainer = document.createElement('div');
    let questionString, answer;
    [questionString, answer] = generateQuestion(questionContainer, difficulty);

    questionContainer.className = 'question-container';
    let question = document.createElement('p');
    question.className = 'question';
    question.textContent = questionString;
    questionContainer.append(question);
    container.append(questionContainer);
    displayAnswerChoices(questionContainer, answer);
    displayRestart(questionContainer);
}

const generateQuestion = (qContainer, diff) => {
    let multiplier = 10;

    if (diff == 'medium') multiplier *= 20;
    else if (diff =='hard') multiplier *= 30;

    let operations = ["x", "+", "-", "/"];

    let num1 = Math.floor(Math.random() * multiplier);
    let num2 = Math.floor(Math.random() * multiplier);
    let operation = Math.floor(Math.random() * 3);
    let questionString = `${num1} ${operations[operation]} ${num2}`
    let ans = calculateAnswer(questionString);

    return [questionString, ans];
}

const calculateAnswer = (questionString) => {
    return 5;
}

const displayAnswerChoices = (qContainer, answer) => {

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

    qContainer.append(answerContainer);
}

const displayRestart = (qContainer) => {
    const linkHome = document.createElement('a');
    qContainer.append(linkHome);
    linkHome.setAttribute('href', './index.html');
    linkHome.textContent = 'Restart';
    qContainer.append(linkHome);
}
