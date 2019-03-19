$(document).ready(function () {

    //create variables for questions using an array of objects
    var options = [
        {
            question: "Which designer is often credited with the idea of the necessity of the 'little black dress'?",
            choices: ["Louis Vuitton", "Michael Kors", "Coco Chanel", "Otto Lucas"],
            answer: 2,
            photo: "assets/images/black-dress.jpg",
        },

        {
            question: "Which of these American clothing designers was known for his racy and somewhat decadent television commercials that included stars such as Brooke Shields and Mark Wahlberg?",
            choices: ["Collette Dinnigan", "Christian Dior", "Charles Worth", "Calvin Klein"],
            answer: 3,
            photo: "assets/images/calvin-klein.jpg",
        },

        {
            question: "Which one of these famous French clothing designers became wildly popular when he released his 'New Look' designs in 1947?",
            choices: ["Charles Jourdan", "Christian Dior", "Gianni Versace", "Christian Louboutin"],
            answer: 1,
            photo: "assets/images/dior.jpeg",
        },

        {
            question: "Ralph Lauren's fame was highlighted after he designed the costumes used in what movie?",
            choices: ["The Great Gatsby", "Showgirls", "The Devil Wears Prada", "Zoolander"],
            answer: 0,
            photo: "assets/images/great-gatsby.jpg",
        },

        {
            question: "In 1995, which of these Italian designers created the wardrobes for the films 'Judge Dredd' and 'Showgirls', before being murdered on the steps of his Miami Beach home in 1997?",
            choices: ["Donatella Versace", "Giorgio Aramani", "Coco Chanel", "Gianni Versace"],
            answer: 3,
            photo: "assets/images/versace.jpeg",
        },

        {
            question: "Which fashion designer, famous for his rock and punk-inspired creations, committed suicide days after his mother died?",
            choices: ["Michael Kors", "Ralph Lauren", "Alexander McQueen", "Kanye West"],
            answer: 2,
            photo: "assets/images/mcqueen.jpg",
        },

        {
            question: "What was the real first name of French fashion designer Coco Chanel?",
            choices: ["Gabrielle", "Lee", "Stella", "Phoebe"],
            answer: 0,
            photo: "assets/images/coco-chanel.jpeg",
        },

        {
            question: "Giorgio Armani is most famous for his designs of which of the following types of clothing?",
            choices: ["Children's Clothing", "Ball Gowns", "Men's Suits", "Swimwear"],
            answer: 2,
            photo: "assets/images/armani.jpg",
        },

        {
            question: "What is Michael Kors' given name?",
            choices: ["Steve Olson", "Karl Anderson", "Jack Stevens", "Paul Rust"],
            answer: 1,
            photo: "assets/images/michael-kors.jpeg",
        },

        {
            question: "French fashion designer Yves St Laurent is often credited with creating which of the following fashion trends?",
            choices: ["Mini Skirts", "Flapper Dresses", "Bikinis", "Women's Tuxedos"],
            answer: 3,
            photo: "assets/images/laurent.jpeg",
        },

        {
            question: "In what year did the Michael Kors first open its doors to the public?",
            choices: ["1981", "1997", "1967", "1925"],
            answer: 0,
            photo: "assets/images/michael-kors-store.jpeg",
        },
    ];

    // create the rest of the variables required; such answer counts, timer, etc.

    var timer = 20;
    var intervalId;
    var running = false;
    var questionCount = options.length;
    var pick;
    var randomQ;
    var newArray = [];
    var emptyArray = [];
    var correctCount = 0;
    var incorrectCount = 0;
    var unansweredCount = 0;

    //create timer functions

    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    function decrement() {
        $("#time-remaining").html("<h3>Time Remaining: " + timer + "</h3>");
        timer--;

        if (timer === 0) {
            unansweredCount++;
            stop();
            $("#answer").html("<p>Too Late! And not in a fashionable way. The correct answer is: " + pick.choices[pick.answer] + "</p>");
            hidepicture();
        }
    }

    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    //randomly choose the question

    function displayQuestion() {
        randomQ = Math.floor(Math.random() * options.length);
        pick = options[randomQ];

        $("#question").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choices.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answer-choice");
            userChoice.html(pick.choices[i]);
            userChoice.attr("data-guessvalue", i);
            $("#answer").append(userChoice);
        }
    }


    //on click function to start the game
    $("#reset").hide();

    $("#start").on("click", function () {

        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            emptyArray.push(options[i]);
        }

    })

    //actual game play; selecting the answers and determining whether correct or not

    $("body").on("click", ".answer-choice", function () {
        userGuess = parseInt($(this).attr("data-guessvalue"));
        //console.log(userGuess);
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess = "";
            $("#answer").html("<p>Correct!</p>");
            hidepicture();
        } else {
            stop();
            incorrectCount++;
            userGuess = "";
            $("#answer").html("<p>Incorrect! The answer is: " + pick.choices[pick.answer] + "</p>");
            hidepicture();
        }
        console.log(pick.answer);
        console.log(userGuess);

    })

    //have to figure out how to hide the images without it looking weird

    function hidepicture() {
        $("#answer").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(randomQ, 1);

        setTimeout(function () {
            $("#answer").empty();
            timer = 15;

            if ((incorrectCount + correctCount + unansweredCount) === questionCount) {
                $("#question").empty();
                $("#question").html("<h3>Game Over! Let's see your results: </h3>");
                $("#answer").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answer").append("<h4> Incorrect: " + incorrectCount + "</h4>");
                $("#answer").append("<h4> Unanswered: " + unansweredCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                incorrectCount = 0;
                unansweredCount = 0;

            } else {
                runTimer();
                displayQuestion();
            }
        }, 2000);
    }

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answer").empty();
        $("#question").empty();
        for (i = 0; i < emptyArray.length; i++) {
            options.push(emptyArray[i]);
        }
        runTimer();
        displayQuestion();

    })



})