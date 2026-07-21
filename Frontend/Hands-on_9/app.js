import { courses } from './data.js';

for (const { name, credits } of courses) {
  console.log(`Course: ${name}, Credits: ${credits}`);
}

const formattedCourses = courses.map(
  (course) => `${course.code} — ${course.name} (${course.credits} credits)`
);
console.log(formattedCourses);

const advancedCourses = courses.filter((course) => course.credits >= 4);
console.log(advancedCourses);

const totalCreditsAll = courses.reduce((sum, course) => sum + course.credits, 0);
console.log('Total Credits:', totalCreditsAll);

courses.forEach(({ name, credits }) => console.log(`Course: ${name}, Credits: ${credits}`));

const gridContainer = document.querySelector('.course-grid');
const totalCreditsEl = document.querySelector('#total-credits');
const searchInput = document.querySelector('#course-search');
const sortBtn = document.querySelector('#sort-credits-btn');
const selectedCourseInfo = document.querySelector('#selected-course-info');

let currentCourses = [...courses];
let sortDescending = false;

function renderCourses(coursesToRender) {
  gridContainer.innerHTML = '';

  const fragment = document.createDocumentFragment();

  for (const course of coursesToRender) {
    const { id, name, code, credits } = course;

    const article = document.createElement('article');
    article.className = 'course-card';
    article.dataset.id = id; 

    article.innerHTML = `
      <h3>${name}</h3>
      <p>${code}</p>
      <span>${credits} Credits</span>
    `;

    fragment.appendChild(article);
  }

  gridContainer.appendChild(fragment);

  const total = coursesToRender.reduce((sum, course) => sum + course.credits, 0);
  totalCreditsEl.textContent = `Total Credits: ${total}`;
}

renderCourses(currentCourses);

searchInput.addEventListener('input', (event) => {
  const searchTerm = event.target.value.trim().toLowerCase();

  currentCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm)
  );

  renderCourses(currentCourses);
});

sortBtn.addEventListener('click', () => {
  sortDescending = !sortDescending;

  currentCourses = [...currentCourses].sort((a, b) =>
    sortDescending ? b.credits - a.credits : a.credits - b.credits
  );

  sortBtn.textContent = sortDescending
    ? 'Sort by Credits (High → Low)'
    : 'Sort by Credits (Low → High)';

  renderCourses(currentCourses);
});


gridContainer.addEventListener('click', (event) => {
  const card = event.target.closest('.course-card');

  if (!card) return;

  const courseId = Number(card.dataset.id);
  const course = courses.find((c) => c.id === courseId);

  if (!course) return;

  selectedCourseInfo.textContent = `${course.name} — Grade: ${course.grade}`;
});