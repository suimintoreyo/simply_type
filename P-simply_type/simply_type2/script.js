document.addEventListener("DOMContentLoaded", () => {
  const targetTextElement = document.getElementById("target-text");
  const typingInputElement = document.getElementById("typing-input");
  const timeElement = document.getElementById("time");
  const scoreElement = document.getElementById("score");
  const startButton = document.getElementById("start-button");
  const resultDiv = document.getElementById("result");
  const finalScoreElement = document.getElementById("final-score");
  const restartButton = document.getElementById("restart-button");

  // texts配列はtext_source.jsで定義されている

  let currentText = "";
  let timer = null;
  let timeLeft = 60;
  let score = 0;
  let isGameRunning = false;

  // ゲームを初期化する関数
  function initializeGame() {
    // ロードされたテキストからランダムに選択
    currentText = texts[Math.floor(Math.random() * texts.length)];
    targetTextElement.innerHTML = currentText
      .split("")
      .map((char) => `<span>${char}</span>`)
      .join("");
    typingInputElement.value = "";
    typingInputElement.disabled = true;
    timeElement.textContent = 60;
    scoreElement.textContent = 0;
    timeLeft = 60;
    score = 0;
    resultDiv.classList.add("hidden");
    startButton.classList.remove("hidden");
    typingInputElement.classList.remove("correct-input");
    typingInputElement.classList.remove("incorrect-input");
  }

  // ゲームを開始する関数
  function startGame() {
    isGameRunning = true;
    startButton.classList.add("hidden");
    typingInputElement.disabled = false;
    typingInputElement.focus();

    timer = setInterval(() => {
      timeLeft--;
      timeElement.textContent = timeLeft;

      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  }

  // ゲームを終了する関数
  function endGame() {
    isGameRunning = false;
    clearInterval(timer);
    typingInputElement.disabled = true;
    finalScoreElement.textContent = score;
    resultDiv.classList.remove("hidden");
  }

  // タイピング中の処理
  typingInputElement.addEventListener("input", () => {
    if (!isGameRunning) return;

    const typedValue = typingInputElement.value;
    const targetChars = targetTextElement.querySelectorAll("span");

    let correctCount = 0;
    targetChars.forEach((charSpan, index) => {
      const char = currentText[index];
      if (index < typedValue.length) {
        if (typedValue[index] === char) {
          charSpan.classList.add("correct");
          charSpan.classList.remove("incorrect");
        } else {
          charSpan.classList.add("incorrect");
          charSpan.classList.remove("correct");
        }
      } else {
        charSpan.classList.remove("correct");
        charSpan.classList.remove("incorrect");
      }

      if (charSpan.classList.contains("correct")) {
        correctCount++;
      }
    });

    // 全て正しくタイピングされたら次のテキストへ
    if (typedValue === currentText) {
      score++;
      scoreElement.textContent = score;
      typingInputElement.value = "";
      // ロードされたテキストからランダムに選択
      currentText = texts[Math.floor(Math.random() * texts.length)];
      targetTextElement.innerHTML = currentText
        .split("")
        .map((char) => `<span>${char}</span>`)
        .join("");
    }
  });

  // イベントリスナー
  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", initializeGame);

  // ページロード時に初期化
  initializeGame();
});
