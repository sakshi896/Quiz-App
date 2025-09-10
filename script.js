const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');
const resultsEl = document.getElementById('results');

let shuffledQuestions, currentIndex, score = 0;


const questions = [
    {
        question: "What does HTML stand for?",
        answers:[
            {text: "Home Tool Markup Language", correct: false},
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Hyperlink Tool and Markup Language", correct: false},
            {text: "Home Text Markup Language", correct: false},
        ]
    },

    {
        question: "What is a correct HTML markup for the document type declaration?",
        answers:[
            {text: "<!DOCTYPE html>", correct: true},
            {text: "DOCTYPE html;", correct: false},
            {text: "--doctype HTML", correct: false},
            {text: "-DOCTYPE html;", correct: false},
        ]
    },

     {
        question: "Which of the following headers is the largest and most important header?",
        answers:[
            {text: "<h1>", correct: true},
            {text: "<h2>", correct: false},
            {text: "<h6", correct: false},
            {text: "<h4>", correct: false},
        ]
    },

     {
        question: "What is the purpose of the <head> tag?",
        answers:[
            {text: "To display main content", correct: false},
            {text: "To define metadata and links to CSS/JS", correct: true},
            {text: "DOCTYPE html;", correct: false},
            {text: "--doctype HTML", correct: false},
        ]
    },

     {
        question: "Which tag is used to insert an image?",
        answers:[
            {text: "<picture>", correct: false},
            {text: "<image>;", correct: false},
            {text: "<src>", correct: false},
            {text: "<img>;", correct: true},
        ]
    },

     {
        question: "What does CSS stands for?",
        answers:[
            {text: "Cascading Style Sheets", correct: true},
            {text: "Computer Style System", correct: false},
            {text: "Creative Style Setup", correct: false},
            {text: "Color Style Sheet", correct: false},
        ]
    },

     {
        question: "How do you center text in CSS",
        answers:[
            {text: "align-text:center", correct: false},
            {text: "text-center:true;", correct: false},
            {text: "text-align:center", correct: true},
            {text: "center-text:yes", correct: false},
        ]
    },

     {
        question: "What is JavaScript used for?",
        answers:[
            {text: "Styling Web Pages", correct: false},
            {text: "Structuring Content", correct: false},
            {text: "Adding interactivity and dynamic behavior", correct: true},
            {text: "-DOCTYPE html;", correct: false},
        ]
    },

     {
        question: "How do you create function in Javascript?",
        answers:[
            {text: "create function myFunction() { }", correct: false},
            {text: "function myFunction() { }", correct: true},
            {text: "def myFunction() { }", correct: false},
            {text: "method myFunction() { }", correct: false},
        ]
    },

     {
        question: "How do you declare variable in Javascript?",
        answers:[
            {text: "let x = 5;", correct: false},
            {text: "var x = 5;", correct: false},
            {text: "const x = 5;", correct: false},
            {text: "All of the above", correct: true},
        ]
    }
];



startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentIndex++;
  setNextQuestion();
});

function startQuiz() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentIndex = 0;
  score = 0;
  resultsEl.classList.add('hide');
  questionContainer.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentIndex]);
}

function showQuestion(q) {
  questionElement.innerText = q.question;
  q.answers.forEach(ans => {
    const btn = document.createElement('button');
    btn.innerText = ans.text;
    btn.className = 'button';
    if (ans.correct) btn.dataset.correct = true;
    btn.addEventListener('click', selectAnswer);
    answerButtonsEl.appendChild(btn);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === 'true';
  if (correct) score++;
  Array.from(answerButtonsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === 'true');
  });
  if (questions.length > currentIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    showResults();
  }
}

function setStatusClass(el, correct) {
  clearStatusClass(el);
  el.classList.add(correct ? 'correct' : 'wrong');
}

function clearStatusClass(el) {
  el.classList.remove('correct');
  el.classList.remove('wrong');
}

function showResults() {
  questionContainer.classList.add('hide');
  resultsEl.classList.remove('hide');
  resultsEl.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your score: ${score} out of ${questions.length}</p>
    <button id="restart-btn" class="button">Restart Quiz</button>
  `;
  document.getElementById('restart-btn').addEventListener('click', startQuiz);
}