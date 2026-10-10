// Setting Game Options
let numbersOfTries = 6;
let currentTry = 1;
let numberOfHints = 2;

let wordToGuess = "";


  let bts = document.querySelector(".bts");
  let hint = document.createElement("button");
  hint.classList.add("hint");
  hint.innerHTML = `${numberOfHints} Hints`;
  bts.appendChild(hint)

const words = [
"bruno",
"odegard",
"halland",
"vini",
"rodri",
"billingham",
"messi",
"ronaldo",
"cherki",
"ramos",
"benzema",
"neymar",
"modric",
"inesta",
"xavi",
"kroos"
];

wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

let msg = document.querySelector(".msg");
let numbersOfLetters = wordToGuess.length;

function creatInput() {
  const inputsContainer = document.querySelector( ".inputs");

  for (let i = 1; i <= numbersOfTries; i++) {
    let tryDiv = document.createElement("div");
    let trySpan = document.createElement("span");

    trySpan.textContent = `Try-${i}`;
    tryDiv.appendChild(trySpan);

    tryDiv.classList.add(`try-${i}`);
    tryDiv.classList.add("try");

    if (i !== 1) {
      tryDiv.classList.add("disabled-inputs");
    }

    for (let j = 1; j <= numbersOfLetters; j++) {
      const input = document.createElement("input");

      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      input.classList.add("inp");

      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  }

  const inputs = document.querySelectorAll(`input`);

  // Disable inputs in the other tries
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );

  inputsInDisabledDiv.forEach((input) => {
    input.disabled = true;
  });

  // Focus on the first input
  inputs[0].focus();

  // Handle input and keyboard events
  inputs.forEach((input, index) => {
    // Convert input to uppercase and move to the next input
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();

      if (this.value !== "") {
        const nextInput = inputs[index + 1];

        if (nextInput) {
          nextInput.focus();
        }
      }
    });

    // Handle arrow keys
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);

      if (event.key === "ArrowRight") {
        const nextInput = inputs[currentIndex + 1];

        if (nextInput <= inputs.length) {
          nextInput.focus();
        }
      }

      if (event.key === "ArrowLeft") {
        const prevInput = inputs[currentIndex - 1];

        if (prevInput >= 0) {
          prevInput.focus();
        }
      }
    });
  });
  
}
  let checkBts = document.querySelector(".check");
  checkBts.addEventListener("click", checkGuess,)
function checkGuess() {
  let successGame = true;
  for( let i= 1; i <= numbersOfLetters ; i++){
    const inputField =document.querySelector(`#guess-${currentTry}-letter-${i}`);
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i-1];
    console.log(actualLetter);
    
    if( letter === actualLetter){
      inputField.classList.add("green");
    }
    else if(wordToGuess.includes(letter) && letter !== ""){
      inputField.classList.add("blue");
      successGame = false;

    }
    else{
      inputField.classList.add("red");
      successGame = false;
    }

  }
  if(successGame){
    msg.innerHTML = `Bravo you Have Won The Word Is ${wordToGuess}`;
    if (numberOfHints === 2){
      msg.innerHTML = `<p>Bravo you Have Won The Word Is ${wordToGuess}
      congratz you didn't use the hints `
    }
    
   let allTries = document.querySelectorAll(".inputs > div");
   allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

   checkBts.disabled = true;
   hint.disabled = true;
  }
  else{
    document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    currentTryInputs.forEach((input) => (input.disabled = true));
    currentTry++;
    console.log(currentTry);
    

     const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
     nextTryInputs.forEach((input) => (input.disabled = false));
     let el = document.querySelector(`.try-${currentTry}`);
     if (el) {
      document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
      el.children[1].focus();
      
     }
     else{
      checkBts.disabled= true;
      hint.disabled = true;
      msg.innerHTML = `you have lost the word is ${wordToGuess}`;
     }

  }




}






hint.addEventListener("click", handleHint);
function handleHint(){
  if(numberOfHints > 0){
    numberOfHints--;
    hint.innerHTML = `${numberOfHints} Hints`
  } else if(numberOfHints === 0){
    hint.disabled = true;
  }



const abledInputs = document.querySelectorAll("input:not([disabled])")
const emptyInputs = Array.from(abledInputs).filter((input) => input.value === "");

console.log(emptyInputs);

if(emptyInputs.length > 0 ){
  const randomIndex = Math.floor(Math.random() * emptyInputs.length);
  const randomInput = emptyInputs[randomIndex];
  const indexToFill = Array.from(abledInputs).indexOf(randomInput);

  if(indexToFill !== -1){
    randomInput.value = wordToGuess[indexToFill].toUpperCase();
  }
}

}
 function handleBackspace(event){
  if(event.key === "Backspace"){
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentElement = Array.from(inputs).indexOf(document.activeElement);
    if (currentElement > 0){
      const currentInput = inputs[currentElement];
      const prevInput = inputs[currentElement - 1];
      currentInput.value ="";
      prevInput.value = "";
      prevInput.focus();
    }
  }
 }
 document.addEventListener("keydown", handleBackspace)


// console.log(currentTry);

window.onload = function () {
  creatInput();
  console.log(wordToGuess);
  

  
  
};