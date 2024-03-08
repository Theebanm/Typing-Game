document.addEventListener("DOMContentLoaded", () => {
  // select the elements
  const textToType = document.getElementById("text-to-type");
  const typingInput = document.getElementById("typing-input");
  const typingAcuracy = document.getElementById("accuracy");
  const speedEl = document.getElementById("speed");
  console.log({ textToType, typingAcuracy, typingInput, speedEl });

  // text to display
  const sampleText = [
    "Now is the winter of our discontent",
    "Made glorious summer by this sun of York",
    "And all the clouds that lour'd upon our house",
    "In the deep bosom of the ocean buried",
    "Now are our brows bound with victorious wreaths",
    "Our bruised arms hung up for monuments",
    "Our stern alarums changed to merry meetings",
    "Our dreadful marches to delightful measures",
    "Grim-visaged war hath smooth'd his wrinkled front",
    "And now, instead of mounting barded steeds",
    "To fright the souls of fearful adversaries",
    "He capers nimbly in a lady's chamber",
    "To the lascivious pleasing of a lute",
    "But I, that am not shaped for sportive tricks",
    "Nor made to court an amorous looking-glass",
    "I, that am rudely stamp'd, and want love's majesty",
    "To strut before a wanton ambling nymph",
    "I, that am curtail'd of this fair proportion",
  ];
  // initial values
  let currentIndex = 0;
  let startTime = new Date();
  let errors = 0;

  // functin to initialize or restart the game
  function initializeGame() {
    const text = sampleText[Math.floor(Math.random() * sampleText.length)];
    textToType.textContent = text;
    typingInput.value = "";
    currentIndex = 0;
    startTime = new Date();
    errors = 0;
    updateFeedback();
  }
  //Function to update the speed and the accuracy feedback
  function updateFeedback() {
    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 60000;
    if (elapsedTime <= 0) {
      speedEl.textContent = 0;
    } else {
      const worstTyped = typingInput.value.trim().split(/\s+/).length;
      const speed = Math.round(worstTyped / elapsedTime);
      speedEl.textContent = speed;
    }

    // calc accuracy
    const accuracy =
      currentIndex > 0
        ? Math.round(((currentIndex - errors) / currentIndex) * 100)
        : 100;
    typingAcuracy.textContent = accuracy;
    console.log(accuracy);
  }
  //Function to check typed character
  function checkCharacter(inputChar, targetChar) {
    if (inputChar !== targetChar) {
      errors++;
      // play error sound
      new Audio("./error.mp3").play();
      return false;
    } else {
      return true;
    }
  }

  //Function to display message to user
  function displayMessage(message) {
    const messageArea = document.getElementById("message-area");
    messageArea.textContent = message;

    // clear the message after 3s
    setTimeout(() => {
      messageArea.textContent = "";
    }, 3000);
  }
  //Event listener for typimg input

  typingInput.addEventListener("input", (e) => {
    const typedText = typingInput.value;
    const targetText = textToType.textContent;

    if (currentIndex < targetText.length) {
      const isCorrect = checkCharacter(
        typedText[currentIndex],
        targetText[currentIndex]
      );
      textToType.innerHTML =
        targetText.substring(0, currentIndex) +
        `<span class="${isCorrect ? "correct" : "incorrect"}">${
          targetText[currentIndex]
        }</span>` +
        targetText.substring(currentIndex + 1);
      currentIndex++;
      if (currentIndex == targetText.length) {
        displayMessage("Text completed Start another");
        initializeGame();
      }
    }

    // update the feedback
    updateFeedback();
  });

  // start
  initializeGame();
});
