let divInput = document.getElementById("input-score");
let divButton = document.getElementById("button");
let table = document.getElementById("table");
let thead = document.getElementById("thead");
let tbody = document.getElementById("tbody");
let tfoot = document.getElementById("tfoot");
let id_row_clicked = document.getElementById("id-row-clicked");

let arrayPlayers = localStorage.getItem("arrayPlayers")?localStorage.getItem("arrayPlayers").split(","):[];

let arrayRowScore = [];

if(localStorage.length>1){
    for (let i = 0; i < localStorage.length; i++){
        if(localStorage.key(i)!="arrayPlayers")
        {
            let row = {
                key:localStorage.key(i),
                value:JSON.parse(localStorage.getItem(localStorage.key(i)))
            };
            arrayRowScore.push(row);
        }
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
    if(player==="" || arrayPlayers.indexOf(player)!=-1) return;
    arrayPlayers.push(player);
    localStorage.setItem("arrayPlayers", arrayPlayers);
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
    playerScore.placeholder = 0;
    playerScore.id = name;
    player.appendChild(playerScore);

    let btnDelete = document.createElement("button");
    btnDelete.textContent = "X";
    btnDelete.onclick = () => deletePlayer(name);
    player.appendChild(btnDelete);

    let select = document.createElement("select");
    // select.id = `select-${name}`;
    select.onchange = (e) => handleSelectionChange(e,name);
    let option = document.createElement("option");
    option.value = 0;
    option.textContent = 'Tuỳ chọn thêm';
    select.appendChild(option);
    option = document.createElement("option");
    option.value = 1;
    option.textContent = 'Báo sâm';
    select.appendChild(option);
    option = document.createElement("option");
    option.value = 2;
    option.textContent = 'Chặn sâm';
    select.appendChild(option);
    option = document.createElement("option");
    option.value = 3;
    option.textContent = 'Bị chặn sâm';
    select.appendChild(option);
    option = document.createElement("option");
    option.value = 4;
    option.textContent = 'Bắt tứ quý';
    select.appendChild(option);
    option = document.createElement("option");
    option.value = 5;
    option.textContent = 'Bị bắt tứ quý';
    select.appendChild(option);
    player.appendChild(select);

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
        tr.onclick = ()=>handleRowClick(tr);
        tr.id = item.key;
        arrayPlayers.forEach((player)=>{
            let td = document.createElement("td");
            td.innerHTML = item.value[player]??0;
            tr.appendChild(td);
        })
        // console.log(arrayRowScore);
        tbody.appendChild(tr);
    })

}

function createButton(){
    let buttonEnter = document.createElement("button");
    buttonEnter.textContent = "Enter";
    buttonEnter.onclick = () => enterScore();
    divButton.appendChild(buttonEnter);
    let buttonUpdate = document.createElement("button");
    buttonUpdate.textContent = "Update";
    buttonUpdate.id = "btnUpdate";
    buttonUpdate.onclick = () => updateScore();
    divButton.appendChild(buttonUpdate);
    let buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Delete";
    buttonDelete.id = "btnDelete";
    buttonDelete.onclick = () => deleteScore();
    divButton.appendChild(buttonDelete);
    enableButton();
}

function enableButton(){
    let buttonUpdate = document.getElementById("btnUpdate");
    let buttonDelete = document.getElementById("btnDelete");
    if(id_row_clicked.value === ''){
        buttonUpdate.disabled = true;
        buttonDelete.disabled = true;
    }
    else{
        buttonUpdate.disabled = false;
        buttonDelete.disabled = false;
    }
}

function enterScore() {
    let input = document.querySelectorAll("input[type='number']");
    if(checkScore([...input]))
        return;
    
    // console.log(input);
    
    let obj = [...input].reduce((acc, curr) => {
        acc[curr.id] = Number(curr.value);
        return acc;
    },{})
    processObject(obj);
    console.log(obj);
    let key = Date.now();
    localStorage.setItem(key, JSON.stringify(obj));
    let tr = document.createElement("tr");
    tr.id = key;
    tr.onclick = ()=>handleRowClick(tr);
    arrayPlayers.forEach((player)=>{
        let td = document.createElement("td");
        td.innerHTML = obj[player];
        tr.appendChild(td);
    })
    // console.log(arrayRowScore);
    tbody.appendChild(tr);
    clearInput();
}

function clearInput(){
    input = document.getElementsByTagName('input');
    for (let index = 0; index < input.length; index++) {
        input[index].value = '';
    }
}

function updateScore(){
    if(id_row_clicked.value === "")
        return;
    let input = document.querySelectorAll("input[type='number']");
    let obj = [...input].reduce((acc, curr) => {
        acc[curr.id] = Number(curr.value);
        return acc;
    },{})
    localStorage.setItem(id_row_clicked.value,JSON.stringify(obj));
    let tr = document.getElementById(id_row_clicked.value);
    removeElement(tr);
    arrayPlayers.forEach((player)=>{
        let td = document.createElement("td");
        td.innerHTML = obj[player];
        tr.appendChild(td);
    });
    clearInput();
    enableButton();
}

function deleteScore(){
    if(id_row_clicked.value === "")
        return;
    localStorage.removeItem(id_row_clicked.value);
    let tr = document.getElementById(id_row_clicked.value);
    removeElement(tr);
    clearInput();
    enableButton();
}

function checkScore(arrayScore){
    return (arrayScore.some(item=>{return item.value > 0}) 
    || countZero(arrayScore) !== 1 
    )
}

function countZero(array){
    let count = 0;
    for(let i=0; i<array.length;i++){
        if(array[i].value == 0)
            count++;
    }
    return count;
}

function processObject(obj){
    let sum = 0;
    for(const key in obj){
        sum += obj[key];
    }
    for(const key in obj){
        if(obj[key] === 0){
            obj[key] = sum*-1;
            break;
        }
    }
}

function removeElement(container){
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

function handleRowClick(e){
    id_row_clicked.value = e.id;
    let row = JSON.parse(localStorage.getItem(e.id));
    let inputs = document.getElementsByTagName('input');
    for (let input of inputs) {
        if(arrayPlayers.includes(input.id))
            input.value = row[input.id];
    }
    enableButton();
}

function clearLocalStorage(){
    if(confirm('Are you sure you want to delete all data?')==true){
        localStorage.clear();
        removeElement(divInput);
        removeElement(divButton);
        removeElement(thead);
        removeElement(tbody);
        removeElement(tfoot);
    }
}

function handleSelectionChange(e,name){
    console.log(e.target.value);
    let input = document.getElementById(name);
    switch (e.target.value) {
        case '1':
            input.value = 120;
            break;
    
        default:
            break;
    }
}