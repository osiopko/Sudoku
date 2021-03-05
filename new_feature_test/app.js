// //let divElement = document.getElementById("col1")
// // divElements.forEach(element => {
// //   element.addEventListener("mouseover", console.log("it is working"));
// // });

// let listOfElements = []
// for (i=1; i<= 6; i++) {
// let divElement = document.getElementById(`col${i}`);
// divElement.addEventListener("mouseover", () => {
//   listOfElements[1] = document.getElementById(`col${1}`);
//   listOfElements[2] = document.getElementById(`col${2}`);
//   listOfElements[3] = document.getElementById(`col${3}`);
//   listOfElements[1].style.backgroundColor = "blue";
//   listOfElements[2].style.backgroundColor = "blue";
//   listOfElements[3].style.backgroundColor = "blue";
// }
// )
// divElement.addEventListener("mouseout", () => {
//   listOfElements[1] = document.getElementById(`col${1}`);
//   listOfElements[2] = document.getElementById(`col${2}`);
//   listOfElements[3] = document.getElementById(`col${3}`);
//   listOfElements[1].style.backgroundColor = "white";
//   listOfElements[2].style.backgroundColor = "white";
//   listOfElements[3].style.backgroundColor = "white";
// }
// )
// }


const allowedNumbers = [1,2,3,4,5,6,7,8,9];
const random = Math.floor(Math.random() * allowedNumbers.length);
console.log(random, allowedNumbers[random]);