// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";
// Get Array From Letters
let lettersArray = Array.from(letters);
// Select Letters Container
let lettersContainer = document.querySelector(".letters");
//Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");
  //Create Letter Text Node
  let theLetter = document.createTextNode(letter);
  //Append The Letter To Span
  span.appendChild(theLetter);
  // Add Class To span
  span.className = "letter-box";
  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});
//Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "ruby",
    "go",
    "fortan",
    "mysql",
    "python",
    "sql",
    "dart",
    "java",
  ],
  movies: [
    "Legend",
    "Inception",
    "Interstaller",
    "The Mist",
    "The Meg",
    "Joker",
    "Fury",
    "Watcher",
    "Death Race",
    "Wrath Of Man",
  ],
  people: [
    "Albert Einstein",
    "Leo Messi",
    "Elon Mask",
    "Bill Gates",
    "Jeff Bezos",
    "John Wick",
    "Steve jobs",
    "The Rock",
    "Brad Pitt",
    "Will Smith",
  ],
  countries: [
    "Syria",
    "Egypt",
    "Iraq",
    "Palestine",
    "Qatar",
    "Bahrain",
    "Yemen",
    "Jordan",
    "Emarat",
    "Saudi Arabia",
  ],
};
// Get Random Property
// Get All Keys From Object
let allkeys = Object.keys(words);
// Random Number Depend On Keys Length
let randomPropertyNumber = Math.floor(Math.random() * allkeys.length);
// Category
let randomPropertyName = allkeys[randomPropertyNumber];
// Category Words
let randomPropertyValue = words[randomPropertyName];
// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropertyValue.length);
// Random Word From Category
let randomValueName = randomPropertyValue[randomValueNumber];
// Set Category Info
document.querySelector(".game-info .category span").innerHTML =
  randomPropertyName;
// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");
// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueName);
//
let SumAsciiWord = 0;
// Create Spans Depend On Word
lettersAndSpace.forEach((letter) => {
  // Create Empty Span
  let emptySpan = document.createElement("span");
  // If Letter Is Space
  if (letter === " ") {
    // Add Class To Span
    emptySpan.className = "with-space";
  } else {
    SumAsciiWord += letter.toLowerCase().codePointAt();
  }
  // Append Span To The Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});
// Select All Spans Form The Word
let guessSpans = document.querySelectorAll(".letters-guess span");
// Set Wrong Attempts
let wrongAttempts = 0;
// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");
//
let SumAsciiUser = 0;
// Handle Clicking On Letters
document.addEventListener("click", (event) => {
  // Set The Chose Status
  let theStatus = false;
  //
  if (event.target.className === "letter-box") {
    event.target.classList.add("clicked");
    // Get Clicked Letter
    let theClickedLetter = event.target.innerHTML.toLowerCase();
    // The Chosen Word
    let theChosenWord = Array.from(randomValueName.toLowerCase());
    //
    theChosenWord.forEach((wordLetter, wordIndex) => {
      // If The Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {
        // Set Status To Correct
        theStatus = true;
        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            if (wordIndex !== " ") {
              SumAsciiUser += wordLetter.toLowerCase().codePointAt();
            }
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    //Out Side Loop
    // If Letter Is Wrong
    if (theStatus === false) {
      //Increase The Wrong Attempts
      wrongAttempts++;
      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      //Play Fail Sound
      document.getElementById("failed").play();
      //
      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      //Play Success Sound
      document.getElementById("success").play();
    }
  }
  if (SumAsciiWord === SumAsciiUser) {
    againGame();
  }
  /*   console.log(SumAsciiWord);
  console.log(SumAsciiUser); */
});
// Again Game Function
function againGame() {
  //Create Popup Div
  let div = document.createElement("div");
  //Create Text Div
  let divText = document.createTextNode(`Excellent, You won`);
  //Append Text To Div
  div.appendChild(divText);
  // Add Class To Div
  div.className = "popup";
  // Append Div To Body
  document.body.appendChild(div);
  //Create Button Try Again
  let button = document.createElement("Button");
  //Create Text Button
  let textButton = document.createTextNode("Again ?");
  //Append textButton To button
  button.appendChild(textButton);
  //add Class To Button
  button.className = "btn-again";
  //Append Button To Body
  div.appendChild(button);
}
// End Game Function
function endGame() {
  //Create Popup Div
  let div = document.createElement("div");
  //Create Text Div
  let divText = document.createTextNode(
    `Game Over, The word is ${randomValueName}`
  );
  //Append Text To Div
  div.appendChild(divText);
  // Add Class To Div
  div.className = "popup";
  // Append Div To Body
  document.body.appendChild(div);
  //Create Button Try Again
  let button = document.createElement("Button");
  //Create Text Button
  let textButton = document.createTextNode("Try again ?");
  //Append textButton To button
  button.appendChild(textButton);
  //add Class To Button
  button.className = "btn-again";
  //Append Button To Body
  div.appendChild(button);
}
document.addEventListener("click", (event) => {
  if (event.target.className == "btn-again") {
    window.location.reload();
  }
});
