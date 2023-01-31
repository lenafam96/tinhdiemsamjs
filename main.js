let divInput = document.getElementById("input-score");
let divButton = document.getElementById("button");
let table = document.getElementById("table");
let thead = document.getElementById("thead");
let tbody = document.getElementById("tbody");
let tfoot = document.getElementById("tfoot");

let arrayPlayers = localStorage.getItem("arrayPlayers")?localStorage.getItem("arrayPlayers").split(","):[];

let arrayRowScore = [];

if(localStorage.length>1){
    for (let i = 1; i < localStorage.length; i++){
        let row = JSON.parse(localStorage.getItem(i));
        arrayRowScore.push(row);
    }
}

console.log(localStorage.getItem("arrayPlayers"));

if(arrayPlayers.length>0){
    arrayPlayers.forEach((item)=>(createPlayer(item)));
    createButton();
    createTable();
}

function addPlayer(){
    let player = document.getElementById("name").value;
    arrayPlayers.push(player);
    localStorage.setItem("arrayPlayers", arrayPlayers);
    console.log(localStorage.getItem("arrayPlayers"));
    console.log(arrayPlayers);
    createPlayer(player);
    if(arrayPlayers.length === 1){
        createButton();
    }
    createTable();
    document.getElementById("name").value = "";
}

function deletePlayer(name){
    arrayPlayers = arrayPlayers.filter(function(player){ return player !== name; });
    localStorage.setItem("arrayPlayers", arrayPlayers);
    removeElement(divInput);
    arrayPlayers.forEach((item)=>(createPlayer(item)));
    if(arrayPlayers.length===0){
        removeElement(divButton);
    }
    createTable();
}

function createPlayer(name){
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
    let trHead = document.createElement("tr");
    arrayPlayers.forEach((item)=>{
        let th = document.createElement("th");
        th.innerHTML = item;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    arrayRowScore.forEach((item)=>{
        let tr = document.createElement("tr");
        arrayPlayers.forEach((player)=>{
            let td = document.createElement("td");
            td.innerHTML = item[player];
            tr.appendChild(td);
        })
        // console.log(arrayRowScore);
        tbody.appendChild(tr);
    })

}

function createButton(){
    let button = document.createElement("button");
    button.textContent = "Enter";
    button.onclick = () => enterScore();
    divButton.appendChild(button);
}

function enterScore() {
    let input = document.querySelectorAll("input[type='number']");
    let check = false;
    // input.forEach(item => {
    //     if item.value >
    // })
    
    console.log([...input].every(item=>{return item.value > 0}));
    // let obj = [...input].reduce((acc, curr) => {
    //     acc[curr.id] = curr.value;
    //     return acc;
    // },{})
    // // console.log(obj);
    // localStorage.setItem(localStorage.length, JSON.stringify(obj));
    // console.log(localStorage);
    // console.log(JSON.parse(localStorage.getItem(1)));
    // let tr = document.createElement("tr");
    // arrayPlayers.forEach((player)=>{
    //     let td = document.createElement("td");
    //     td.innerHTML = obj[player];
    //     tr.appendChild(td);
    // })
    // // console.log(arrayRowScore);
    // tbody.appendChild(tr);
    // input = document.getElementsByTagName('input');
    // for (let index = 0; index < input.length; index++) {
    //     input[index].value = '';
    // }
}

function removeElement(container){
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}