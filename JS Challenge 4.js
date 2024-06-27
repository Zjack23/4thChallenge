const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const saveScoreButton = document.getElementById('save-score-btn');

let shuffledQuestions, currentQuestionIndex;
let time = 60;
let timer;

startButton.addEventListener('click', startQuiz);
saveScoreButton.addEventListener('click', saveScore);

function startQuiz() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    startTimer();
    setNextQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        time--;
        timerElement.textContent = time;
        if (time <= 0) {
            endQuiz();
        }
    }, 1000);
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (!correct) {
        time -= 10;
        if (time < 0) time = 0;
        timerElement.textContent = time;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length && time > 0) {
        setNextQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreElement.textContent = `Your score is ${time}`;
}

function saveScore() {
    const initials = document.getElementById('initials').value;
    if (initials) {
        // Save the score with initials
        alert(`Score saved! Initials: ${initials}, Score: ${time}`);
    }
}

const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hypertext Markup Language', correct: true },
            { text: 'Hyperlinks and Text Markup Language', correct: false },
            { text: 'Home Tool Markup Language', correct: false },
            { text: 'Hyperlinking Text Marking Language', correct: false }
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Computer Style Sheets', correct: false },
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Colorful Style Sheets', correct: false },
            { text: 'Creative Style Sheets', correct: false }
        ]
    },
    {
        question: 'What does JS stand for?',
        answers: [
            { text: 'JavaScript', correct: true },
            { text: 'JavaSheet', correct: false },
            { text: 'JustScript', correct: false },
            { text: 'JunctionScript', correct: false }
        ]
    },
    {
        question: 'Which HTML tag is used to define an internal style sheet?',
        answers: [
            { text: '<style>', correct: true },
            { text: '<css>', correct: false },
            { text: '<script>', correct: false },
            { text: '<link>', correct: false }
        ]
    },
    {
        question: 'Which property is used to change the background color?',
        answers: [
            { text: 'background-color', correct: true },
            { text: 'bgcolor', correct: false },
            { text: 'color', correct: false },
            { text: 'background', correct: false }
        ]
    }
];
