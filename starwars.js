console.log("Getting Star Wars Data");

fetch("https://swapi.dev/api/starships")
    //convert response to json
    .then((response) => response.json())
    //display our data
    .then((data) => {
        console.log(data)
        var list = document.querySelector("#ship-list")
        for (let i = 0; i < data.results.length; i++) {
            var starship = document.createElement("li")
            starship.textContent = data.results[i].name
            list.appendChild(starship)
        }
    }
)

fetch("https://swapi.dev/api/starships/?page=2")
    //convert response to json
    .then((response) => response.json())
    //display our data
    .then((data) => {
        console.log(data)
        var list = document.querySelector("#ship-list")
        for (let i = 0; i < data.results.length; i++) {
            var starship = document.createElement("li")
            starship.textContent = data.results[i].name
            list.appendChild(starship)
        }
    }
)

fetch("https://swapi.dev/api/starships/?page=3")
    //convert response to json
    .then((response) => response.json())
    //display our data
    .then((data) => {
        console.log(data)
        var list = document.querySelector("#ship-list")
        for (let i = 0; i < data.results.length; i++) {
            var starship = document.createElement("li")
            starship.textContent = data.results[i].name
            list.appendChild(starship)
        }
    }
)

fetch("https://swapi.dev/api/starships/?page=4")
    //convert response to json
    .then((response) => response.json())
    //display our data
    .then((data) => {
        console.log(data)
        var list = document.querySelector("#ship-list")
        for (let i = 0; i < data.results.length; i++) {
            var starship = document.createElement("li")
            starship.textContent = data.results[i].name
            list.appendChild(starship)
        }
    }
)
//retreive the data
//create the elements   
//parse the data
//display the data
//select the parent
//append childs