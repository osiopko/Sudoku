"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var removeElementFromArray = function removeElementFromArray(arr, arg) {
  var newArr = arr.filter(function (element) {
    return element != arg;
  });
  return newArr;
}; // function to populate the final game result 
//chankOf is used to define the dimention of the smaller aray within an array


var getArrayPopulated = function getArrayPopulated() {
  var row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 9;
  var col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
  var matrixFinal = [];
  var exceptions = [];
  var cellValue = 0; //----------------------------------------------------

  var successResultIndicator = false;
  var iteractionNumber = 0;
  var allowedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var allowedNumbersExpection = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var allowedNumbersTemp = [];
  var random = Math.floor(Math.random() * allowedNumbers.length); //console.log(random, allowedNumbers[random]);

  do {
    successResultIndicator = true;
    matrixFinal = [];
    exceptions = [];
    cellValue = 0;
    allowedNumbersExpection = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    allowedNumbersTemp = [];

    for (var i = 0; i < row; i++) {
      // Creates all lines of a smaller archive:
      matrixFinal.push([]); // Adds cols to the empty line:
      //matrixFinal[i].push( new Array(col));

      for (var j = 0; j < col; j++) {
        // Creates an empty line
        allowedNumbersTemp = allowedNumbersExpection;

        for (var k = 0; k <= j; k++) {
          allowedNumbersTemp = removeElementFromArray(allowedNumbersTemp, matrixFinal[i][k]);
        }

        for (var f = 0; f <= i; f++) {
          allowedNumbersTemp = removeElementFromArray(allowedNumbersTemp, matrixFinal[f][j]);
        } // new block


        var startRow = 0;
        var startCol = 0;

        if (Math.floor(i / 3) == 0) {
          startRow = 0;
        }

        ;

        if (Math.floor(i / 3) == 1) {
          startRow = 3;
        }

        ;

        if (Math.floor(i / 3) == 2) {
          startRow = 6;
        }

        ;

        if (Math.floor(j / 3) == 0) {
          startCol = 0;
        }

        ;

        if (Math.floor(j / 3) == 1) {
          startCol = 3;
        }

        ;

        if (Math.floor(j / 3) == 2) {
          startCol = 6;
        }

        ;

        for (var m = startRow; m < i; m++) {
          for (var n = startCol; n < j; n++) {
            allowedNumbersTemp = removeElementFromArray(allowedNumbersTemp, matrixFinal[m][n]);
          }
        } //


        random = Math.floor(Math.random() * allowedNumbersTemp.length);
        cellValue = allowedNumbersTemp[random];
        matrixFinal[i][j] = cellValue;

        if (cellValue == undefined) {
          successResultIndicator = false;
          break;
        }
      } //matrixFinal.push(matrixFinal[i]);

    }

    iteractionNumber++;
  } while (successResultIndicator == false);

  return matrixFinal;
};

var getSomeValueRemoved = function getSomeValueRemoved(matrix, difficulty) {
  var numberOfCellsToHide = 0;
  var newMatrix = [];
  var random = 0; //if (difficulty == "easy") numberOfCellsToHide = 40;

  for (var i = 0; i < matrix.length; i++) {
    newMatrix.push([]);

    for (var j = 0; j < matrix[i].length; j++) {
      random = Math.floor(Math.random() * 2);

      if (random == 1) {
        newMatrix[i][j] = null;
      } else {
        newMatrix[i][j] = matrix[i][j];
      }

      ;
    }
  }

  return newMatrix;
}; // usage examples:
//console.log(getArrayPopulated(9,9,3));
// array defined 


var initialisingMatrix = function initialisingMatrix() {
  var Sudoku = function Sudoku(complexity, col, row) {
    _classCallCheck(this, Sudoku);

    this.complexity = complexity;
    this.col = col;
    this.row = row;
    this.finalArray = [];
    this.prePopulatedArray = [];
    this.errorsNumber = 0;
  }; // creating object instance 


  var matrix = new Sudoku("easy", 9, 9);
  matrix.finalArray = getArrayPopulated(9, 9);
  matrix.prePopulatedArray = getSomeValueRemoved(matrix.finalArray, "easy"); //matrix.prePopulatedArray = matrix.finalArray
  // console.log(matrix)

  return matrix;
}; // global variables 


var matrixGame = initialisingMatrix(); //console.log(matrixGame);

var prePopulated = matrixGame.prePopulatedArray;
var finalArray = matrixGame.finalArray;
var errors = document.getElementById("errors"); // console.log(box);
// get numbers populated on the right hand side with their IDs

var showNumbersRightSide = function showNumbersRightSide() {
  var rightContainer = document.querySelector('.playRightSide');

  for (var i = 1; i < 10; i++) {
    var box = document.createElement('div');
    box.id = i;
    box.innerHTML = i;
    box.addEventListener('click', function (event) {
      // get ID of the targeted element
      var input = document.querySelector("input");
      var targetCell = document.getElementById("row0col0");

      if (input.value > "" && input.value != undefined) {
        targetCell = document.getElementById(input.value);
      }

      targetCell.innerHTML = event.target.innerHTML;

      if (targetCell.innerHTML == input.id) {
        targetCell.style.color = "green";
        gameResultCheck(); // console.log("it is working");
      } else {
        targetCell.style.color = "red";
        matrixGame.errorsNumber += 1;
        var error = document.getElementById("errors");
        error.innerText = "Errors: ".concat(matrixGame.errorsNumber, "/3");

        if (matrixGame.errorsNumber >= 3) {
          var gameresult = document.getElementById("gameresult");

          var _finalResult = document.getElementById("finalResult");

          _finalResult.innerHTML = "You have made 3 mistakes and lost this game!";
          alert("You have made 3 mistakes and lost this game!");
          _finalResult.style.color = "red"; //gameresult.innerHTML = "You have made 3 mistakes and lost this game!";
        }
      }
    });
    rightContainer.appendChild(box);
  }
}; // cal the function


showNumbersRightSide(); // populated the original numbers using getArrayPopulated

var showArray = function showArray() {
  var leftContainer = document.querySelector('.playLeftSide');
  var input = document.querySelector("input"); //console.log (prePopulated);

  var _loop = function _loop(i) {
    var _loop2 = function _loop2(j) {
      var element = document.createElement('div');
      element.id = "row".concat(i, "col").concat(j);
      element.innerHTML = prePopulated[i][j]; //element.tagName = finalArray[i][j];

      if (element.innerHTML > "") {
        element.className = "original";
      } else {
        element.className = "toBefilled";
      }

      ;

      if (prePopulated[i][j] == null) {
        element.style.backgroundColor = "cornflowerblue"; //highlightTheArea
      } // removeHighlightTheArea(`row0col0`);
      //if (element.id > "") {highlightTheArea(element.id)};


      if ((i + 1) % 3 == 0) {
        element.style.borderBottom = "5px solid black";
      }

      ;

      if ((j + 1) % 3 == 0) {
        element.style.borderRight = "5px solid black";
      }

      ;
      element.addEventListener('click', function (event) {
        removeHighlightTheArea();
        input.value = event.target.id;
        input.id = finalArray[i][j]; // element.style.backgroundColor = "burlywood";

        highlightTheArea(input.value);
      });
      leftContainer.appendChild(element);
    };

    for (var j = 0; j < prePopulated[i].length; j++) {
      _loop2(j);
    }
  };

  for (var i = 0; i < prePopulated.length; i++) {
    _loop(i);
  }
};

showArray(); // start new game

var startButton = document.getElementById("startNew"); //console.log(startButton);

startButton.addEventListener("click", function () {
  location.reload();
});

var clearArray = function clearArray() {
  //const leftContainer = document.querySelector('.playLeftSide');
  //let el = document.getElementById("playLeftSide");
  //console.log (prePopulated);
  //leftContainer.remove();
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var divElement = document.getElementById("row".concat(j, "col").concat(i));
      divElement.remove();
    }
  }
}; // restart existing game


var restartButton = document.getElementById("restart");
restartButton.addEventListener("click", function () {
  alert("Let's give it another chance!");
  errors = document.getElementById("errors");
  matrixGame.errorsNumber = 0; //errors.innerHTML =

  errors.innerText = "Errors: ".concat(matrixGame.errorsNumber, "/3");
  finalResult = document.getElementById("finalResult");
  finalResult.innerHTML = "";
  clearArray();
  prePopulated = matrixGame.prePopulatedArray;
  finalArray = matrixGame.finalArray;
  showArray(); //    location.reload();
}); // funstion to highlight area

var highlightTheArea = function highlightTheArea(cell) {
  var row = cell.charAt(3);
  var col = cell.charAt(7); // highlight a row

  for (var i = 0; i < 9; i++) {
    var divElement = document.getElementById("row".concat(row, "col").concat(i));
    divElement.style.backgroundColor = "burlywood";
  } // highlight a column


  for (var _i = 0; _i < 9; _i++) {
    var _divElement = document.getElementById("row".concat(_i, "col").concat(col));

    _divElement.style.backgroundColor = "burlywood";
  } // highlight a square
  //  console.log(Math.floor(row/3));
  //  console.log(Math.floor(col/3));


  var startRow = 0;
  var startCol = 0;

  if (Math.floor(row / 3) == 0) {
    startRow = 0;
  }

  ;

  if (Math.floor(row / 3) == 1) {
    startRow = 3;
  }

  ;

  if (Math.floor(row / 3) == 2) {
    startRow = 6;
  }

  ;

  if (Math.floor(col / 3) == 0) {
    startCol = 0;
  }

  ;

  if (Math.floor(col / 3) == 1) {
    startCol = 3;
  }

  ;

  if (Math.floor(col / 3) == 2) {
    startCol = 6;
  }

  ;

  for (var _i2 = startRow; _i2 < startRow + 3; _i2++) {
    for (var j = startCol; j < startCol + 3; j++) {
      var _divElement2 = document.getElementById("row".concat(_i2, "col").concat(j));

      _divElement2.style.backgroundColor = "burlywood";
    }
  }

  var currentdivElement = document.getElementById("row".concat(row, "col").concat(col));
  currentdivElement.style.backgroundColor = "rgb(207, 207, 114)"; //"yellow";
  // const col = 
}; /// function to remove any highlighted area


var removeHighlightTheArea = function removeHighlightTheArea() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var divElement = document.getElementById("row".concat(j, "col").concat(i));

      if (divElement.className == "original") {
        divElement.style.backgroundColor = "grey";
      }

      if (divElement.className == "toBefilled") {
        divElement.style.backgroundColor = "cornflowerblue";
      }
    }
  }
};

var gameResultCheck = function gameResultCheck() {
  //const leftContainer = document.querySelector('.playLeftSide');
  var counter = 81;

  for (var i = 0; i < prePopulated.length; i++) {
    for (var j = 0; j < prePopulated[i].length; j++) {
      var element = document.getElementById("row".concat(i, "col").concat(j));

      if (element.innerHTML != finalArray[i][j]) {
        counter--;
        return;
      }
    }
  }

  if (counter >= 81) {
    var _finalResult2 = document.getElementById("finalResult");

    _finalResult2.innerHTML = "Congradulations! You won this game!";
    alert("Congradulations! You won this game");
  }
};