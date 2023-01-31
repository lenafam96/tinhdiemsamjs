let table = document.getElementById("table");
let thead = document.getElementById("thead");
let tbody = document.getElementById("tbody");
let tfoot = document.getElementById("tfoot");

let arrayPlayers = localStorage.getItem("arrayPlayers")?localStorage.getItem("arrayPlayers").split(","):[];

console.log(localStorage.getItem("arrayPlayers"));

if(arrayPlayers.length>0){
    arrayPlayers.forEach((item)=>(createPlayer(item)));
    createTable();
}

function addPlayer(){
    let player = document.getElementById("name").value;
    arrayPlayers.push(player);
    localStorage.setItem("arrayPlayers", arrayPlayers);
    console.log(localStorage.getItem("arrayPlayers"));
    console.log(arrayPlayers);
    createPlayer(player);
    createTable();
    document.getElementById("name").value = "";
}

function deletePlayer(name){
    arrayPlayers = arrayPlayers.filter(function(player){ return player !== name; });
    localStorage.setItem("arrayPlayers", arrayPlayers);
    let divInput = document.getElementById("input-score");
    removeElement(divInput);
    arrayPlayers.forEach((item)=>(createPlayer(item)));
    createTable();
}

function createPlayer(name){
    let divInput = document.getElementById("input-score");
    let player = document.createElement("div");
    let playerName = document.createElement("span");
    playerName.innerHTML = name;
    player.appendChild(playerName);

    let playerScore = document.createElement("input");
    playerScore.type = "number";
    playerScore.id = name;
    player.appendChild(playerScore);

    let btnDelete = document.createElement("button");
    btnDelete.textContent = "X";
    btnDelete.onclick = () => deletePlayer(name);
    player.appendChild(btnDelete);

    divInput.appendChild(player);
}

function createTable() {
    removeElement(thead);
    removeElement(tbody);
    removeElement(tfoot);
    let th = document.createElement("th");
    arrayPlayers.forEach((item)=>{
        let td = document.createElement("td");
        td.innerHTML = item;
        th.appendChild(td);
    });
    thead.appendChild(th);
}

function removeElement(container){
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}