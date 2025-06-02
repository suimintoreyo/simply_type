let current = null;
let score = 0;
let deftime = 10;
let time = 10;

let timerId = null;
let playing = false;
let countdownId = null;

const hiraElem = document.getElementById("hiragana");
const romaElem = document.getElementById("romaji");
const inputElem = document.getElementById("input");
const scoreElem = document.getElementById("score");
const timerElem = document.getElementById("timer");
const startBtn = document.getElementById("start");
const countdownElem = document.getElementById("countdown");

// ページ読み込み時に残り時間を表示
timerElem.textContent = time;

function nextQuestion() {
  current = questions[Math.floor(Math.random() * questions.length)];
  hiraElem.textContent = current.hira;
  romaElem.textContent = current.roma.join(" / ");
  inputElem.value = "";
  inputElem.focus();
}

function startGame() {
  score = 0;
  let time = deftime;
  playing = true;
  scoreElem.textContent = score;
  timerElem.textContent = time;
  nextQuestion();
  inputElem.disabled = false;
  inputElem.focus();
  if (timerId) clearInterval(timerId);
  timerId = setInterval(() => {
    time--;
    timerElem.textContent = time;
    if (time <= 0) {
      clearInterval(timerId);
      playing = false;
      inputElem.disabled = true;
      hiraElem.textContent = "";
      romaElem.textContent = "";
      alert("時間切れ！あなたのスコア: " + score);
    }
  }, 1000);
}

function startCountdown() {
  let count = 3;
  countdownElem.textContent = count;
  inputElem.disabled = true;
  hiraElem.textContent = "";
  romaElem.textContent = "";
  if (timerId) clearInterval(timerId);
  if (countdownId) clearInterval(countdownId);
  countdownId = setInterval(() => {
    count--;
    if (count > 0) {
      countdownElem.textContent = count;
    } else {
      clearInterval(countdownId);
      countdownElem.textContent = "";
      startGame();
    }
  }, 1000);
}

inputElem.addEventListener("input", () => {
  if (!current || !playing) return;
  const value = inputElem.value.toLowerCase();
  if (current.roma.includes(value)) {
    score++;
    scoreElem.textContent = score;
    nextQuestion();
  }
});

startBtn.addEventListener("click", () => {
  startCountdown();
});

// 初期状態で入力欄を無効化
inputElem.disabled = true;
