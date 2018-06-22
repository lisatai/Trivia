$(document).ready(function () {
    const TIMEALLOWED = 20;
    const SRC = "assets/images/";
    const RESULTDISPLAYTIME = 3000;

    class Question {

        /**
         * A question object with everything instantiated.
         * @param {String} questionStr 
         * @param {String} answer 
         * @param {String[]} choicesList 
         */
        constructor(questionStr, answer, choicesList, imgSrc) {
            this.questionStr = questionStr;
            this.answer = answer;
            this.choicesList = choicesList;
            this.imgSrc = imgSrc;
            this.correct = false;
            this.timeLeft = TIMEALLOWED;
            this.interval = null;
        }

        toString() {
            return `Question: ${this.questionStr} Answer: ${this.answer}, Correct: ${this.correct}, TimeLeft: ${this.timeLeft}, url: ${this.imgSrc}`
        }

        startCountDown() {
            this.interval = setInterval(() => { this.countDown() }, 1000);
        }

        countDown() {
            this.timeLeft--;
            updateTimer(this.timeLeft);
            if (this.timeLeft === 0) {
                this.clearCountDown();
                clearStage();
                displayResult(this);
            }
        }

        clearCountDown() {
            clearInterval(this.interval);
        }
    }



    var timeSec = $(".time-section");
    var quesSec = $(".question-section");
    var choicesSec = $(".choices-section");
    var totalWins = 0;
    var totalLoses = 0;
    var totalQues = 0;
    var quesList = [];
    var quesNum = 0;
    var gameOver = false;

    function updateTimer(time) {
        timeSec.html(`<h2>Time Remaining: ${time} Seconds</h2>`);
    }


    function stageQuestion(question) {
        clearStage();
        timeSec.append(`<h2>Time Remaining: ${question.timeLeft} Seconds</h2>`);
        quesSec.append(`<h1>${question.questionStr}</h1>`);
        question.choicesList.forEach(choice => {
            choicesSec.append(`<button type="button" class="btn btn-secondary btn-lg btn-block rounded-0 option">${choice}</button>`);
        });
    }

    function clearStage() {
        timeSec.empty();
        quesSec.empty();
        choicesSec.empty();
    }

    function displayResult(question) {
        timeSec.html(`<h2>Time Remaining: ${question.timeLeft} Seconds</h2>`);
        if (question.timeLeft === 0) {
            quesSec.html(`<h1>Out of Time!</h1>`);
            choicesSec.html(`<h4>The Correct Answer was: ${question.answer}</h4>`);
        } else if (question.correct) {
            quesSec.html(`<h1>Correct!</h1>`);
        } else {
            quesSec.html(`<h1>Nope!</h1>`);
            choicesSec.html(`<h4>The Correct Answer was: ${question.answer}</h4>`);
        }
        choicesSec.append(`<img src=\"${question.imgSrc}\">`);

        setTimeout(function () {
            if (quesNum < totalQues - 1) {
                quesNum++;
                stageQuestion(quesList[quesNum]);
                quesList[quesNum].startCountDown();

            } else {
                quesSec.html(`<h1>All done, Here is how you did!</h1>`);
                choicesSec.empty();
                choicesSec.append(`<h4>Correct Answers: ${totalWins}</h4>`);
                choicesSec.append(`<h4>Incorrect Answers: ${totalLoses}</h4>`);
                choicesSec.append(`<h4>Unanswered: ${totalQues - totalLoses - totalWins}</h4>`);
                choicesSec.append(`<button type="button" class="btn btn-outline-success btn-lg btn-block rounded-0 init">Start Over?</button>`);
            }
        }, RESULTDISPLAYTIME);
    }

    function initialize() {
        totalWins = 0;
        totalLoses = 0;
        quesList = [];
        quesNum = 0;
        gameOver = false;
        clearStage();

        quesList.push(
            new Question("What was the first full length CGI movie?",
                "Toy Story", ["A Bug's Life", "Monsters' Inc", "Toy Story", "The Lion King"],
                `${SRC}toyStory.gif`)
        );

        quesList.push(
            new Question("Which of those is NOT a name of one of the Spice Girls?",
                "Fred Spice", ["Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice"],
                `${SRC}spiceGirls.gif`)
        );

        quesList.push(
            new Question("Which NBA team won the most titles in the 90s?",
                "Chicago Bulls", ["New York Knicks", "Portland Trailblazers", "Los Angeles Lakers", "Chicago Bulls"],
                `${SRC}chicagoBulls.gif`)
        );

        quesList.push(
            new Question("Which Group released the hit song, \"Smells Like Teen Spirit\"?",
                "Nirvana", ["Nirvana", "Backstreet Boys", "The OffSpring", "No Doubt"],
                `${SRC}nirvana.gif`)
        );

        totalQues = quesList.length;

        quesList.forEach(question => {
            console.log(question.toString());
        });

        stageQuestion(quesList[quesNum]);
        quesList[quesNum].startCountDown();
    }

    $(document).on("click", ".init", function () {
        /** Initializing Game. */
        initialize();
    });

    $(document).on("click", ".option", function () {
        let currQues = quesList[quesNum];
        let usrChoice = $(this).text();
        console.log(`User chose: ${usrChoice}`);
        if (usrChoice == currQues.answer) {
            totalWins++;
            currQues.correct = true;
        } else {
            totalLoses++;
            currQues.correct = false;
        }

        currQues.clearCountDown();
        clearStage();
        displayResult(currQues);
    });



});
