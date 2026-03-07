const input = document.getElementById("wordInput");
const showBtn = document.getElementById("showBtn");
const avatarImg = document.getElementById("avatarPose");
const message = document.getElementById("message");

// Türkçe normalize
function normalizeWord(word) {
  return word
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/û/g, "u");
}

// Animasyonlar
const animations = {
  "lezzetli": [15,16,17,18,19,19,20,14,21,20,14,21,13,12,11,10,15],
  "guzel": [15,10,11,12,13,20,14,21,14,20,14,13,12,11,10,15],
  "insallah": [22,23,24,25,25,25,25,26,27,22],
  "canavar": [22,28,29,30,32,31,33,32,31,33,30,29,28,22],
  "elbise":[15,28,29,30,31,43,44,45,46,46,45,44],
  "cahil": [15,34,35,36,37,41,42,40,39,38,38,39,40,42,41,37,36,35,34,15],
  "fil":[15,34,35,36,51,52,47,48,48,49,49,50,50],
  "cami":[15,34,35,36,56,57,57,57,53,53,53,54,55,15],
  "affetmek":[15,15,61,61,58,58,59,59,60,60],
  "selam":[15,55,68,66,65,64,63,63,64,65,65,64,63,63,64,65,66,68,55,15],
  "merhaba":[15,55,68,66,65,64,63,63,64,65,65,64,63,63,64,65,66,68,55,15],
  "nasilsin":[15,16,17,69,69,69,69,70,70,70,70,70,70],
  "nasilsiniz":[15,16,17,69,69,69,69,70,70,70,70,70,70],
  "iyiyim":[15,16,17,69,69,69,71,71,71,71,71],
  "adin ne":[15,27,74,72,74,72,74,73,73,73,76,76,75,75],
  "tesekkur ederim":[15,16,17,77,77,4,4,5,5,6,6],
  "tesekkurler":[15,16,17,77,77,4,4,5,5,6,6],
  "rica ederim":[15,16,17,77,77,77],
  "tanistigimiza memnun oldum":[15,28,29,81,81,82,82,81,81,83,83,84,84,83,83,85,85,86,86,85,85],
  "ozur dilerim":[15,87,87,87,88,88,88,87,87,87,88,88,88,87,87,87],
  "benim adim nisa":[15,16,71,71,71,72,72,72,90,90,90,90,91,91,91,91,92,92,92,92,93,93,93,93],
  "benim adim sude":[15,16,71,71,71,72,72,72,92,92,92,92,94,94,94,94,95,95,95,95,96,96,96,96],
  "nisa":[15,27,90,90,90,90,91,91,91,91,92,92,92,92,93,93,93,93],
  "sude":[15,27,92,92,92,92,94,94,94,94,95,95,95,95,96,96,96,96],
  "evet":[15,27,97,97,97,97,97],
  "hayir":[15,16,2,2,99,99,99,98,98,98],
  "4":[15,16,1,1,1,1],
  "dort":[15,16,1,1,1,1]
};

// 🔹 FRAME PRELOAD (titreme biter)
(function preload() {
  const set = new Set();
  Object.values(animations).forEach(a => a.forEach(n => set.add(n)));
  set.forEach(n => {
    const img = new Image();
    img.src = `assets/poses/${n.toString().padStart(5,"0")}.png`;
  });
})();

let frameIndex = 0;
let intervalId = null;

function playAnimation(frames) {
  clearInterval(intervalId);
  frameIndex = 0;

  intervalId = setInterval(() => {
    const n = frames[frameIndex];
    avatarImg.src = `assets/poses/${n.toString().padStart(5,"0")}.png`;
    frameIndex = (frameIndex + 1) % frames.length;
  }, 200);
}

showBtn.addEventListener("click", () => {
  const raw = input.value.trim();
  if (!raw) return;

  const key = normalizeWord(raw);

  if (animations[key]) {
    message.textContent = `"${raw}" oynatılıyor`;
    playAnimation(animations[key]);
  } else {
    message.textContent = `"${raw}" bulunamadı`;
    clearInterval(intervalId);
  }
});

input.addEventListener("keydown", e => {
  if (e.key === "Enter") showBtn.click();
});
