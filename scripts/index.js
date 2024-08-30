
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
let difficulty;

// Add all difficulty elements to DOM
container.append(difficultyContainer);
difficultyContainer.append(selectDiff);
difficultyContainer.append(easy);
difficultyContainer.append(medium);
difficultyContainer.append(hard);

// Add listeners
easy.addEventListener("click", (e) => {
    startTest('easy');
    difficulty = 'easy';
    difficultyContainer.remove();
});

medium.addEventListener("click", (e) => {
    startTest("medium");
    difficulty = 'easy';
    difficultyContainer.remove();
});

hard.addEventListener("click", (e) => {
    startTest('hard');
    difficulty = 'easy';
    difficultyContainer.remove();
});

const startTest = (difficulty) => {
    
    let questionContainer = document.createElement('div');
    questionContainer.className = 'question-container';

    let questionString, answer;
    [questionString, answer] = generateQuestion(questionContainer, difficulty);

   
    let question = document.createElement('p');
    question.className = 'question';
    question.textContent = questionString;


    questionContainer.append(question);
    container.append(questionContainer);
    displayAnswerChoices(questionContainer, answer);
    displayRestart(questionContainer);
}

const getNextQuestion = () => {
    
    questionContainer = document.querySelector('.question-container');
    question = document.querySelector('.question');
    answerContainer = document.querySelector('.answer-container');

    question.remove();
    answerContainer.remove();

    let questionString, answers;
    [questionString, answers] = generateQuestion(questionContainer, difficulty);

    question.textContent = questionString;
    questionContainer.append(question);

    displayAnswerChoices(questionContainer, answers);
    displayRestart(questionContainer);
}

const generateQuestion = (qContainer, diff) => {
    let multiplier = 50;
    
    if (diff == 'medium') multiplier = 100;
    else if (diff =='hard') multiplier = 200;

    let operations = ["x", "+", "-", "/"];

    let num1 = Math.floor(Math.random() * multiplier);
    let num2 = Math.floor(Math.random() * multiplier);
    let operation = Math.floor(Math.random() * 3);
    let questionString = `${num1} ${operations[operation]} ${num2} =  ?`
    let answers = calculateAnswers(num1, num2, operations[operation]);

    return [questionString, answers];
}

const calculateAnswers = (a, b, op) => {
    answers = [];

    if(op == '+') answers.push(a + b)
    else if (op == '-') answers.push(a - b);
    else answers.push(a * b);

    answers.push(answers[0] + 10);
    answers.push(answers[0] - 10);
    answers.push(Math.floor(answers[0] * 1.3));

    return answers;
}

const displayAnswerChoices = (qContainer, answers) => {

    let answerContainer = document.createElement('div');
    answerContainer.className = 'answer-container';

    let answerBox1 = document.createElement('div');
    let answerBox2 = document.createElement('div');
    let answerBox3 = document.createElement('div');
    let answerBox4 = document.createElement('div');

    answerBox1.className = 'answer-box';
    answerBox2.className = 'answer-box';
    answerBox3.className = 'answer-box';
    answerBox4.className = 'answer-box';

    let ans1 = document.createElement('p');
    let ans2 = document.createElement('p');
    let ans3 = document.createElement('p');
    let ans4 = document.createElement('p');

    ans1.className = 'ans';
    ans2.className = 'ans';
    ans3.className = 'ans';
    ans4.className = 'ans';

    // Todo: generate answer choices
    // Todo: Place choices randomly in boxes
    
    let correctAnswerDiv = answerBox3;

    ans1.textContent = answers[0];
    ans2.textContent = answers[1];
    ans3.textContent = answers[2];
    ans4.textContent = answers[3];

    answerBox1.append(ans1);
    answerBox2.append(ans2);
    answerBox3.append(ans3);
    answerBox4.append(ans4);

    answerContainer.append(answerBox1);
    answerContainer.append(answerBox2);
    answerContainer.append(answerBox3);
    answerContainer.append(answerBox4);

    qContainer.append(answerContainer);
    handleChoiceSelection(correctAnswerDiv);
}

const handleChoiceSelection = (correctAnsDiv) => {
    let answers = document.querySelectorAll('.answer-box');

    answers.forEach((ans) => {
        ans.addEventListener('click', (e) => {
            console.log(e.target);
            if(e.target === correctAnsDiv) console.log("correct!")
            else console.log("incorrect");
            // todo: update score
            // todo: show new question - might require refactoring
            getNextQuestion();
        });
    });
}


const displayRestart = (qContainer) => {
    const linkHome = document.createElement('a');
    qContainer.append(linkHome);
    linkHome.setAttribute('href', './index.html');
    linkHome.textContent = 'Restart';
    qContainer.append(linkHome);
}
