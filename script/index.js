const createElements = (arr) => {
  const htmlElements = arr.map(
    (el) => `<span class="btn bg-sky-100">${el}</span>`
  );
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);

  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); //remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active"); //add active class while click

      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/word/${id}`
  );
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
    <div class="">
              <h2 class="text-2xl font-bold font-bangla">
                ${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })
              </h2>
            </div>
            <div class="">
              <h2 class="text-xl font-bold font-bangla">Meaning</h2>
              <p class="font-bangla text-lg">${word.meaning}</p>
            </div>
            <div class="">
              <h2 class="text-xl font-bold font-bangla">Example</h2>
              <p class="font-bangla text-lg">${word.sentence}</p>
            </div>
            <div class="">
              <h2 class="text-xl font-bangla mb-2">সমার্থক শব্দ গুলো</h2>
              <div class="flex items-center gap-4">${createElements(
                word.synonyms
              )}</div>
            </div>
  `;

  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
      <div class="col-span-full rounded py-4 space-y-2 text-center">
          <img class="mx-auto" src="./assets/alert-error.png" alt="">
          <p class="font-bangla text-lg font-medium text-gray-500 ">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <h2 class="font-bangla text-4xl font-semibold">নেক্সট Lesson এ যান</h2>
        </div>
    `;
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div
          class="bg-white rounded-xl shadow-sm text-center py-8 px-3 space-y-3 flex-1 items-stretch"
        >
        <h2 class="text-2xl font-bold">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h2>
          <p>Meaning /Pronounciation</p>
          <span class="font-bangla text-2xl font-medium"
            >"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${
      word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"
    }"</span
          >
          <div class="flex justify-between items-center mt-6">
            <button onclick="loadWordDetail(${
              word.id
            })" class="btn p-3 rounded-2xl bg-gray-200">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button class="btn p-3 rounded-2xl bg-gray-200">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
    `;
    wordContainer.appendChild(card);
  });
  manageSpinner(false);
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const { level_no } = lesson;
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button id="lesson-btn-${level_no}" onclick="loadLevelWord(${level_no})" class="btn btn-outline btn-primary lesson-btn">
      <i class="fa-solid fa-book-open"></i>Lesson -${level_no}</button>
    `;
    levelContainer.appendChild(btnDiv);
  });
};

loadLessons();
