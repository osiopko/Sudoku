const removeElementFromArray = (arr, arg) => {
  let newArr = arr.filter(element =>  element != arg);
  return newArr;
}
// function to populate the final game result 
//chankOf is used to define the dimention of the smaller aray within an array
const getArrayPopulated = ( row=9, col=9) => {
  let matrixFinal = [];
  let exceptions = [];
  let cellValue = 0;

  //----------------------------------------------------

let successResultIndicator = false;
let iteractionNumber = 0;

  const allowedNumbers = [1,2,3,4,5,6,7,8,9];
  let allowedNumbersExpection = [1,2,3,4,5,6,7,8,9];
  let allowedNumbersTemp = [];
  let random = Math.floor(Math.random() * allowedNumbers.length);
  //console.log(random, allowedNumbers[random]);

do {

  successResultIndicator = true;
  matrixFinal = [];
  exceptions = [];
  cellValue = 0;
  allowedNumbersExpection = [1,2,3,4,5,6,7,8,9];
  allowedNumbersTemp = [];

  for (let i=0; i<row; i++){
  // Creates all lines of a smaller archive:
  matrixFinal.push([]);
  // Adds cols to the empty line:
  //matrixFinal[i].push( new Array(col));

    for(let j=0; j < col; j++){
      // Creates an empty line
      allowedNumbersTemp = allowedNumbersExpection;
      for (let k = 0; k <= j; k++)
      allowedNumbersTemp = removeElementFromArray(allowedNumbersTemp,matrixFinal[i][k]);
        for (let f = 0; f <= i; f++)
        allowedNumbersTemp = removeElementFromArray(allowedNumbersTemp,matrixFinal[f][j]);
          // new block
          let startRow = 0
          let startCol = 0
          if (Math.floor((i)/3) ==0) {startRow = 0};
          if (Math.floor((i)/3) ==1) {startRow = 3};
          if (Math.floor((i)/3) ==2) {startRow = 6};
          if (Math.floor((j)/3) ==0) {startCol = 0};
          if (Math.floor((j)/3) ==1) {startCol = 3};
          if (Math.floor((j)/3) ==2) {startCol = 6};

          for (let m = startRow ; m < i; m++){
              for (let n =  startCol ; n < j; n++){
                allowedNumbersTemp = removeElementFromArray(allowedNumbersTemp,matrixFinal[m][n]);
              }
          }



//
       random = Math.floor(Math.random() * allowedNumbersTemp.length);
       cellValue =  allowedNumbersTemp[random];
       matrixFinal[i][j] = cellValue;
       if (cellValue == undefined) {successResultIndicator = false; break;}

    }
    //matrixFinal.push(matrixFinal[i]);

  }
  iteractionNumber++
}
while (successResultIndicator == false);

return matrixFinal;
}
 

const getSomeValueRemoved = (matrix, difficulty) => {
  const numberOfCellsToHide = 0;
  let newMatrix = [];
  let random = 0;
  //if (difficulty == "easy") numberOfCellsToHide = 40;


  for (let i=0; i<matrix.length; i++){
    newMatrix.push([]);
      for(let j=0; j < matrix[i].length; j++){
        random = Math.floor(Math.random() * 2);    
        if (random ==1)  {newMatrix[i][j] = null}
        else {newMatrix[i][j] = matrix[i][j]};    
      }
  }
    
  return newMatrix;
}



// usage examples:

//console.log(getArrayPopulated(9,9,3));


// array defined 

const initialisingMatrix = () => {
  class Sudoku {
    constructor (complexity,col, row) 
  {
    this.complexity = complexity; 
    this.col = col;
    this.row = row;
    this.finalArray = [];
    this.prePopulatedArray = [];
    this.errorsNumber = 0
  }
  }

// creating object instance 
  let matrix = new Sudoku("easy", 9, 9);

  matrix.finalArray = getArrayPopulated(9,9)


  matrix.prePopulatedArray = getSomeValueRemoved (matrix.finalArray, "easy");
    //matrix.prePopulatedArray = matrix.finalArray


    // console.log(matrix)
  return matrix;
}


// global variables 
let matrixGame = initialisingMatrix();
//console.log(matrixGame);
let prePopulated =  matrixGame.prePopulatedArray;
let finalArray  = matrixGame.finalArray;
let errors = document.getElementById("errors");



// console.log(box);
// get numbers populated on the right hand side with their IDs
const showNumbersRightSide = () => {
  const rightContainer = document.querySelector('.playRightSide');
  for (let i = 1; i < 10; i++) {
    let box = document.createElement('div');
    box.id = i;
    box.innerHTML = i;
    box.addEventListener('click', (event) => {

  // get ID of the targeted element
      let input = document.querySelector("input");
      let targetCell = document.getElementById("row0col0");
      if (input.value > "" && input.value != undefined ) {
        targetCell = document.getElementById(input.value);
      }
      targetCell.innerHTML = event.target.innerHTML;

      if (targetCell.innerHTML == input.id){
        targetCell.style.color = "green";
        gameResultCheck();
        // console.log("it is working");
      } else {
        targetCell.style.color = "red";
        matrixGame.errorsNumber +=1;
        let error = document.getElementById("errors");
        error.innerText = `Errors: ${matrixGame.errorsNumber}/3`;
        if (matrixGame.errorsNumber >=3) {
          let gameresult = document.getElementById("gameresult");
          let finalResult = document.getElementById("finalResult");
          finalResult.innerHTML = "You have made 3 mistakes and lost this game!";
          alert("You have made 3 mistakes and lost this game!");
          finalResult.style.color = "red";
          //gameresult.innerHTML = "You have made 3 mistakes and lost this game!";
          }
        }
   
     })
    rightContainer.appendChild(box);
  }
}

// cal the function
showNumbersRightSide();



// populated the original numbers using getArrayPopulated
const showArray = () => {
  const leftContainer = document.querySelector('.playLeftSide');

  let input = document.querySelector("input");
  //console.log (prePopulated);

  for (let i = 0; i < prePopulated.length; i++) {
    for (let j = 0;j < prePopulated[i].length; j++) {
    let element = document.createElement('div');
    element.id = `row${i}col${j}`;
    element.innerHTML = prePopulated[i][j];
    //element.tagName = finalArray[i][j];
    if (element.innerHTML >"") {element.className = "original"}
      else {element.className = "toBefilled"}
    ;
    if (prePopulated[i][j] == null){
       element.style.backgroundColor= "cornflowerblue";
    //highlightTheArea
    }
   // removeHighlightTheArea(`row0col0`);
    //if (element.id > "") {highlightTheArea(element.id)};
    if ((i+1) % 3 == 0) {
      element.style.borderBottom = "5px solid black" };
    if ((j+1) % 3 == 0) {
        element.style.borderRight = "5px solid black" };


    element.addEventListener('click', (event) => {
      removeHighlightTheArea();  
      input.value = event.target.id;
      input.id = finalArray[i][j];
      // element.style.backgroundColor = "burlywood";
      highlightTheArea(input.value);

      })
    leftContainer.appendChild(element);
 }
}

}

showArray();

// start new game
const startButton = document.getElementById("startNew");
//console.log(startButton);
  startButton.addEventListener("click",() => {
    location.reload();
})


const clearArray = () => {
  //const leftContainer = document.querySelector('.playLeftSide');
  //let el = document.getElementById("playLeftSide");
  //console.log (prePopulated);
  //leftContainer.remove();

  for (let i = 0; i <9; i++){
    for (let j = 0; j < 9; j++){
    let divElement = document.getElementById(`row${j}col${i}`);
      divElement.remove();
      
   }
  }
}

// restart existing game
const restartButton = document.getElementById("restart");
  restartButton.addEventListener("click",() => {
    alert("Let's give it another chance!");
   
    errors = document.getElementById("errors");
    matrixGame.errorsNumber = 0;
    //errors.innerHTML =
    errors.innerText = `Errors: ${matrixGame.errorsNumber}/3`;
    finalResult = document.getElementById("finalResult");
    finalResult.innerHTML = "";

    clearArray();
    prePopulated =  matrixGame.prePopulatedArray;
    finalArray  = matrixGame.finalArray;
    showArray();

//    location.reload();

})




// funstion to highlight area
const highlightTheArea = (cell) => {
    const row = cell.charAt(3);
    const col = cell.charAt(7);
    
  // highlight a row
    for (let i = 0; i <9; i++){
      let divElement = document.getElementById(`row${row}col${i}`);
      divElement.style.backgroundColor = "burlywood";
    }

    // highlight a column
    for (let i = 0; i <9; i++){
      let divElement = document.getElementById(`row${i}col${col}`);
      divElement.style.backgroundColor = "burlywood";
    }

    // highlight a square
      //  console.log(Math.floor(row/3));
      //  console.log(Math.floor(col/3));

      let startRow = 0
      let startCol = 0
      if (Math.floor((row)/3) ==0) {startRow = 0};
      if (Math.floor((row)/3) ==1) {startRow = 3};
      if (Math.floor((row)/3) ==2) {startRow = 6};
      if (Math.floor((col)/3) ==0) {startCol = 0};
      if (Math.floor((col)/3) ==1) {startCol = 3};
      if (Math.floor((col)/3) ==2) {startCol = 6};

      for (let i = startRow ; i < startRow+ 3; i++){
          for (let j =  startCol ; j <  startCol + 3; j++){
          let divElement = document.getElementById(`row${i}col${j}`);
          divElement.style.backgroundColor = "burlywood";
          }
      }
    let currentdivElement = document.getElementById(`row${row}col${col}`);
    currentdivElement.style.backgroundColor = "rgb(207, 207, 114)"; //"yellow";

    // const col = 
};


/// function to remove any highlighted area
const removeHighlightTheArea = () => {
  
  for (let i = 0; i <9; i++){
      for (let j = 0; j < 9; j++){
      let divElement = document.getElementById(`row${j}col${i}`);
      if (divElement.className == "original") {
        divElement.style.backgroundColor = "grey";}
      if (divElement.className == "toBefilled") {
        divElement.style.backgroundColor = "cornflowerblue";}
      }
    }
}


const gameResultCheck = () => {
  //const leftContainer = document.querySelector('.playLeftSide');
  let counter = 81;
  for (let i = 0; i < prePopulated.length; i++) {
    for (let j = 0;j < prePopulated[i].length; j++) {
    let element = document.getElementById(`row${i}col${j}`)
    if (element.innerHTML != finalArray[i][j]) { 
      counter-- ; 
      return;}
    }
  }
  if (counter >= 81) {
    let finalResult = document.getElementById("finalResult");
    finalResult.innerHTML = "Congradulations! You won this game!";
    alert("Congradulations! You won this game");
}
}



