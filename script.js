const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing tests are fun and improve your skills.",
    "Practice makes perfect, so keep typing.",
    "JavaScript is a versatile programming language.",
    "Web development combines creativity and logic."
  ];
  
  let startTime, timerInterval, currentSentence;
  const sentenceBox = document.getElementById("sentence-box");
  const inputBox = document.getElementById("input-box");
  const startButton = document.getElementById("start-button");
  const resetButton = document.getElementById("reset-button");
  const timeDisplay = document.getElementById("time");
  const wpmDisplay = document.getElementById("wpm");
  const accuracyDisplay = document.getElementById("accuracy");
  
  function startTest() {
    // Reset values
    inputBox.value = "";
    inputBox.disabled = false;
    inputBox.focus();
    resetButton.disabled = false;
    startButton.disabled = true;
    timeDisplay.textContent = "0";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "0";
  
    // Choose a random sentence
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    sentenceBox.textContent = currentSentence;
  
    // Start timer
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTime, 1000);
  }
  
  function updateTime() {
    const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
    timeDisplay.textContent = elapsedTime;
  }
  
  function endTest() {
    clearInterval(timerInterval);
    inputBox.disabled = true;
  
    const elapsedTime = (new Date().getTime() - startTime) / 1000; // Time in seconds
    const typedText = inputBox.value.trim();
    const wordCount = typedText.split(/\s+/).length;
    const correctChars = compareTexts(currentSentence, typedText);
  
    // Calculate WPM and accuracy
    const wpm = Math.round((wordCount / elapsedTime) * 60);
    const accuracy = Math.round((correctChars / currentSentence.length) * 100);
  
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
  }
  
  function compareTexts(original, typed) {
    let correctChars = 0;
    for (let i = 0; i < typed.length; i++) {
      if (original[i] === typed[i]) correctChars++;
    }
    return correctChars;
  }
  
  function resetTest() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    resetButton.disabled = true;
    inputBox.disabled = true;
    inputBox.value = "";
    sentenceBox.textContent = "";
    timeDisplay.textContent = "0";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "0";
  }
  
  startButton.addEventListener("click", startTest);
  resetButton.addEventListener("click", resetTest);
  
  inputBox.addEventListener("input", () => {
    if (inputBox.value.trim() === currentSentence.trim()) {
      endTest();
    }
  });
  