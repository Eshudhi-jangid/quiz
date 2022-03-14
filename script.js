const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'The smallest unit of matter that can exist independently is',
    answers: [
      { text: 'atom', correct: false },
      { text: 'molecule', correct: false },
      { text: 'ion', correct: true },
      { text: 'radical', correct: false }
    ]
  },
  {
    question: 'Inside an atom there are',
    answers: [
      { text: 'electrons', correct: true },
      { text: 'protons', correct: true },
      { text: 'neutrons', correct: true },
      { text: 'molecules', correct: false }
    ]
  },
  {
    question: 'The charge on an electron is ____ and the charge on a proton is ___',
    answers: [
      { text: 'Positive', correct: true },
      { text: 'Negative', correct: true },
      { text: 'Neutral', correct: false }
    ]
  },
  {
    question: 'The SI unit of length, metre, is denoted by ____and the SI unit of electric current, ampere, is denoted by ___',
    answers: [
      {text:'A',correct:true },
      { text: 'M', correct: true }
    ]
  },{
    question: 'A hundredth of a metre is a _____',
    answers: [
      {text:'centimeter',correct:true },
      { text: 'kilometer', correct: false }
    ]
  },
  {
    question: 'Mass and energy are interconvertible.',
    answers: [
      {text:'True',correct:true },
      { text: 'False', correct: false }
    ]
  },
  
  {
    question: 'If the side of a square is 5 cm, its area is _____, perimeter is _____and the  length of the diagonal is ____  ',
    answers: [
      {text:'25 cm ',correct:false },
      { text: '25 cm^2', correct: true },
      { text: '20 cm', correct: true },
      { text: '20 cm^2', correct: false },
      { text: '5√2 cm', correct: false },
      { text: '5√2 cm^2', correct: false },
    ]
  }
]