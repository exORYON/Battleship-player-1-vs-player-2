'use strict';

let coinWinner, p1Nickname, p2Nickname;
const changeNicknameForm = document.querySelector('.roulette');

const playerOne = {
  nickname: '',

  shipsPlaced: false,
  shipsLeft: [null, 4, 3, 2, 1],
  totalShipsLeft: 20,

  shotsTotal: 0,
  shotsInGoal: 0,
  shotsMissed: 0,
};

const playerTwo = {
  nickname: '',

  shipsPlaced: false,
  shipsLeft: [null, 4, 3, 2, 1],
  totalShipsLeft: 20,

  shotsTotal: 0,
  shotsInGoal: 0,
  shotsMissed: 0,
};

if (p1Nickname === undefined || p2Nickname === undefined) {
  showForm();
} else {
  document.getElementById('p1-nickname-text').innerHTML = p1Nickname;
  document.getElementById('p2-nickname-text').innerHTML = p2Nickname;
}

function showForm() {
  changeNicknameForm.style.display = 'flex';
}

const changeNicknameButton = document.querySelector(
  '.change-nickname___button'
);
const showStatisticsButton = document.querySelector(
  '.show-statistics___button'
);
const restartGameButton = document.querySelector('.restart-game___button');
const nicknameSubmitBtn = document.getElementById('nickname-sumbit___button');
const closeFormButton = document.querySelector('.close-form___button');

changeNicknameButton.onclick = function() {
  showForm();
};

restartGameButton.onclick = function() {
  location.reload();
};

showStatisticsButton.onclick = function() {
  showStats();
};

nicknameSubmitBtn.onclick = function() {
  setNicknames();
};

closeFormButton.onclick = function() {
  if (playerOne.nickname === '' || playerTwo.nickname === '') {
    nicknameError('Please set nickname!');

    return;
  }
  changeNicknameForm.style.display = 'none';
};

const nicknamesRegex = /\w{2}/;

function setNicknames() {
  if (changeNicknameForm.style.display === 'none') {
    changeNicknameForm.style.display = 'flex';
  }

  const p1NicknameInp = document.getElementById('p1-nickname-input');
  const p2NicknameInp = document.getElementById('p2-nickname-input');

  if (p1NicknameInp.value === p2NicknameInp.value) {
    nicknameError('Nicknames must be different!');
  } else if (!nicknamesRegex.test(p1NicknameInp.value) || !nicknamesRegex.test(p2NicknameInp.value)) {
    nicknameError('Provide valid nickname!');
  } else {
    playerOne.nickname = p1NicknameInp.value;
    playerTwo.nickname = p2NicknameInp.value;

    playerOne.nickname = playerOne.nickname.trim();
    playerTwo.nickname = playerTwo.nickname.trim();

    document.getElementById('p1-nickname-text').innerHTML = playerOne.nickname;
    document.getElementById('p2-nickname-text').innerHTML = playerTwo.nickname;

    if (changeNicknameForm.style.display === 'flex') {
      changeNicknameForm.style.display = 'none';
    }
    preGame();
  }
}

function showStats() {
  showModalWindow('Stats will be aded later!');
  // TODO: SHOWSTATS
}

const preGameContainer = document.querySelector('.pre-game___container');
const playerOneOcean = document.querySelector('#ocean-one');
const playerTwoOcean = document.querySelector('#ocean-two');

const shipOnOceanOne = function(event) {
  if (clickWasOnCell(event)) {
    const cell = event.target;

    chooseSell('p1', cell);
  }
};

const shipOnOceanTwo = function(event) {
  if (clickWasOnCell(event)) {
    const cell = event.target;

    chooseSell('p2', cell);
  }
};

const oceanOneListener = function(event) {
  shipOnOceanOne(event);
};

const oceanTwoListener = function(event) {
  shipOnOceanTwo(event);
};

playerOneOcean.addEventListener('click', oceanOneListener);
playerTwoOcean.addEventListener('click', oceanTwoListener);

function nicknameError(text) {
  const error = document.createElement('div');

  error.classList.add('error');
  error.innerText = text;
  error.style.display = 'block';

  changeNicknameForm.append(error);

  setTimeout(function() {
    error.remove();
  }, 1500);
}

function preGame() {
  const coin = document.querySelector('.coin');

  document.querySelector('.player-one-nickname').innerText = playerOne.nickname;
  document.querySelector('.player-two-nickname').innerText = playerTwo.nickname;
  document.querySelector('.front').innerText = playerOne.nickname;
  document.querySelector('.back').innerText = playerTwo.nickname;

  preGameContainer.style.display = 'flex';

  coin.onclick = function() {
    if (coinWinner !== undefined) {

    } else {
      coinWinner = Math.random() * 2;

      if (coinWinner <= 1) {
        coinWinner = playerOne.nickname;
      } else {
        coinWinner = playerTwo.nickname;
      }

      coin.classList.add('spinning');

      setTimeout(function() {
        coin.classList.remove('spinning');

        coin.innerHTML = `${coinWinner} attacks first!`;

        coin.style.color = 'black';
        coin.style.borderRadius = '50%';
        coin.style.fontSize = '0.8em';
        coin.style.letterSpacing = '2.5px';
        coin.style.border = '2px solid black';

        const startGameButton = document.createElement('button');

        startGameButton.classList.add('start-game___button');
        startGameButton.innerText = 'Start game!';

        preGameContainer.append(startGameButton);

        startGameButton.addEventListener('click', function() {
          shipsMenu(coinWinner);
        });
      }, 1000);
    }
  };
}

const playerOneContainer = document.querySelector('#player-one');
const playerTwoContainer = document.querySelector('#player-two');
const shipsList = document.querySelector('.placing-container');

function shipsMenu(winner) {
  preGameContainer.style.display = 'none';

  if (winner === playerOne.nickname) {
    playerTwoContainer.style.display = 'none';
    playerOneContainer.style.display = 'flex';
    shipsList.style.display = 'block';
    playerOneOcean.classList.add('active-ocean');
  } else {
    playerOneContainer.style.display = 'none';
    playerTwoContainer.style.display = 'flex';
    shipsList.style.display = 'block';
    playerTwoOcean.classList.add('active-ocean');
  }
}

const shipTypeRadio = document.getElementsByName('shipsType');
const directionTypeRadio = document.getElementsByName('shipsDirection');

let selectedShip = 'sq1';
let direction = 'horizontal';

for (let i = 0; i < shipTypeRadio.length; i++) {
  shipTypeRadio[i].onchange = function() {
    (selectedShip) ? console.log('changed type of ship') : null;

    if (this !== selectedShip) {
      selectedShip = this;
    }
    selectedShip = this.value;
  };
}

for (let i = 0; i < directionTypeRadio.length; i++) {
  directionTypeRadio[i].onchange = function() {
    (direction) ? console.log('changed direction of ship') : null;

    if (this !== direction) {
      direction = this;
    }
    direction = this.value;
  };
}

function clickWasOnCell(element) {
  const cell = element.target;
  let cellClassList = cell.classList;

  cellClassList = Array.from(cellClassList);

  const isOcean = cellClassList.indexOf('ocean');
  const isRow = cellClassList.indexOf('row');
  const isShip = cellClassList.indexOf('ship');
  const isBusy = cellClassList.indexOf('busy');

  if (isOcean === -1 && isRow === -1 && isShip === -1 && isBusy === -1) {
    return true;
  } else {
    return false;
  }
}

let currentPlayer;

function chooseSell(player, cell) {
  const currentShip = selectedShip;

  if (player === 'p1') {
    currentPlayer = playerOne;
  } else {
    currentPlayer = playerTwo;
  }

  if (checkIfShipsLeft(currentPlayer)) {
    switch (currentShip) {
      case 'sq1':
        if (currentPlayer.shipsLeft[1] > 0) {
          placeShip(currentShip, cell);
        } else {
          showModalWindow('No ships of this type left, try another one!');
        }
        break;

      case 'sq2':
        if (currentPlayer.shipsLeft[2] > 0) {
          placeShip(currentShip, cell);
        } else {
          showModalWindow('No ships of this type left, try another one!');
        }
        break;

      case 'sq3':
        if (currentPlayer.shipsLeft[3] > 0) {
          placeShip(currentShip, cell);
        } else {
          showModalWindow('No ships of this type left, try another one!');
        }
        break;

      case 'sq4':
        if (currentPlayer.shipsLeft[4] > 0) {
          placeShip(currentShip, cell);
        } else {
          showModalWindow('No ships of this type left, try another one!');
        }
        break;
    }
  } else {
    nextTurn(currentPlayer);
    showModalWindow('<small>You have placed all the ships. Give controls to another player and press OK.</small>');
  }
}

function placeShip(ship, cell) {
  let cellClassList = cell.classList;

  cellClassList = cellClassList[1];
  cellClassList = cellClassList.split('-');
  cellClassList.shift();

  switch (ship) {
    case 'sq1':
      if (cellIsAvailable(1, direction)) {
        updatePlacingContainer(currentPlayer);
      } else {
        showModalWindow('Can`t place this ship there!');
      }
      break;
    case 'sq2':
      if (cellIsAvailable(2, direction)) {
        updatePlacingContainer(currentPlayer);
      } else {
        showModalWindow('Can`t place this ship there!');
      }
      break;
    case 'sq3':
      if (cellIsAvailable(3, direction)) {
        updatePlacingContainer(currentPlayer);
      } else {
        showModalWindow('Can`t place this ship there!');
      }
      break;
    case 'sq4':
      if (cellIsAvailable(4, direction)) {
        updatePlacingContainer(currentPlayer);
      } else {
        showModalWindow('Can`t place this ship there!');
      }
      break;
    default: alert('Something went wrong...');
  }

  function cellIsAvailable(cells, direction) {
    let currentOcean;

    currentPlayer === playerOne ? currentOcean = 'ocean-one'
                                : currentOcean = 'ocean-two';

    const row = +cellClassList[0];
    const column = +cellClassList[1];
    const cellsToCheck = [];

    for (let i = 0; i < cells; i++) {
      if (direction === 'horizontal') {
        var currentCell = document.querySelector(`#${currentOcean} > div:nth-child(${row}) > div.cell.cell-${row}-${column + i}`);
      } else {
        var currentCell = document.querySelector(`#${currentOcean} > div:nth-child(${row + i}) > div.cell.cell-${row + i}-${column}`);
      }

      if (currentCell === null) {
        return false;
      } else {
        cellsToCheck.push(currentCell);
      }
    }

    let allCellsAreAvailable = true;

    for (const i of cellsToCheck) {
      let availableAbove = false; let availableBelow = false;
      let availableLeft = false; let availableRight = false;
      let availableTopLeft = false; let availableTopRight = false;
      let availableBottomLeft = false; let availableBottomRight = false;

      let cellAbove = false; let cellBelow = false;
      let cellLeft = false; let cellRight = false;
      let cellTopLeft = false; let cellTopRight = false;
      let cellBottomLeft = false; let cellBottomRight = false;

      let cellClassList = i.classList;

      cellClassList = cellClassList[1];
      cellClassList = cellClassList.split('-');
      cellClassList.shift();

      const row = +cellClassList[0];
      const column = +cellClassList[1];

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
        cellAbove = document.querySelector(`#${currentOcean} > div:nth-child(${row - 1}) > div.cell.cell-${row - 1}-${column}`);

        if (!cellAbove.classList.contains('ship')) {
          availableAbove = true;
        }
      }

      if (!availableBelow) {
        cellBelow = document.querySelector(`#${currentOcean} > div:nth-child(${row + 1}) > div.cell.cell-${row + 1}-${column}`);

        if (!cellBelow.classList.contains('ship')) {
          availableBelow = true;
        }
      }

      if (!availableLeft) {
        cellLeft = document.querySelector(`#${currentOcean} > div:nth-child(${row}) > div.cell.cell-${row}-${column - 1}`);

        if (!cellLeft.classList.contains('ship')) {
          availableLeft = true;
        }
      }

      if (!availableRight) {
        cellRight = document.querySelector(`#${currentOcean} > div:nth-child(${row}) > div.cell.cell-${row}-${column + 1}`);

        if (!cellRight.classList.contains('ship')) {
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
        cellTopLeft = document.querySelector(`#${currentOcean} > div:nth-child(${row - 1}) > div.cell.cell-${row - 1}-${column - 1}`);

        if (!cellTopLeft.classList.contains('ship')) {
          availableTopLeft = true;
        }
      }

      if (!availableTopRight) {
        cellTopRight = document.querySelector(`#${currentOcean} > div:nth-child(${row - 1}) > div.cell.cell-${row - 1}-${column + 1}`);

        if (!cellTopRight.classList.contains('ship')) {
          availableTopRight = true;
        }
      }

      if (!availableBottomLeft) {
        cellBottomLeft = document.querySelector(`#${currentOcean} > div:nth-child(${row + 1}) > div.cell.cell-${row + 1}-${column - 1}`);

        if (!cellBottomLeft.classList.contains('ship')) {
          availableBottomLeft = true;
        }
      }

      if (!availableBottomRight) {
        cellBottomRight = document.querySelector(`#${currentOcean} > div:nth-child(${row + 1}) > div.cell.cell-${row + 1}-${column + 1}`);

        if (!cellBottomRight.classList.contains('ship')) {
          availableBottomRight = true;
        }
      }

      const available = availableAbove && availableBelow && availableLeft
                     && availableRight && availableTopLeft && availableTopRight
                     && availableBottomLeft && availableBottomRight;

      if (!available) {
        allCellsAreAvailable = false;
      }
    }

    if (allCellsAreAvailable) {
      const shipLength = cellsToCheck.length;

      for (const i of cellsToCheck) {
        i.classList.add('ship');
        i.classList.add(`${shipLength}-sq`);
      }

      markBusyCells(cellsToCheck, currentOcean);
      currentPlayer.shipsLeft[cells]--;

      if (!checkIfShipsLeft(playerOne) && !checkIfShipsLeft(playerTwo)) {
        setTimeout(function() {
          showModalWindow('<small>ALL SHIPS ARE PLACED! BATTLE BEGINS! Give controls to another player and press OK.</small>');
          nextTurn(currentPlayer);
          beginBattle();
        }, 1000);
      } else if (!checkIfShipsLeft(currentPlayer)) {
        setTimeout(function() {
          showModalWindow('<small>You have placed all ships. Give controls to another player and press OK.</small>');
          nextTurn(currentPlayer);
        }, 1000);
      }

      return true;
    }

    return false;
  }
}

// OK
function markBusyCells(cells, ocean, alreadyMarked = false) {
  for (const cell of cells) {
    let cellClassList = cell.classList;

    cellClassList = cellClassList[1];
    cellClassList = cellClassList.split('-');
    cellClassList.shift();

    const row = +cellClassList[0];
    const column = +cellClassList[1];

    const cellAbove = document.querySelector(`#${ocean} > div:nth-child(${row - 1}) > div.cell.cell-${row - 1}-${column}`);
    const cellBelow = document.querySelector(`#${ocean} > div:nth-child(${row + 1}) > div.cell.cell-${row + 1}-${column}`);
    const cellLeft = document.querySelector(`#${ocean} > div:nth-child(${row}) > div.cell.cell-${row}-${column - 1}`);
    const cellRight = document.querySelector(`#${ocean} > div:nth-child(${row}) > div.cell.cell-${row}-${column + 1}`);
    const cellTopLeft = document.querySelector(`#${ocean} > div:nth-child(${row - 1}) > div.cell.cell-${row - 1}-${column - 1}`);
    const cellTopRight = document.querySelector(`#${ocean} > div:nth-child(${row - 1}) > div.cell.cell-${row - 1}-${column + 1}`);
    const cellBottomLeft = document.querySelector(`#${ocean} > div:nth-child(${row + 1}) > div.cell.cell-${row + 1}-${column - 1}`);
    const cellBottomRight = document.querySelector(`#${ocean} > div:nth-child(${row + 1}) > div.cell.cell-${row + 1}-${column + 1}`);

    if (alreadyMarked) {
      const cellsAround = [
        cellAbove, cellBelow, cellLeft, cellRight,
        cellTopLeft, cellTopRight, cellBottomLeft, cellBottomRight,
      ];

      for (const each of cellsAround) {
        if (each !== null) {
          const eachClassList = Array.from(each.classList);

          if (!eachClassList.includes('ship') && !eachClassList.includes('damaged-ship')) {
            if (!eachClassList.includes('busy')) {
              each.classList.add('busy');
            }
            each.classList.add('missed-shot');
          }
        }
      }
    } else {
      if (cellAbove !== null && !cellAbove.classList.contains('ship' && !cellAbove.classList.contains('damaged-ship'))) {
        cellAbove.classList.add('busy');
      }

      if (cellLeft !== null && !cellLeft.classList.contains('ship') && !cellLeft.classList.contains('damaged-ship')) {
        cellLeft.classList.add('busy');
      }

      if (cellRight !== null && !cellRight.classList.contains('ship') && !cellRight.classList.contains('damaged-ship')) {
        cellRight.classList.add('busy');
      }

      if (cellBelow !== null && !cellBelow.classList.contains('ship') && !cellBelow.classList.contains('damaged-ship')) {
        cellBelow.classList.add('busy');
      }

      if (cellTopRight !== null && !cellTopRight.classList.contains('ship') && !cellTopRight.classList.contains('damaged-ship')) {
        cellTopRight.classList.add('busy');
      }

      if (cellTopLeft !== null && !cellTopLeft.classList.contains('ship') && !cellTopLeft.classList.contains('damaged-ship')) {
        cellTopLeft.classList.add('busy');
      }

      if (cellBottomRight !== null && !cellBottomRight.classList.contains('ship') && !cellBottomRight.classList.contains('damaged-ship')) {
        cellBottomRight.classList.add('busy');
      }

      if (cellBottomLeft !== null && !cellBottomLeft.classList.contains('ship') && !cellBottomLeft.classList.contains('damaged-ship')) {
        cellBottomLeft.classList.add('busy');
      }
    }
  }
}

function checkIfShipsLeft(player) {
  const totalShips = player.shipsLeft[1] + player.shipsLeft[2] + player.shipsLeft[3] + player.shipsLeft[4];

  if (totalShips > 0) {
    return true;
  } else {
    return false;
  }
}

let shipsHidden = false;
let nextTurnButtonAdded = false;

const nextTurn = function(player) {
  if (shipsHidden === false) {
    const hideContainer = document.createElement('div');

    document.body.append(hideContainer);
    shipsHidden = true;
  }

  if (player.nickname === playerOne.nickname) {
    playerOneContainer.style.display = 'none';

    if (player.shipsPlaced === false) {
      player.shipsPlaced = true;
    }
    currentPlayer = playerTwo;
    playerTwoContainer.style.display = 'flex';

    if (currentPlayer.shipsPlaced === false) {
      updatePlacingContainer(currentPlayer);
    }
  } else {
    playerTwoContainer.style.display = 'none';

    if (player.shipsPlaced === false) {
      player.shipsPlaced = true;
    }
    currentPlayer = playerOne;
    playerOneContainer.style.display = 'flex';

    if (currentPlayer.shipsPlaced === false) {
      updatePlacingContainer(currentPlayer);
    }
  }

  if (nextTurnButtonAdded) {
    nextTurnButton.disabled = true;
  }

  if (playerOne.shipsPlaced && playerTwo.shipsPlaced) {
    playerOneShootingOcean.addEventListener('click', shootingListener);
    playerTwoShootingOcean.addEventListener('click', shootingListener);
  }
};

function updatePlacingContainer(player) {
  const labelForSq1 = document.querySelector('.sq1-ships-left');

  labelForSq1.innerHTML = player.shipsLeft[1];

  const labelForSq2 = document.querySelector('.sq2-ships-left');

  labelForSq2.innerHTML = player.shipsLeft[2];

  const labelForSq3 = document.querySelector('.sq3-ships-left');

  labelForSq3.innerHTML = player.shipsLeft[3];

  const labelForSq4 = document.querySelector('.sq4-ships-left');

  labelForSq4.innerHTML = player.shipsLeft[4];
};

function showModalWindow(text) {
  const modalErrorContainer = document.createElement('div');

  modalErrorContainer.classList.add('modal-error');
  document.body.append(modalErrorContainer);

  const errorTextContainer = document.createElement('div');

  errorTextContainer.classList.add('error-text___container');
  modalErrorContainer.append(errorTextContainer);

  const closeError = document.createElement('div');

  closeError.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`;

  errorTextContainer.append(closeError);

  closeError.onclick = function() {
    closeModalWindow();
  };

  const errorText = document.createElement('span');

  errorText.innerHTML = text;
  errorTextContainer.append(errorText);

  const okButton = document.createElement('button');

  okButton.classList.add('ok-button');
  okButton.innerHTML = 'OK';

  okButton.onclick = function() {
    closeModalWindow();
  };

  errorTextContainer.append(okButton);
}

function closeModalWindow() {
  const modalError = document.querySelector('.modal-error');

  if (shipsHidden === true) {
    shipsHidden = false;
  }

  modalError.parentNode.removeChild(modalError);
}

const playerOneShootingOcean = document.getElementById('shooting-ocean-one');
const playerTwoShootingOcean = document.getElementById('shooting-ocean-two');

const shootingListener = function(event) {
  attackCell(event.target);
};

const nextTurnListener = function() {
  nextTurn(currentPlayer);
};

function beginBattle() {
  fillEmptyCells('ocean-one');
  fillEmptyCells('ocean-two');

  playerOneOcean.removeEventListener('click', oceanOneListener);
  playerTwoOcean.removeEventListener('click', oceanTwoListener);

  playerOneOcean.classList.remove('active-ocean');
  playerTwoOcean.classList.remove('active-ocean');

  playerOneShootingOcean.addEventListener('click', shootingListener);
  playerTwoShootingOcean.addEventListener('click', shootingListener);

  playerOneShootingOcean.classList.add('active-ocean');
  playerTwoShootingOcean.classList.add('active-ocean');

  shipsList.innerHTML = `<button id="nextTurnButton">NEXT</button>`;
  shipsList.style.padding = '0px';

  nextTurnButton = document.querySelector('#nextTurnButton');
  nextTurnButton.addEventListener('click', nextTurnListener);
  nextTurnButton.disabled = true;
  nextTurnButtonAdded = true;
}

let nextTurnButton;
let cellsToMark = [];

function attackCell(cell) {
  let cellClassList = cell.classList;
  const additionalCellValidation = Array.from(cellClassList);

  cellClassList = cellClassList[1];
  cellClassList = cellClassList.split('-');
  cellClassList.shift();

  const row = +cellClassList[0];
  const column = +cellClassList[1];

  if (isNaN(row) || isNaN(column)) {
    return;
  }

  const currentShootingOcean = currentPlayer.nickname === playerOne.nickname ? 'shooting-ocean-one' : 'shooting-ocean-two';
  const opponentsOcean = currentPlayer.nickname === playerOne.nickname ? 'ocean-two' : 'ocean-one';

  const sameCellOnEnemiesOcean = document.querySelector(`#${opponentsOcean} > div:nth-child(${row}) > div.cell.cell-${row}-${column}`);
  const sameCellClassList = Array.from(sameCellOnEnemiesOcean.classList);

  const opponent = currentPlayer.nickname === playerOne.nickname ? playerTwo : playerOne;

  opponent.totalShipsLeft--;

  if (sameCellClassList.includes('ship')) {
    sameCellOnEnemiesOcean.classList.remove('ship');
    sameCellOnEnemiesOcean.classList.add('damaged-ship');

    cell.classList.add('damaged-ship');

    let shipsNearLeft = false;
    const cellsAroundCurrentCell = getCellsAround(cell, opponentsOcean);

    for (const each of cellsAroundCurrentCell) {
      if (each === null) {
        continue;
      }

      if (each.classList.contains('ship')) {
        shipsNearLeft = true;
      }
    }

    if (shipsNearLeft) {
      markCornerCells(cell, opponentsOcean);
      markCornerCells(cell, currentShootingOcean);
    } else {
      markCellsAround(cell, opponentsOcean);
      markCellsAround(cell, currentShootingOcean);
    }

    const totalShipsAround = howManyShipsAround(cell, opponentsOcean);

    const markedShips = document.querySelectorAll('.marked');

    for (const each of markedShips) {
      each.classList.remove('marked');
    }

    if (totalShipsAround === 0) {
      markCellsAroundDestroyedShip(cell, opponentsOcean);
      markCellsAroundDestroyedShip(cell, currentShootingOcean);
      cellsToMark = [];
    };

    if (checkForWin(opponent)) {
      setTimeout(function() {
        endGame(currentPlayer);
      }, 600);

      return;
    };
  } else if (
    additionalCellValidation.includes('missed-shot')
    || additionalCellValidation.includes('busy')
    || additionalCellValidation.includes('damaged-ship')
  ) {

  } else {
    nextTurnButton.disabled = false;

    sameCellOnEnemiesOcean.classList.add('missed-shot');
    cell.classList.add('missed-shot');
    showModalWindow('MISSED! PRESS NEXT TURN!');

    playerOneShootingOcean.removeEventListener('click', shootingListener);
    playerTwoShootingOcean.removeEventListener('click', shootingListener);
  }
}

function markCornerCells(cell, ocean) {
  let cellClassList = cell.classList;

  cellClassList = cellClassList[1];
  cellClassList = cellClassList.split('-');
  cellClassList.shift();

  const row = +cellClassList[0];
  const column = +cellClassList[1];

  const cellTopLeft = document.querySelector(`#${ocean} > div:nth-child(${row - 1}) > div.cell.cell-${row - 1}-${column - 1}`);
  const cellTopRight = document.querySelector(`#${ocean} > div:nth-child(${row - 1}) > div.cell.cell-${row - 1}-${column + 1}`);
  const cellBottomLeft = document.querySelector(`#${ocean} > div:nth-child(${row + 1}) > div.cell.cell-${row + 1}-${column - 1}`);
  const cellBottomRight = document.querySelector(`#${ocean} > div:nth-child(${row + 1}) > div.cell.cell-${row + 1}-${column + 1}`);

  if (cellTopRight !== null && !cellTopRight.classList.contains('ship') && !cellTopRight.classList.contains('damaged-ship')) {
    cellTopRight.classList.add('missed-shot');
    cellTopRight.classList.add('busy');
  }

  if (cellTopLeft !== null && !cellTopLeft.classList.contains('ship') && !cellTopLeft.classList.contains('damaged-ship')) {
    cellTopLeft.classList.add('missed-shot');
    cellTopLeft.classList.add('busy');
  }

  if (cellBottomRight !== null && !cellBottomRight.classList.contains('ship') && !cellBottomRight.classList.contains('damaged-ship')) {
    cellBottomRight.classList.add('missed-shot');
    cellBottomRight.classList.add('busy');
  }

  if (cellBottomLeft !== null && !cellBottomLeft.classList.contains('ship') && !cellBottomLeft.classList.contains('damaged-ship')) {
    cellBottomLeft.classList.add('missed-shot');
    cellBottomLeft.classList.add('busy');
  }
}

function howManyShipsAround(cell, ocean) {
  let totalShipsAround = 0;

  function getNumberOfShips(currentCell, currentOcean) {
    const cellsAround = getCellsAround(currentCell, currentOcean);

    for (const each of cellsAround) {
      if (each !== null) {
        const eachClassList = Array.from(each.classList);

        if (eachClassList.includes('ship') && !eachClassList.includes('marked')) {
          currentCell.classList.add('marked');
          totalShipsAround++;
          getNumberOfShips(each, currentOcean);
        }
      }
    }
  }
  getNumberOfShips(cell, ocean);

  return totalShipsAround;
}

function getCellsAround(cell, ocean) {
  let cellClassList = cell.classList;

  cellClassList = cellClassList[1];
  cellClassList = cellClassList.split('-');
  cellClassList.shift();

  const row = +cellClassList[0];
  const column = +cellClassList[1];

  const cellAbove = document.querySelector(`#${ocean} > div:nth-child(${row - 1}) > div.cell.cell-${row - 1}-${column}`);
  const cellBelow = document.querySelector(`#${ocean} > div:nth-child(${row + 1}) > div.cell.cell-${row + 1}-${column}`);
  const cellLeft = document.querySelector(`#${ocean} > div:nth-child(${row}) > div.cell.cell-${row}-${column - 1}`);
  const cellRight = document.querySelector(`#${ocean} > div:nth-child(${row}) > div.cell.cell-${row}-${column + 1}`);

  return [cellAbove, cellBelow, cellLeft, cellRight];
}

function markCellsAround(cell, ocean) {
  let cellClassList = cell.classList;

  cellClassList = cellClassList[1];
  cellClassList = cellClassList.split('-');
  cellClassList.shift();

  const row = +cellClassList[0];
  const column = +cellClassList[1];

  const cellTopLeft = document.querySelector(`#${ocean} > div:nth-child(${row - 1}) > div.cell.cell-${row - 1}-${column - 1}`);
  const cellTopRight = document.querySelector(`#${ocean} > div:nth-child(${row - 1}) > div.cell.cell-${row - 1}-${column + 1}`);
  const cellBottomLeft = document.querySelector(`#${ocean} > div:nth-child(${row + 1}) > div.cell.cell-${row + 1}-${column - 1}`);
  const cellBottomRight = document.querySelector(`#${ocean} > div:nth-child(${row + 1}) > div.cell.cell-${row + 1}-${column + 1}`);

  if (cellTopRight !== null && !cellTopRight.classList.contains('ship') && !cellTopRight.classList.contains('damaged-ship')) {
    cellTopRight.classList.add('missed-shot');
    cellTopRight.classList.add('busy');
  }

  if (cellTopLeft !== null && !cellTopLeft.classList.contains('ship') && !cellTopLeft.classList.contains('damaged-ship')) {
    cellTopLeft.classList.add('missed-shot');
    cellTopLeft.classList.add('busy');
  }

  if (cellBottomRight !== null && !cellBottomRight.classList.contains('ship') && !cellBottomRight.classList.contains('damaged-ship')) {
    cellBottomRight.classList.add('missed-shot');
    cellBottomRight.classList.add('busy');
  }

  if (cellBottomLeft !== null && !cellBottomLeft.classList.contains('ship') && !cellBottomLeft.classList.contains('damaged-ship')) {
    cellBottomLeft.classList.add('missed-shot');
    cellBottomLeft.classList.add('busy');
  }

  const cellAbove = document.querySelector(`#${ocean} > div:nth-child(${row - 1}) > div.cell.cell-${row - 1}-${column}`);
  const cellBelow = document.querySelector(`#${ocean} > div:nth-child(${row + 1}) > div.cell.cell-${row + 1}-${column}`);
  const cellLeft = document.querySelector(`#${ocean} > div:nth-child(${row}) > div.cell.cell-${row}-${column - 1}`);
  const cellRight = document.querySelector(`#${ocean} > div:nth-child(${row}) > div.cell.cell-${row}-${column + 1}`);

  if (cellAbove !== null && !cellAbove.classList.contains('ship') && !cellAbove.classList.contains('damaged-ship')) {
    cellAbove.classList.add('missed-shot');
    cellAbove.classList.add('busy');
  }

  if (cellLeft !== null && !cellLeft.classList.contains('ship') && !cellLeft.classList.contains('damaged-ship')) {
    cellLeft.classList.add('missed-shot');
    cellLeft.classList.add('busy');
  }

  if (cellRight !== null && !cellRight.classList.contains('ship') && !cellRight.classList.contains('damaged-ship')) {
    cellRight.classList.add('missed-shot');
    cellRight.classList.add('busy');
  }

  if (cellBelow !== null && !cellBelow.classList.contains('ship') && !cellBelow.classList.contains('damaged-ship')) {
    cellBelow.classList.add('missed-shot');
    cellBelow.classList.add('busy');
  }
}

function markCellsAroundDestroyedShip(cell, ocean) {
  markCellsAround(cell, ocean);

  const cellsAround = getCellsAround(cell, ocean);

  for (const each of cellsAround) {
    if (each !== null) {
      if (each.classList.contains('damaged-ship') && !each.classList.contains('marked')) {
        each.classList.add('marked');
        markCellsAroundDestroyedShip(each, ocean);
      }
    }
  }
}

function checkForWin(opponentPlayer) {
  if (opponentPlayer.totalShipsLeft <= 0) {
    return true;
  }

  return false;
}

function endGame(winner) {
  const endGameContainer = document.createElement('div');

  endGameContainer.classList.add('end-game-container');

  const statsContainer = document.createElement('div');

  statsContainer.classList.add('end-game-stats');

  const statsText = document.createTextNode(`Congrats!
  Winner is ${winner.nickname}`);

  statsContainer.appendChild(statsText);

  const playAgainButton = document.createElement('button');

  playAgainButton.innerHTML = 'Play again';
  playAgainButton.classList.add('play-again');

  playAgainButton.addEventListener('click', function() {
    location.reload();
  });

  statsContainer.appendChild(playAgainButton);
  endGameContainer.appendChild(statsContainer);
  document.body.append(endGameContainer);
}

function fillEmptyCells(ocean) {
  let cells = document.querySelectorAll(`#${ocean} .cell`);

  cells = Array.from(cells);

  cells.filter(el => {
    const cls = Array.from(el.classList);

    if (!cls.includes('ship') && !cls.includes('busy')) {
      return true;
    }
  }).map(el => el.classList.add('busy'));
}

// TODO: TIMER COUNTDOWN AFTER SHIPS PLACED
// TODO: CHOOSE YOUR COLOR
// TODO: CHANGING SHIPS AND OCEAN CONTAINER COLOR
