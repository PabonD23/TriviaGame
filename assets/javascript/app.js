$('#start').on('click', function(){
    $('#start').remove();
    game. loadQuestion();

})

$(document).on('click','.answer-button', function(e){
    game.clicked(e);

})

$(document).on('click', '#reset', function(){
    game.reset();
})

var questions = [{

    question: "Which woman of the Bible gave birth to Jesus?",
    answers: ["Magdala", "Mary"," Margaret", "Martha"],
    correctAnswer: "Mary",
    image:"assets/images/2e4ffaf74dfa56111be2eb5b190f2ebf.jpg"
}, {
    question: "What brought forth water when Moses struck it?",
    answers: ["a pit", "a rock", "a tree", "a pot"],
    correctAnswer: "a rock",
    image:"assets/images/2FCE46AF00000578-3385112-image-a-4_1451988268338.jpg"
}, {
    question: "Why was Daniel put into the lion's den?",
    answers: ["he stole some honey", "because he prayed","because he was too tall", "he was mean to the people"],
    correctAnswer: "because he prayed",
    image: "assets/images/danel.jpeg"
}, {
    questions:"How did God tell Noah that he could escape God's punishment?",
    answers:["build a large boat", "start a new business", "save up money", "make a house out of stones"],
    correctAnswer:"build a large boat",
    image:"assets/images/noahsboat.jpeg"
}, { 
    question:" With what did the Lord destroy Sodom and Gomorrah? ",
    answers:["a flood", "an earthquake", "fire and brimstone", "an army of canaanities"],
    correctAnswer:"fire and brimstone",
    image:"assets/images/sodomAndGomorrah.jpeg"
},{
    question:"What did the dove bring back to Noah?",
    answers:["a lost toy", "a rock", "an olive branch", "a piece of bread"],
    correctAnswer:"an olive branch",
    image:"assets/images/olivebranch.jpeg"
},{
    question:"Who replaced Moses in his position as leader of the children of Israel?",
    answers:["Eleazar", "Joshua", "Ammon", "Caleb"],
    correctAnswer:"Joshua",
    image:"assets/images/joshualeadingchildren.jpg"
},{
    question:"The Lord promises that if Abram would obey His commandment, Abram would:",
    answers:["Become the greatest prophet of all time","Become the leader of a great nation", "Live for hundreds of years", "Be taken up to heaven to live with God"],
    correctAnswer:"Become the leader of a great nation",
    image:"assets/images/abramAnd Stars.jpeg"
},{
    question:"Why was it important that David killed the giant?",
    answers:["the giant was about to kill David's mother", "if David didn't kill the giant, his people would have to serve the giant's people", "the giant was sick", "the giant kept stealing things from David's people"],
    correctAnswer:"if David didn't kill the giant, his people would have to serve the giant's people",
    image:"assets/images/davidAndGiant.jpeg"
},{
    question:"Who found baby Moses?",
    answers:["the Queen of England", "Moses' father", " the pharaoh's daughter", "a pack of wild animals"],
    correctAnswer:"the pharaoh's daughter",
    images:"assets/images/mossesFound.jpeg"

}];

var game = {
    questions:questions,
    currentQuestion:0,
    counter:30,
    correct:0,
    incorrect:0,
    unAnswered:0,
    countdown: function(){
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter<=0){
            console.log("TIMES UP !!");
            game.timeUp();
        }
    },

    loadQuestion: function(){
        timer =  setInterval(game.countdown, 1000); 
        $('#subwrapper').html("<h2> Time Remaining: <span id='counter'>30</span> Seconds </h2>");
        $('#subwrapper').append('<h2>' + questions[game.currentQuestion].question +'</h2>');
        for(var i=0; i<questions[game.currentQuestion].answers.length;i++){
            $('#subwrapper').append('<button class="answer-button" id="button-' + i + '" data-name="' + questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
        }
    },

    nextQuestion: function(){
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();


    },
    
    timeUp: function(){
        clearInterval(timer);
        game.unAnswered++;
        $('#subwrapper').html('<h2> YOU RAN OUT OF TIME ! </h2>');
        $('#subwrapper').append('<h3> The Correct Answer is: ' + questions[game.currentQuestion].correctAnswer + "</h3>");
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3000); 
        }else{
            setTimeout(game.nextQuestion, 3000);
        }
    },

    results: function(){
        clearInterval(timer);
        $('#subwrapper').html("<h2>YOU HAVE FINISHED THE GAME !</h2>");
        $('#subwrapper').append("<h3>Correct: " + game.correct + "</h3>");
        $('#subwrapper').append("<h3>Incorrect: " + game.incorrect + "</h3>");
        $('#subwrapper').append("<h3>Unanswered: " + game.unAnswered + "</h3>"); 
        $('#subwrapper').append("<button id='reset'>RESET</button>");
    },

    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
        }else{
            game.answeredIncorrectly();
        }
    },

    answeredCorrectly: function(){
        console.log("YOU GOT THE RIGHT ANSWER!! ");
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>YOU GOT THE RIGHT ANSWER!! </h2>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3000); 
        }else{
            setTimeout(game.nextQuestion, 3000);
        }
    },

    answeredIncorrectly: function(){

        console.log("YOU GOT THE WRONG ANSWER!! ");
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>YOU GOT THE WRONG ANSWER!! </h2>');
        $('#subwrapper').append('<h3> The Correct Answer is: ' + questions[game.currentQuestion].correctAnswer + "</h3>");
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3000); 
        }else{
            setTimeout(game.nextQuestion, 3000);
        }
    },

    reset: function(){
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unAnswered = 0;
        game.loadQuestion();

    },
}