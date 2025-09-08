const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn')
const main = document.querySelector('.main')
const continueBtn = document.querySelector('.continue-btn')
const qSection = document.querySelector('.questions-section')
const options = document.querySelectorAll('.option');
const resultBox = document.querySelector('.result-box');

options.forEach(option => {
  option.addEventListener('click', () => {
    options.forEach(o => o.classList.remove('active')); // remove previous
    option.classList.add('active'); // highlight current
  });
});

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    qSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active')

    showQuestions(0);
}



let questionCount = 0;
let questionNumb = 1;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if(questionCount < questions.length - 1){
        questionCount++;
        questionNumb++;
        showQuestions(questionCount);
        questionCounter(questionNumb);
        options.forEach(o => o.classList.remove('active'));
    }
    else{
        resultBox.classList.add('active');
        console.log("Questions over!")
    }
}



function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    const option = document.querySelectorAll('.option');
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute('onClick','optionSelected(this)');
    }
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    console.log(userAnswer);
}

function questionCounter(index){
    const questionTotal = document.querySelector('.total-questions');
    questionTotal.textContent = `${index}/10 Questions`;
}