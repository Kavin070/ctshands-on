# Student Portal — Hands-On 10: API Integration & Advanced State Management

Student Portal built with **React + Redux Toolkit**, extended with a centralised
Axios API layer, `createAsyncThunk` for async data fetching, and a global
Error Boundary. A local `json-server` instance is used as the mock backend.

## Folder Structure

```
student-portal-routing/
├── db.json                        # mock backend data (json-server)
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── api/
    │   ├── apiClient.js            # single Axios instance + interceptors
    │   └── courseApi.js            # getAllCourses, getCourseById, enrollStudent
    ├── components/
    │   ├── CourseCard.jsx
    │   ├── ErrorBoundary.jsx       # global error boundary (fallback UI)
    │   ├── Footer.jsx
    │   └── Header.jsx
    ├── context/
    │   └── EnrollmentContext.jsx   # legacy Context API demo (unused, kept for reference)
    ├── pages/
    │   ├── CourseDetailPage.jsx
    │   ├── CoursesPage.jsx
    │   ├── HomePage.jsx
    │   └── ProfilePage.jsx
    ├── redux/
    │   ├── coursesSlice.js         # createAsyncThunk + extraReducers + selectors
    │   ├── enrollmentSlice.js
    │   └── store.js
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── main.jsx
```

## Prerequisites

- Node.js 18+
- npm

## Setup & Run

Run all commands from inside `student-portal-routing/`.

```bash
# 1. Install dependencies
npm install

# 2. Start the mock API (json-server) AND the Vite dev server together
npm run dev:all
```

This runs:
- `json-server` on **http://localhost:5000** (serves `/courses` and `/enrollments` from `db.json`)
- Vite dev server on **http://localhost:5173** (the React app)

If you'd rather run them in two separate terminals:

```bash
# Terminal 1 — mock API
npm run server

# Terminal 2 — React app
npm run dev
```

### Other scripts

```bash
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # run eslint
```

### Changing the API base URL

The base URL is read from `VITE_API_BASE_URL` (falls back to
`http://localhost:5000`). To point at a different backend (e.g. a deployed
one), create a `.env` file in the project root:

```
VITE_API_BASE_URL=https://your-prod-api.example.com
```

## What Was Added in This Hands-On

- **`src/api/apiClient.js`** — single Axios instance with `baseURL`, default
  headers, and an 8s timeout. A request interceptor attaches a mock
  `Authorization` header to every call. A response interceptor unwraps
  `response.data` on success and converts any failure into a standardised
  `Error` with `message` + `statusCode`, so components never touch raw
  HTTP status codes.
- **`src/api/courseApi.js`** — `getAllCourses()`, `getCourseById(id)`,
  `enrollStudent(studentId, courseId)`. All components go through these
  functions instead of calling Axios/fetch directly.
- **`src/redux/coursesSlice.js`** — `fetchAllCourses` async thunk with
  `pending` / `fulfilled` / `rejected` handled in `extraReducers`, plus
  `selectCourses`, `selectCoursesLoading`, `selectCoursesError` selectors.
- **`CoursesPage.jsx`** — dispatches `fetchAllCourses()` in `useEffect`,
  reads state only through selectors, shows loading/error UI.
- **`CourseDetailPage.jsx`** — fetches a single course via
  `getCourseById()` instead of importing static data.
- **`CourseCard.jsx`** — enrolling calls `enrollStudent()` (persisted to the
  mock API) and then dispatches the existing `enroll` Redux action.
- **`src/components/ErrorBoundary.jsx`** — class component wrapping `<App />`
  in `main.jsx`; catches render-time errors anywhere in the tree and shows
  a fallback UI with a "Try Again" reset button.

### Testing error handling

To see the `rejected` thunk path and the Error Boundary fallback:

- Stop `json-server` (or set `VITE_API_BASE_URL` to a bad URL) and reload
  `/courses` — you'll see the standardised error message from the
  interceptor rendered on the page (handled by the thunk's `rejected`
  case, not the Error Boundary, since it's an async error).
- To trigger the Error Boundary itself, throw an error during render
  (e.g. temporarily `throw new Error("test")` inside a component's render)
  — the fallback UI will replace the crashed subtree instead of a blank
  white screen.

## Framework Comparison: State Management Across React / Angular / Vue

| | **React + Redux Toolkit** | **Angular + NgRx** | **Vue + Pinia** |
|---|---|---|---|
| **Core pieces** | Slices (`createSlice`), thunks (`createAsyncThunk`), store | Actions, Reducers, Effects, Selectors, Store | Stores (`defineStore`), state/getters/actions |
| **Boilerplate** | Moderate — slices cut a lot of it vs. classic Redux, but you still define state shape, reducers, selectors, thunks per feature | Highest — actions, reducers, effects, and selectors are typically separate files per feature; strong ceremony around immutability and RxJS | Lowest — a store is one object/function; actions are just methods, no separate action-type constants or dispatch boilerplate |
| **Async handling** | `createAsyncThunk` auto-generates pending/fulfilled/rejected actions | **Effects** (RxJS observables) intercept actions, call services, and dispatch new actions — side effects are fully decoupled from reducers | Plain `async/await` inside a store action — no special async primitive needed |
| **Learning curve** | Moderate — need to understand actions/reducers/immutable updates (handled via Immer under the hood) and thunks | Steepest — requires understanding RxJS operators (`pipe`, `switchMap`, etc.) on top of the Redux pattern | Gentlest — feels like writing a plain JS object with reactive state; very close to Vue's Composition API mental model |
| **Built-in tooling** | Redux DevTools, `configureStore` sets up good defaults (thunk middleware, DevTools) out of the box | Redux DevTools support via `@ngrx/store-devtools`; strong typing with Angular's DI system | Vue DevTools has first-class Pinia support (state inspection, time-travel) |
| **Reactivity gotchas** | None significant — `useSelector` subscribes automatically | None significant — selectors + `async` pipe handle subscriptions | Must use `storeToRefs(store)` when destructuring state in the Composition API, or reactivity breaks (destructuring plain values loses the `ref` binding) |
| **Best fit** | Medium-to-large apps wanting predictable state + strong ecosystem/middleware support | Large enterprise apps already using Angular + RxJS throughout, where side-effect isolation and strict typing matter | Small-to-medium apps that want minimal ceremony and fast onboarding |

**Data flow (all three follow the same conceptual pipeline):**

```
Component → dispatch Action → (Thunk / Effect calls API) → Reducer updates State → Selector → Component re-renders
```

- **React**: `Component → dispatch(thunk) → thunk calls courseApi → extraReducers update state → useSelector → Component`
- **Angular (NgRx)**: `Component → dispatch(loadCourses) → Effect calls CourseService → success action → Reducer → Store → Selector → Component (async pipe)`
- **Vue (Pinia)**: `Component → store.fetchAndEnroll() → action calls courseApi → mutates store state directly → Component (via storeToRefs)`
