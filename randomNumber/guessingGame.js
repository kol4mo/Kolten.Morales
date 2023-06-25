var randomNumber = Math.floor(Math.random() * 100) + 1;
var submitBtn = document.querySelector("#submit")
var myNumberInput = document.getElementById("myNumber");
var output = document.querySelector("#output")
var guesses = 1;
var restartBtn = document.createElement("button")
const gif = document.createElement("img")
var body = document.querySelector("#body")
console.log(randomNumber);

function submit() {
    if(myNumberInput.value == randomNumber) {
        win();
    } else if (myNumberInput.value > randomNumber){
        output.textContent = "Too High";
        guesses++;
        myNumberInput.value = ""
    } else if (myNumberInput.value < randomNumber) {
        output.textContent = "Too Low";
        guesses++;
        myNumberInput.value = ""
    }
}

function restart() {
  guesses = 1;
  output.textContent = "input a number between 1-100";  
  randomNumber = Math.floor(Math.random() * 100) + 1;    
  gif.remove();
  restartBtn.remove();
  myNumberInput.value = ""
  console.log(randomNumber);
}

function win() {
    var endMessage = "You Won in ";
    output.textContent = endMessage.concat(guesses, " guesses")
    restartBtn.textContent = "restart";
    body.appendChild(restartBtn)
    restartBtn.style = "margin-right: 45%; margin-left: 45%; width: 10%; border: 2px solid orange;"
    gif.src = "./rickroll-roll.gif"
    body.appendChild(gif)
}

document.addEventListener('keydown', function(event) { //allows for enter to submit the guess
    if(event.key == "Enter") {
        submit();
    }
});

submitBtn.addEventListener('click', submit)
restartBtn.addEventListener('click', restart)