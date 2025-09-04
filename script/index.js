const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const { id, level_no, lessonName } = lesson;
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button class="btn btn-outline btn-primary">
      <i class="fa-solid fa-book-open"></i>Lesson -${level_no}</button>
    `;
    levelContainer.appendChild(btnDiv);
  });
};

loadLessons();
