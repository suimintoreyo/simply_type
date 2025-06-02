let current = null; // 現在表示中の問題（gana_spelからランダムに選択）
let score = 0; // 現在のスコア
let deftime = 10; // ゲームの制限時間（秒）
let time = 10; // 残り時間（秒）

let timerId = null; // ゲーム用タイマーID
let playing = false; // ゲーム中かどうか
let countdownId = null; // カウントダウン用タイマーID

// DOM要素の取得
const hiraElem = document.getElementById("hiragana"); // ひらがな表示用
const romaElem = document.getElementById("romaji");   // ローマ字表示用
const inputElem = document.getElementById("input");   // 入力欄
const scoreElem = document.getElementById("score");   // スコア表示用
const timerElem = document.getElementById("timer");   // タイマー表示用
const startBtn = document.getElementById("start");    // スタートボタン
const countdownElem = document.getElementById("countdown"); // カウントダウン表示用

let typeword = ""; // 追加: ランダムな単語を格納する変数（words配列から取得）

// ページ読み込み時に残り時間を表示
timerElem.textContent = time;

/**
 * 次の問題を表示する関数
 * gana_spel配列からランダムに1つ選び、ひらがなとローマ字を表示
 * 入力欄をリセットし、フォーカスを当てる
 */
function nextQuestion() {
  current = gana_spel[Math.floor(Math.random() * gana_spel.length)];
  hiraElem.textContent = current.hira;
  romaElem.textContent = current.roma.join(" / ");
  inputElem.value = "";
  inputElem.focus();
}

/**
 * ゲーム開始時の初期化処理
 * スコア・タイマー・状態をリセットし、typewordにwordsからランダムな単語を代入
 * 入力欄を有効化し、タイマーをスタート
 */
function startGame() {
  score = 0;
  let time = deftime;
  playing = true;
  scoreElem.textContent = score;
  timerElem.textContent = time;
  typeword = words[Math.floor(Math.random() * words.length)]; // ここでランダム単語を取得
  nextQuestion();
  inputElem.disabled = false;
  inputElem.focus();
  if (timerId) clearInterval(timerId); // 既存タイマーがあればクリア
  // 残り時間を1秒ごとに減らすタイマー
  timerId = setInterval(() => {
    time--;
    timerElem.textContent = time;
    if (time <= 0) {
      clearInterval(timerId); // タイマー停止
      playing = false;
      inputElem.disabled = true;
      hiraElem.textContent = "";
      romaElem.textContent = "";
      alert("時間切れ！あなたのスコア: " + score);
    }
  }, 1000);
}

/**
 * ゲーム開始前のカウントダウン処理
 * 3秒カウントダウン後にstartGame()を呼び出す
 */
function startCountdown() {
  let count = 3;
  countdownElem.textContent = count;
  inputElem.disabled = true;
  hiraElem.textContent = "";
  romaElem.textContent = "";
  if (timerId) clearInterval(timerId); // ゲームタイマー停止
  if (countdownId) clearInterval(countdownId); // 既存カウントダウン停止
  // 1秒ごとにカウントダウン
  countdownId = setInterval(() => {
    count--;
    if (count > 0) {
      countdownElem.textContent = count;
    } else {
      clearInterval(countdownId);
      countdownElem.textContent = "";
      startGame(); // カウントダウン終了後にゲーム開始
    }
  }, 1000);
}

/**
 * 入力欄のイベントリスナー
 * 正しいローマ字が入力されたらスコア加算＆次の問題へ
 */
inputElem.addEventListener("input", () => {
  if (!current || !playing) return; // ゲーム中でなければ何もしない
  const value = inputElem.value.toLowerCase();
  if (current.roma.includes(value)) {
    score++;
    scoreElem.textContent = score;
    nextQuestion();
  }
});

/**
 * スタートボタンのイベントリスナー
 * カウントダウンを開始
 */
startBtn.addEventListener("click", () => {
  startCountdown();
});

// 初期状態で入力欄を無効化
inputElem.disabled = true;
