$(document).ready(function () {
    const TIMEALLOWED = 20;
    const SRC = "assets/images/";
    const RESULTDISPLAYTIME = 3000;
     var timeLeft = 20;

        function updateTimer(time) {
       $(".counting-down").html(`<h2>Time Remaining: ${time} Seconds</h2>`);
     }

       

        function toString() {
            return `Question: ${questionStr} Answer: ${answer}, Correct: ${correct}, TimeLeft: ${timeLeft}, url: ${imgSrc}`
        }

        function startCountDown() {
          setInterval(() => { countDown() }, 1000);
        }

        function countDown() {
            timeLeft--;
            
            
            if (timeLeft == 0) {    

                clearStage();
            }
            updateTimer(timeLeft);
        }
    

    $("#questionnaire").hide();
    $("#results-page").hide();
    
    $("#start-button").click(function(){
        $("#start-button").hide();
        $("#questionnaire").show();
        
        startCountDown()
    });
    
    $("#done-button").click(function(){
        $("#questionnaire").hide();
        $("#results-page").show();
         displayResult();
         clearStage();
    });	

 

    function clearStage() {
        $("#questionnaire").hide();
        $("#results-page").show();

    }

     function setScore() {
         
     }
 


});
