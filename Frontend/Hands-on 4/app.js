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

function fetchUser(id) {
  return fetch('https://jsonplaceholder.typicode.com/users/' + id)
    .then((response) => response.json())
    .then((user) => {
      console.log('User (Promise chain):', user.name);
      return user;
    });
}

async function fetchUserAsync(id) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
    const user = await response.json();
    console.log('User (async/await):', user.name);
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
}

function fetchAllCourses() {
  return new Promise((resolve) => setTimeout(() => resolve(courses), 1000));
}

const gridContainer = document.querySelector('.course-grid');
const totalCreditsEl = document.querySelector('#total-credits');
const searchInput = document.querySelector('#course-search');
const sortBtn = document.querySelector('#sort-credits-btn');
const selectedCourseInfo = document.querySelector('#selected-course-info');
const loadingEl = document.querySelector('#loading-message');

let currentCourses = [];
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

loadingEl.style.display = 'block';

fetchAllCourses().then((loadedCourses) => {
  currentCourses = [...loadedCourses];
  loadingEl.style.display = 'none';
  renderCourses(currentCourses);
});

Promise.all([
  fetch('https://jsonplaceholder.typicode.com/users/1').then((r) => r.json()),
  fetch('https://jsonplaceholder.typicode.com/users/2').then((r) => r.json()),
]).then(([user1, user2]) => {
  console.log('Promise.all — User 1:', user1.name, '| User 2:', user2.name);
});

fetchUser(1);
fetchUserAsync(2);

// --- Task 2 + Task 3: apiFetch rewritten with Axios ---
//
// fetch vs axios — three key differences:
//   1. JSON parsing  — fetch requires manual .json(); axios returns parsed data in response.data automatically.
//   2. Error handling — fetch only rejects on network failure; axios throws on any non-2xx HTTP status.
//   3. Request config — axios supports built-in options like { params, timeout, headers } as a plain object;
//                       fetch requires manual URL encoding and the options shape is more verbose.

// Step 56: axios replaces fetch — no response.ok check needed, .data already parsed
async function apiFetch(url) {
  const response = await axios.get(url, { timeout: 5000 });
  return response.data;
}

// Step 57: params object — axios serialises { userId: 1 } to ?userId=1 automatically
async function fetchUserPosts(userId) {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
    params: { userId },
    timeout: 5000,
  });
  return response.data;
}

// Step 58: request interceptor — logs every outgoing Axios request
axios.interceptors.request.use((config) => {
  console.log('API call started:', config.url);
  return config;
});

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const BAD_URL = 'https://jsonplaceholder.typicode.com/nonexistent';

const notificationsStatus = document.querySelector('#notifications-status');
const notificationsList = document.querySelector('#notifications-list');
const simulateErrorBtn = document.querySelector('#simulate-error-btn');
const userPostsBtn = document.querySelector('#user-posts-btn');

function showSpinner() {
  notificationsStatus.innerHTML = '<div class="spinner"></div>';
  notificationsList.innerHTML = '';
}

function showError(message, retryUrl) {
  notificationsStatus.innerHTML = `
    <div class="error-message">
      <p>${message}</p>
      <button type="button" class="retry-btn" id="retry-btn">Retry</button>
    </div>
  `;
  document.querySelector('#retry-btn').addEventListener('click', () => loadNotifications(retryUrl));
}

function renderPosts(posts) {
  notificationsStatus.innerHTML = '';
  notificationsList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  for (const post of posts.slice(0, 5)) {
    const card = document.createElement('article');
    card.className = 'notification-card';
    card.innerHTML = `<h4>${post.title}</h4><p>${post.body}</p>`;
    fragment.appendChild(card);
  }
  notificationsList.appendChild(fragment);
}

async function loadNotifications(url) {
  showSpinner();
  try {
    const posts = await apiFetch(url);
    renderPosts(posts);
  } catch (error) {
    showError(`Failed to load notifications: ${error.message}`, POSTS_URL);
  }
}

loadNotifications(POSTS_URL);

simulateErrorBtn.addEventListener('click', () => loadNotifications(BAD_URL));

userPostsBtn.addEventListener('click', async () => {
  showSpinner();
  try {
    const posts = await fetchUserPosts(1);
    renderPosts(posts);
  } catch (error) {
    showError(`Failed to load user posts: ${error.message}`, POSTS_URL);
  }
});

// --- Course event listeners ---
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