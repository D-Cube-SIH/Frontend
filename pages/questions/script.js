const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn')
const main = document.querySelector('.main')
const continueBtn = document.querySelector('.continue-btn')
const qSection = document.querySelector('.questions-section')
const options = document.querySelectorAll('.option');
const resultBox = document.querySelector('.result-box');
const resultText = document.querySelector('.results');

class Answers {
    constructor() {
        this.val = [];
        this.temp = 0;
        this.resultRespose = []
    }
    addAnswers = (answer) => {
        this.val.push(answer);
    }
    addValue(value) {
        this.temp = value;
    }
    showAnswers() {
        return this.val;
    }
}

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

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onClick', 'optionSelected(this)');
    }
}





function optionSelected(answer) {
    let userAnswer = answer.textContent;
    ans.temp = userAnswer
}


let questionCount = 0;
let questionNumb = 1;

const nextBtn = document.querySelector('.next-btn');
const ans = new Answers();

nextBtn.addEventListener('click', () => {
    ans.addAnswers(ans.temp.replace(/\n/g, "").trim());
    ans.temp = 0
    console.table(ans.showAnswers())
})

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        questionNumb++;
        showQuestions(questionCount);
        questionCounter(questionNumb);
        options.forEach(o => o.classList.remove('active'));
    }
    else {
        resultBox.classList.add('active');
        console.log("Questions over!");
        ans.resultRespose = questions.map((items, index) => {
            let temp = { ...items }
            temp.optionSelected = ans.val[index];
            delete temp.options;
            delete temp.numb;
            return temp;
        });
        console.table(ans.resultRespose);
        const response = fetch("http://localhost:8080/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer EMPTY"
            },
            body: JSON.stringify({
                model: "CBT-Copilot",
                messages: [
                    { role: "system", content: "You are a compassionate CBT therapist." },
                    { role: "user", content: this.resultRespose }
                ]
            })
        })
        .then(res => res.json())
        .then(res => {
            resultText.textContent = res;
        });
    }
}


function questionCounter(index) {
    const questionTotal = document.querySelector('.total-questions');
    questionTotal.textContent = `${index}/10 Questions`;
}