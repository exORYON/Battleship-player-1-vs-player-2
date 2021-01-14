"use strict";

let coinWinner, actualOcean;
let p1Nickname = sessionStorage.getItem("playerOneNickname");
let p2Nickname = sessionStorage.getItem("playerTwoNickname");

const changeNicknameForm = document.querySelector(".roulette");

const playerOne = {
  nickname: "",
  
  shipsPlaced: false,
  // shipsLeft: [null,4,3,2,1],
  shipsLeft: [null,0,0,0,1],

  shotsTotal: 0,
  shotsInGoal: 0,
  shotsMissed: 0,
};

const playerTwo = {
  nickname: "",

  shipsPlaced: false,
  // shipsLeft: [null,4,3,2,1],
  shipsLeft: [null,0,0,0,1],

  shotsTotal: 0,
  shotsInGoal: 0,
  shotsMissed: 0,
};

if (p1Nickname == undefined || p2Nickname == undefined) {
  showForm();
} else {
  document.getElementById("p1-nickname-text").innerHTML = p1Nickname;
  document.getElementById("p2-nickname-text").innerHTML = p2Nickname;
}

function showForm() {
  changeNicknameForm.style.display = "flex";
}

const changeNicknameButton = document.querySelector(".change-nickname___button");
const restartGameButton = document.querySelector(".restart-game___button");
const showStatisticsButton = document.querySelector(".show-statistics___button");
const nicknameSubmitBtn = document.getElementById("nickname-sumbit___button");
const closeFormButton = document.querySelector(".close-form___button");

changeNicknameButton.onclick = function () {
  showForm();
};

restartGameButton.onclick = function () {
  sessionStorage.removeItem("playerOneNickname");
  sessionStorage.removeItem("playerTwoNickname");
  location.reload();
};

showStatisticsButton.onclick = function () {
  showStats();
};

nicknameSubmitBtn.onclick = function () {
  setNicknames();
};

closeFormButton.onclick = function () {
  if (playerOne.nickname == "" || playerTwo.nickname == "" ) {
    nicknameError("Please set nickname!");
    return;
  }
    changeNicknameForm.style.display = "none";
}

function setNicknames() {
  if (changeNicknameForm.style.display === "none") {
    changeNicknameForm.style.display = "flex";
  }

  const p1NicknameInp = document.getElementById("p1-nickname-input");
  const p2NicknameInp = document.getElementById("p2-nickname-input");

  if (p1NicknameInp.value === p2NicknameInp.value) {
    nicknameError("Nicknames must be different!");
    return;
  } else {
    playerOne.nickname = p1NicknameInp.value;
    playerTwo.nickname = p2NicknameInp.value;  

    sessionStorage.setItem("playerOneNickname", p1NicknameInp.value);
    sessionStorage.setItem("playerTwoNickname", p2NicknameInp.value);
  
    document.getElementById("p1-nickname-text").innerHTML = playerOne.nickname;
    document.getElementById("p2-nickname-text").innerHTML = playerTwo.nickname;
  
    if (changeNicknameForm.style.display === "flex") {
      changeNicknameForm.style.display = "none";
    }
      preGame();
  }
}

function showStats() {
  showModalWindow("Stats will be aded later!");
 // TODO: SHOWSTATS
}

const preGameContainer = document.querySelector(".pre-game___container");
const playerOneOcean = document.querySelector("#ocean-one");
const playerTwoOcean = document.querySelector("#ocean-two");

let shipOnOceanOne = function (event) {
  if (clickWasOnCell(event)) {
    let cell = event.target;
    chooseSell("p1", cell);
  } 
}

let shipOnOceanTwo = function (event) {
  if (clickWasOnCell(event)) {
    let cell = event.target;
    chooseSell("p2", cell);
  } 
}

let oceanOneListener = function(event) {
  shipOnOceanOne(event);
}

let oceanTwoListener = function(event) {
  shipOnOceanTwo(event);
}

playerOneOcean.addEventListener('click', oceanOneListener);
playerTwoOcean.addEventListener('click', oceanTwoListener);

function nicknameError(text) {
  let error = document.createElement('div');

  error.classList.add("error");
  error.innerText = text;
  error.style.display = "block";

  changeNicknameForm.append(error);
    setTimeout(function () {
      error.style.display = "none";
    }, 1500);
}

function preGame() {
  const coin = document.querySelector(".coin");

  document.querySelector(".player-one-nickname").innerText = playerOne.nickname;
  document.querySelector(".player-two-nickname").innerText = playerTwo.nickname;
  document.querySelector(".front").innerText = playerOne.nickname;
  document.querySelector(".back").innerText = playerTwo.nickname;
  
  preGameContainer.style.display = "flex";
  
  coin.onclick = function () {
    if (coinWinner !== undefined) {
      return;
    } else {
      coinWinner = Math.random() * 2;
      
      if (coinWinner <= 1) {
        coinWinner = playerOne.nickname;
      } else {
        coinWinner = playerTwo.nickname;
      }

      coin.classList.add("spinning");
      
      setTimeout(function() {
        coin.classList.remove("spinning");

        coin.innerHTML = `${coinWinner} attacks first!`;
        coin.style.backgroundColor = "rgb(0, 0, 0, 0.5)";
        coin.style.color = "#39df57";
        coin.style.borderRadius = "50%";
        coin.style.fontSize = "0.65em";
        coin.style.letterSpacing = "1.5px";
  
        let startGameButton = document.createElement("button");
        
        startGameButton.classList.add("start-game___button");
        startGameButton.innerText = "Start game!";
  
        preGameContainer.append(startGameButton);
        startGameButton.addEventListener("click", function () {
          shipsMenu(coinWinner);
        });
      }, 1000);
      //5000
    }
  };
}

const playerOneContainer = document.querySelector("#player-one");
const playerTwoContainer = document.querySelector("#player-two");
const shipsList = document.querySelector(".placing-container");
const playerNicknameSpan = document.querySelectorAll(".player-nickname");

function shipsMenu(winner) {
  preGameContainer.style.display = "none";
    if (winner === playerOne.nickname) {
        playerTwoContainer.style.display = "none";
        playerOneContainer.style.display = "flex";
        shipsList.style.display = "block";
        playerOneOcean.classList.add("active-ocean");

    } else {
        playerOneContainer.style.display = "none";
        playerTwoContainer.style.display = "flex";
        shipsList.style.display = "block";
        playerTwoOcean.classList.add("active-ocean");
    }
}

const shipTypeRadio = document.getElementsByName("shipsType");
const directionTypeRadio = document.getElementsByName("shipsDirection");

let selectedShip = "sq1";
let direction = "horizontal";

for (let i = 0; i < shipTypeRadio.length; i++) {
  shipTypeRadio[i].onchange = function () {
      (selectedShip) ? console.log("changed type of ship") : null;
        if(this !== selectedShip) {
          selectedShip = this;
        }
      selectedShip = this.value;
  };
}

for (let i = 0; i < directionTypeRadio.length; i++) {
  directionTypeRadio[i].onchange = function () {
      (direction) ? console.log("changed direction of ship") : null;
        if(this !== direction) {
          direction = this;
        }
      direction = this.value;
  };
}



function clickWasOnCell(element) {
  let cell = element.target;
  let cellClassList = cell.classList;

  cellClassList = Array.from(cellClassList);

  let isOcean = cellClassList.indexOf("ocean");
  let isRow = cellClassList.indexOf("row");
  let isShip = cellClassList.indexOf("ship");
  let isBusy = cellClassList.indexOf("busy");

  if (isOcean === -1 && isRow === -1 && isShip === -1 && isBusy === -1) {
    return true;
  } else {
    return false;
  }
}

let currentPlayer;
function chooseSell(player, cell) {
  let currentShip = selectedShip;

    if (player === "p1") {
      currentPlayer = playerOne;
    } else {
      currentPlayer = playerTwo;
    }

  

  if (checkIfShipsLeft(currentPlayer)) {
    switch (currentShip) {
      case "sq1":
        if (currentPlayer.shipsLeft[1] > 0) {
          placeShip(currentShip, cell);
          updatePlacingContainer(currentPlayer);
        } else {
          showModalWindow("No ships of this type left, try another one!");
        }
      break;

      case "sq2":
        if (currentPlayer.shipsLeft[2] > 0) {
          placeShip(currentShip, cell);
          updatePlacingContainer(currentPlayer);
        } else {
          showModalWindow("No ships of this type left, try another one!");
        }
      break;

      case "sq3":
        if (currentPlayer.shipsLeft[3] > 0) {
          placeShip(currentShip, cell);
          updatePlacingContainer(currentPlayer);
        } else {
          showModalWindow("No ships of this type left, try another one!");
        }
      break;

      case "sq4":
        if (currentPlayer.shipsLeft[4] > 0) {
          placeShip(currentShip, cell);
          updatePlacingContainer(currentPlayer);
        } else {
          showModalWindow("No ships of this type left, try another one!");
        }
      break;
    }
  } else {
    nextTurn(currentPlayer);
    showModalWindow("<small>You have placed all the ships. Give control to another player and press OK.</small>");
  }
}

function placeShip(ship, cell) {
  let cellClassList = cell.classList;
  cellClassList = cellClassList[1];
  cellClassList = cellClassList.split("-");
  cellClassList.shift();

  switch (ship) {
    case "sq1":
        if (cellIsAvailable(1,direction)) {
        } else {
          showModalWindow("Can`t place this ship there!");
        }
      break;
    case "sq2":
      if (cellIsAvailable(2,direction)) {
      } else {
        showModalWindow("Can`t place this ship there!");
      }
      break;
    case "sq3":
      if (cellIsAvailable(3,direction)) {
      } else {
        showModalWindow("Can`t place this ship there!");
      }
      break;
    case "sq4":
      if (cellIsAvailable(4,direction)) {
      } else {
        showModalWindow("Can`t place this ship there!");
      }
      break;
    default: alert("Something went wrong...");
  }

  function cellIsAvailable(cells, direction) {
    let currentOcean;
    currentPlayer === playerOne ? currentOcean = "ocean-one" : currentOcean = "ocean-two";
    
    let row = +cellClassList[0];
    let column = +cellClassList[1];
    let cellsToCheck = [];

    for (let i = 0; i < cells; i++) {
      if (direction === "horizontal") {
        var currentCell = document.querySelector(`#${currentOcean} > div:nth-child(${row}) > div.cell.cell-${row}-${column+i}`);
      } else {
        var currentCell = document.querySelector(`#${currentOcean} > div:nth-child(${row+i}) > div.cell.cell-${row+i}-${column}`);
      }

      if(currentCell === null) {
        return false;
      } else {
        cellsToCheck.push(currentCell);
      }
    }

  let allCellsAreAvailable = true;
    for(let i of cellsToCheck) {
      let availableAbove = false, availableBelow = false,
          availableLeft = false, availableRight = false,
          availableTopLeft = false, availableTopRight = false,
          availableBottomLeft = false, availableBottomRight = false;

      var cellAbove = false,  cellBelow = false,
          cellLeft = false,  cellRight = false,
          cellTopLeft = false,  cellTopRight = false,
          cellBottomLeft = false,  cellBottomRight = false;

      let cellClassList = i.classList;
          cellClassList = cellClassList[1];
          cellClassList = cellClassList.split("-");
          cellClassList.shift();
      
      let row = +cellClassList[0];
      let column = +cellClassList[1];

      console.table("ROW", "COLUMN", row, column);

        if (row === 1) {
          availableAbove = true;
          availableTopLeft = true;
          availableTopRight = true;
        }
        if (row === 10) {
          availableBelow = true;
          availableBottomLeft = true;
          availableBottomRight = true;
        }
        if (column === 1) {
          availableLeft = true;
          availableTopLeft = true;
          availableBottomLeft = true;
        }
        if (column === 10) {
          availableRight = true;
          availableTopRight = true;
          availableBottomRight = true;
        }

        if (!availableAbove) {
          cellAbove = document.querySelector(`#${currentOcean} > div:nth-child(${row-1}) > div.cell.cell-${row-1}-${column}`);
            if (!cellAbove.classList.contains("ship")) {
              availableAbove = true;
            }
        }
        if (!availableBelow) {
          cellBelow = document.querySelector(`#${currentOcean} > div:nth-child(${row+1}) > div.cell.cell-${row+1}-${column}`);
            if (!cellBelow.classList.contains("ship")) {
              availableBelow = true;
            }
        }
        if (!availableLeft) {
          cellLeft = document.querySelector(`#${currentOcean} > div:nth-child(${row}) > div.cell.cell-${row}-${column-1}`);
            if (!cellLeft.classList.contains("ship")) {
              availableLeft = true;
            }
        }
    
        if (!availableRight) {
          cellRight =  document.querySelector(`#${currentOcean} > div:nth-child(${row}) > div.cell.cell-${row}-${column+1}`);
            if (!cellRight.classList.contains("ship")) {
              availableRight = true;
            }
        }

        if (row === 1 && column === 1) {
          availableTopLeft = true;
          availableBottomLeft = true;
          availableTopRight = true;
        }
        if (row === 1 && column === 10) {
          availableTopRight = true;
          availableTopLeft = true;
          availableBottomRight = true;
        }
        if (row === 10 && column === 1) {
          availableTopLeft = true;
          availableBottomLeft = true;
          availableBottomRight = true;
        }
        if (row === 10 && column === 10) {
          availableTopRight = true;
          availableBottomLeft = true;
          availableBottomRight = true;
        }

        if (!availableTopLeft) {
          cellTopLeft = document.querySelector(`#${currentOcean} > div:nth-child(${row-1}) > div.cell.cell-${row-1}-${column-1}`);
            if (!cellTopLeft.classList.contains("ship")) {
              availableTopLeft = true;
            }
        }

        if (!availableTopRight) {
          cellTopRight = document.querySelector(`#${currentOcean} > div:nth-child(${row-1}) > div.cell.cell-${row-1}-${column+1}`);
            if (!cellTopRight.classList.contains("ship")) {
              availableTopRight = true;
            }
        }

        if (!availableBottomLeft) {
          cellBottomLeft = document.querySelector(`#${currentOcean} > div:nth-child(${row+1}) > div.cell.cell-${row+1}-${column-1}`);
            if (!cellBottomLeft.classList.contains("ship")) {
              availableBottomLeft = true;
            }
        }

        if (!availableBottomRight) {
          cellBottomRight = document.querySelector(`#${currentOcean} > div:nth-child(${row+1}) > div.cell.cell-${row+1}-${column+1}`);
            if (!cellBottomRight.classList.contains("ship")) {
              availableBottomRight = true;
            }
        }

      let available = availableAbove && availableBelow && availableLeft && availableRight &&
                      availableTopLeft && availableTopRight && availableBottomLeft && availableBottomRight;

      if (!available) {
        allCellsAreAvailable = false;
      }
    }

    actualOcean = currentOcean;

      if (allCellsAreAvailable) {
        for (let i of cellsToCheck) {
          i.classList.add("ship");
        }

        markBusyCells(cellsToCheck, currentOcean);
        currentPlayer.shipsLeft[cells]--;
        if (!checkIfShipsLeft(playerOne) && !checkIfShipsLeft(playerTwo)) {
          
          setTimeout(function () {
            showModalWindow("<small>ALL SHIPS ARE PLACED! BATTLE BEGINS! Give control to another player and press OK.</small>");
            nextTurn(currentPlayer);
            beginBattle();
          }, 1000);
        } else if (!checkIfShipsLeft(currentPlayer)) {
         

          setTimeout(function () {
            showModalWindow("<small>You have placed all ships. Give control to another player and press OK.</small>");
            nextTurn(currentPlayer);
          }, 1000);
        }
        return true;
      }

    return false;
  }
}

function markBusyCells(cells, ocean) {
  for (let cell of cells) {
    let cellClassList = cell.classList;
    cellClassList = cellClassList[1];
    cellClassList = cellClassList.split("-");
    cellClassList.shift();

    let row = +cellClassList[0];
    let column = +cellClassList[1];

    let cellAbove = document.querySelector(`#${ocean} > div:nth-child(${row-1}) > div.cell.cell-${row-1}-${column}`);
    let cellBelow = document.querySelector(`#${ocean} > div:nth-child(${row+1}) > div.cell.cell-${row+1}-${column}`);
    let cellLeft = document.querySelector(`#${ocean} > div:nth-child(${row}) > div.cell.cell-${row}-${column-1}`);
    let cellRight =  document.querySelector(`#${ocean} > div:nth-child(${row}) > div.cell.cell-${row}-${column+1}`);
    let cellTopLeft = document.querySelector(`#${ocean} > div:nth-child(${row-1}) > div.cell.cell-${row-1}-${column-1}`);
    let cellTopRight = document.querySelector(`#${ocean} > div:nth-child(${row-1}) > div.cell.cell-${row-1}-${column+1}`);
    let cellBottomLeft = document.querySelector(`#${ocean} > div:nth-child(${row+1}) > div.cell.cell-${row+1}-${column-1}`);
    let cellBottomRight = document.querySelector(`#${ocean} > div:nth-child(${row+1}) > div.cell.cell-${row+1}-${column+1}`);

    if (cellAbove !== null) {
      cellAbove.classList.add("busy");
    }
    if (cellLeft !== null) {
      cellLeft .classList.add("busy");
    } 
    if (cellRight !== null) {
      cellRight.classList.add("busy");
    } 
    if (cellBelow !== null) {
      cellBelow.classList.add("busy");
    } 
    if (cellTopRight !== null) {
      cellTopRight.classList.add("busy");
    } 
    if (cellTopLeft !== null) {
      cellTopLeft.classList.add("busy");
    } 
    if (cellBottomRight !== null) {
      cellBottomRight.classList.add("busy");
    } 
    if (cellBottomLeft !== null) {
      cellBottomLeft.classList.add("busy");
    } 
  }
}

function checkIfShipsLeft(player) {
  let totalShips = player.shipsLeft[1] + player.shipsLeft[2] + player.shipsLeft[3] + player.shipsLeft[4];

  if (totalShips > 0) {
    return true;
  } else {
    return false;
  }
}

let shipsHidden = false;

function nextTurn(player) {
  let hideContainer = document.createElement("div");
  hideContainer.classList.add("hidden");
  document.body.append(hideContainer);
  shipsHidden = true;

  if (player.nickname === playerOne.nickname) {
    playerOneContainer.style.display = "none";
      if(player.shipsPlaced === false) {
        player.shipsPlaced = true;
      }
    currentPlayer = playerTwo
    playerTwoContainer.style.display = "flex";
    updatePlacingContainer(currentPlayer);
  }
  
  else {
    playerTwoContainer.style.display = "none";
      if(player.shipsPlaced === false) {
        player.shipsPlaced = true;
      }
    currentPlayer = playerOne;
    playerOneContainer.style.display = "flex";
    updatePlacingContainer(currentPlayer);
  }
}

function updatePlacingContainer(player) {
  let labelForSq1 = document.querySelector(".sq1-ships-left")
  labelForSq1.innerHTML = player.shipsLeft[1];

  let labelForSq2 = document.querySelector(".sq2-ships-left");
  labelForSq2.innerHTML = player.shipsLeft[2];

  let labelForSq3 = document.querySelector(".sq3-ships-left");
  labelForSq3.innerHTML = player.shipsLeft[3];

  let labelForSq4 = document.querySelector(".sq4-ships-left");
  labelForSq4.innerHTML = player.shipsLeft[4];
};

function showModalWindow(text) {
  let modalErrorContainer = document.createElement("div");
  modalErrorContainer.classList.add("modal-error");
  document.body.append(modalErrorContainer);

  let errorTextContainer = document.createElement("div");
  errorTextContainer.classList.add("error-text___container");
  modalErrorContainer.append(errorTextContainer);

  let closeError = document.createElement("div");
  closeError.innerHTML = `<svg width="1.4em" height="1.4em" viewBox="0 0 16 16" class="bi bi-x-square-fill"
  fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2
  2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0
  0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>`;
 
  errorTextContainer.append(closeError);
  closeError.onclick = function() {
    closeModalWindow();
  };

  let errorText = document.createElement("span");
  errorText.innerHTML = text;
  errorTextContainer.append(errorText);

  let okButton = document.createElement("button");
  okButton.classList.add("ok-button");
  okButton.innerHTML = "OK";
  okButton.onclick = function() {
    closeModalWindow();
  };

  errorTextContainer.append(okButton);
}

function closeModalWindow() {
  let modalError = document.querySelector(".modal-error");
  
  if (shipsHidden === true) {
    document.querySelector(".hidden").style.display = "none";  
    shipsHidden = false;
  }

  modalError.parentNode.removeChild(modalError);
}

const playerOneShootingOcean = document.getElementById("shooting-ocean-one");
const playerTwoShootingOcean = document.getElementById("shooting-ocean-two");

let shootingListener = function(event) {
  attackCell(event.target);
}

function beginBattle() {
  playerOneOcean.removeEventListener("click", oceanOneListener);
  playerTwoOcean.removeEventListener("click", oceanTwoListener);

  playerOneOcean.classList.remove("active-ocean");
  playerTwoOcean.classList.remove("active-ocean");

  playerOneShootingOcean.addEventListener("click", shootingListener);
  playerTwoShootingOcean.addEventListener("click", shootingListener);

  playerOneShootingOcean.classList.add("active-ocean");
  playerTwoShootingOcean.classList.add("active-ocean");
  
  shipsList.style.display = "none";
}

function attackCell(cell) {
  let cellClassList = cell.classList;
  cellClassList = cellClassList[1];
  cellClassList = cellClassList.split("-");
  cellClassList.shift();

  let row = +cellClassList[0];
  let column = +cellClassList[1];

  console.log("SHOT ON " + row + " " + column);
  console.log(actualOcean);

  let currentShootingOcean = null;
  if (actualOcean === "ocean-one") {
    currentShootingOcean = "shooting-ocean-two";
  } else {
    currentShootingOcean = "shooting-ocean-one";
  }

  let attackedCell = document.querySelector(`#${currentShootingOcean} > div:nth-child(${row}) > div.cell.cell-${row}-${column}`);
  attackedCell.classList.add("boom");
  console.log(attackedCell);
}

// TODO: TIMER COUNTDOWN AFTER SHIPS PLACED
// TODO: CHOOSE YOUR COLOR
// TODO: CHANGING SHIPS AND OCEAN CONTAINER COLOR


