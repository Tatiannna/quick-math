
let container = document.getElementById("container");

// Title
let difficultyContainer = document.createElement('div');
let master = document.createElement('h1');
master.textContent = "Math Drills";
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

// For scoring
const numQuestions = 10;
let questionsAnswered = 0;
let correctAnswerCount = 0;


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
    difficulty = 'medium';
    difficultyContainer.remove();
});

hard.addEventListener("click", (e) => {
    startTest('hard');
    difficulty = 'hard';
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
    // displayRestart(questionContainer);
}

const getNextQuestion = () => {
    
    questionContainer = document.querySelector('.question-container');
    question = document.querySelector('.question');
    answerContainer = document.querySelector('.answer-container');

    question.remove();
    answerContainer.remove();

    if (questionsAnswered < numQuestions){
        let questionString, answers, correctAnswer;
        [questionString, answers, correctAnswer] = generateQuestion(questionContainer, difficulty);

        question.textContent = questionString;
        questionContainer.append(question);

        displayAnswerChoices(questionContainer, answers, correctAnswer);
        // displayRestart(questionContainer);
    }else {
        questionContainer.remove()
        displayScore();
    }
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
    let [answers, correctAnswer] = calculateAnswers(num1, num2, operations[operation]);

    return [questionString, answers, correctAnswer];
}

const calculateAnswers = (a, b, op) => {
    answers = [];
    let correctAnswer;

    if(op == '+') answers.push(a + b)
    else if (op == '-') answers.push(a - b);
    else answers.push(a * b);
    correctAnswer = answers[0];

    answers.push(answers[0] + 10);
    answers.push(answers[0] - 10);
    answers.push(Math.floor(answers[0] * 1.3));

    answers = shuffle(answers);
    return [answers, correctAnswer];
}

const shuffle = (array) => {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
  
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

const displayAnswerChoices = (qContainer, answers, correctAnswer) => {

    let answerContainer = document.createElement('div');
    answerContainer.className = 'answer-container';

    let correctAnswerDiv;
    let answerBoxes = [];
    let answerChoices = [];

    for(let i = 0; i < 4; i++){
        answerBoxes.push(document.createElement('div'));
        answerBoxes[i].className = 'answer-box';
    }

    for(let i = 0; i < 4; i++){
        answerChoices.push(document.createElement('p'))
        answerChoices[i].className = 'ans';
        answerChoices[i].textContent = answers[i];
        if (answers[i] == correctAnswer){
            correctAnswerDiv = answerBoxes[i];
        }
    }

    answerBoxes.forEach((box, index) => {
        box.append(answerChoices[index]);
        answerContainer.append(box);
    });

    qContainer.append(answerContainer);
    handleChoiceSelection(correctAnswerDiv );
}

const handleChoiceSelection = (correctAnsDiv) => {
    let answers = document.querySelectorAll('.answer-box');

    answers.forEach((ans) => {
        if (ans != correctAnsDiv){
            ans.addEventListener('click', (e) => {
                updateScore(false);
                getNextQuestion();
            });
        }else{
            ans.addEventListener('click', (e) => {
                updateScore(true);
                getNextQuestion();
            });
        }
    });
}

const updateScore = (didAnswerCorrectly) => {
    questionsAnswered++;
    correctAnswerCount = didAnswerCorrectly ? correctAnswerCount + 1 : correctAnswerCount;
}

const displayScore = () => {

    let scoreDiv = document.createElement('div');
    let scoreText = document.createElement('p');
    let scoreElement = document.createElement('p');
    let score = correctAnswerCount / numQuestions * 100;

    scoreDiv.className = 'score-container'
    scoreElement.className = 'score';
    // scoreText.textContent = "Your Score:"
    scoreElement.textContent = `${score/10} of 10 correct!`;
    scoreDiv.appendChild(scoreText);
    scoreDiv.appendChild(scoreElement);
    container.appendChild(scoreDiv);

    displayRestart(scoreDiv);
}


const displayRestart = (qContainer) => {
    const linkHome = document.createElement('a');
    qContainer.append(linkHome);
    linkHome.setAttribute('href', './index.html');
    linkHome.textContent = 'Restart';
    qContainer.append(linkHome);
}
