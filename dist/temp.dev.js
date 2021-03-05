"use strict";

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
  var allowedNumbersExpection = [];
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

    } //iteractionNumber++

  } while (successResultIndicator == false);

  return matrixFinal;
}; // usage examples:
//console.log(getArrayPopulated(9,9,3));


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
};

console.log(getSomeValueRemoved(getArrayPopulated(9, 9), "easy"));