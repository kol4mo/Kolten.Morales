//select element
var logInButton = document.querySelector("#log-in-button")
var welcomeHeader = document.querySelector("#header")
loggedIn = false;
console.log(logInButton)

var counter = {}
//counter++;
counter.name = "Joe Shull"
counter.age = 18
console.log(counter)
console.log(counter.name)
console.log(counter.age)

const student = {
    name: "student name",
    age: 3,
    gpa: "gpa",
    firstLetterOfFirstName: 's',
    address: {
        city: "SLC",
        zipcode: "111111",

    },
    classList: [
        {name: "intro to web", time: "1:30"},
        {name: "intro to web but worse", time: "3:30"}
    ],
    isLearning: false,

    learn: function() {
        console.log("im totally learning")
        this.isLearning = true;
    }
}
console.log(student.age)
student.age = "green";  
console.log(student.age)  
student.learn;

//build functions
function login() {
    welcomeHeader.textContent = "Welcome Kolten"
    logInButton.textContent = "Sign out"
    loggedIn = true;
}

function signOut() {
    welcomeHeader.textContent = "Home"
    logInButton.textContent = "Log in"
    loggedIn = false;
}

function toggleLogin() {
    if(loggedIn) {
        signOut();
    } else {
        login();
    }
}

logInButton.addEventListener('click', toggleLogin)
//access the event on the element
//wire up the event to out functions