let randomCombo = "";
let test = 0;
let currentCombo = "";
// const scoresList = [];

let timer = 10;

for (let i = 0; i < 3; i++) {
  randomCombo += Math.floor(Math.random() * 10);
}

const boitier = document.getElementById("boitier");
const btnBoitierZero = document.createElement("button");
btnBoitierZero.classList.add("zero");
btnBoitierZero.innerHTML = `<button onclick="addNum(0)">0</button>`;

for (let i = 1; i < 10; i++) {
  const btnBoitier = document.createElement("button");
  btnBoitier.innerHTML = `<button onclick="addNum(${i})">${i}</button>`;
  boitier.append(btnBoitier);
  boitier.append(btnBoitierZero);
}

function addNum(num) {
  if (currentCombo.length < 3) {
    currentCombo += num;
    document.getElementById("inputCombos").value = currentCombo;
  }
}

function checkCombos() {
  if (currentCombo.length !== 3) {
    // alert temporaire ... check better notif !!!
    alert("Chiffre manquant dans la combinaison.");
    return;
  }

  test++;

  if (test == 10) {
    // check si ce if peut englober le if & else
    document.getElementById("success").textContent = "Mission Failed !";
    setTimeout(function () {
      location.reload();
    }, 3000);
  }

  hints = "";
  if (currentCombo === randomCombo) {
    chronoStop();
    let scoresList = [];
    scoresList.push(test);

    localStorage.setItem("scoresList", scoresList);
    document.getElementById("success").textContent = "Mission Complete!";

    setTimeout(function () {
      location.reload();
    }, 3000);
  } else {
    for (let i = 0; i < 3; i++) {
      if (currentCombo[i] === randomCombo[i]) {
        hints += `<span class="hint1">${currentCombo[i]}</span>`;
      } else if (randomCombo.includes(currentCombo[i])) {
        hints += `<span class="hint2">${currentCombo[i]}</span>`;
      } else {
        hints += `${currentCombo[i]}`;
      }
    }
  }

  document.getElementById("res").innerHTML += `<li>${hints}</li>`;
  document.getElementById("test").textContent = ` : ${test}`;

  currentCombo = "";
  document.getElementById("inputCombos").value = currentCombo;
}

function del() {
  currentCombo = currentCombo.slice(0, -1);
  document.getElementById("inputCombos").value = currentCombo;
}

// Utiliser le combo dans le ls pour test
localStorage.setItem("brutForce", randomCombo);

let ls = localStorage.getItem("scoresList");
// for (let s in ls) {
//   console.log(ls[s]);
// }
// let s = JSON.parse(ls);

// useless de mettre la combinaison trouvée ???
if (ls > 0) {
  let scores = (document.getElementById(
    "stats"
  ).innerHTML = `<li>Tentatives: ${ls}</li>`);
} else {
  let scores = (document.getElementById(
    "stats"
  ).innerHTML = `<li>score: 0 </li>`);
}
console.log(JSON.parse(ls));

function countDown() {
  setInterval(function () {
    if (timer > 0) {
      timer -= 1;
    } else {
      document.getElementById("success").textContent = "Mission Failed!";
      setTimeout(function () {
        location.reload();
      }, 3000);
    }
    document.getElementById("chrono").innerHTML = timer;
  }, 800);
}

// console.log(timer);
countDown();

function chronoStop() {
  clearTimeout(timer);
}
