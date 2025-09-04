const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const loadLevelWord = (id) => {
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  /**
   * {
    "id": 107,
    "level": 2,
    "word": "Talk",
    "meaning": "কথা বলা",
    "pronunciation": "টক"
}
   */

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
      
    `;
  });
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const { id, level_no, lessonName } = lesson;
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button onclick="loadLevelWord(${level_no})" class="btn btn-outline btn-primary">
      <i class="fa-solid fa-book-open"></i>Lesson -${level_no}</button>
    `;
    levelContainer.appendChild(btnDiv);
  });
};

loadLessons();
