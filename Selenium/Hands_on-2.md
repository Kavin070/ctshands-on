# Hands-On 2: SDLC vs TDLC — V-Model & Agile QA Integration

**Project Under Test:** Course Management API

---

## Task 1: V-Model Mapping

### 9. The V-Model

The V-Model maps each development (SDLC) phase on the left to a corresponding testing (TDLC) phase on the right, at the same level of abstraction. Coding sits at the bottom vertex, where the two arms meet.

```
Requirements              Acceptance
Definition   \            /  Testing
              \          /
System Design  \        /  System
                 \      /   Testing
Architecture      \    /  Integration
Design              \  /   Testing
                      \/
Module Design    ────▶ Unit
                        Testing
                        (design meets
                         implementation)

                    Coding
              (bottom vertex —
           implementation phase)
```

Full left-to-right pairing, top to bottom on the left, bottom to top on the right:

| Left Side (Development) | Right Side (Testing) |
|---|---|
| Requirements Definition | Acceptance Testing |
| System Design | System Testing |
| Architecture Design | Integration Testing |
| Module Design | Unit Testing |
| **Coding** (bottom vertex, shared by both arms) | |

### 10. SDLC Phase ↔ TDLC Phase ↔ Test Artifact

| SDLC Phase | TDLC Phase | Test Artifact Produced |
|---|---|---|
| Requirements Definition | Acceptance Testing | Acceptance Test Plan — derived from user stories like "As a college admin, I want to create a course." Captures business-level pass/fail conditions. |
| System Design | System Testing | System Test Plan — covers full end-to-end flows across the Course Management API, e.g. create → read → update → delete a course, including cross-cutting concerns like auth and error handling. |
| Architecture Design | Integration Testing | Integration Test Plan — identifies interfaces between components (e.g., API layer ↔ database, API layer ↔ auth service) and defines test cases for each interface contract. |
| Module Design | Unit Testing | Unit Test Plan / Unit Test Cases — derived from individual function/module specs, e.g. test cases for `validate_course_name()` or `generate_course_code()`. |
| Coding | — (bottom vertex) | Source code + developer-written unit tests are produced here; this is where the "V" pivots from planning artifacts to executable code and tests. |

### 11. Entry & Exit Criteria for Each TDLC Phase

#### Unit Testing
- **Entry Criteria:**
  - Module/function code is complete and compiles/runs without syntax errors.
  - Unit test cases have been written based on the Module Design document.
  - Required test environment (local dev environment, mocking libraries) is set up.
- **Exit Criteria:**
  - All planned unit test cases have been executed.
  - Code coverage meets the agreed threshold (e.g., 80%+ for core business logic like `validate_course_name()`).
  - No open Critical or High severity defects in the unit under test.

#### Integration Testing
- **Entry Criteria:**
  - All individual modules involved (e.g., course endpoint handler, database access layer) have passed unit testing.
  - Integration test environment is available, with the database and any dependent services (e.g., auth service) reachable.
  - Interface/API contracts between components are documented.
- **Exit Criteria:**
  - All planned integration test cases executed (e.g., `POST /api/courses/` correctly writes to the database).
  - No open Critical or High severity defects related to component interaction.
  - Data flows correctly across all tested interfaces with no unresolved contract mismatches.

#### System Testing
- **Entry Criteria:**
  - All integration testing is complete and exit criteria met.
  - The full Course Management API is deployed in a stable, production-like staging environment.
  - Test data (sample courses, departments, admin accounts) is available.
- **Exit Criteria:**
  - All planned end-to-end system test cases executed (e.g., full CRUD lifecycle for courses).
  - Defect count is below the agreed threshold, with no open Critical/High defects.
  - Non-functional requirements (performance, security baseline) have been validated.

#### Acceptance Testing (UAT)
- **Entry Criteria:**
  - System testing is complete and exit criteria met.
  - A UAT environment that mirrors production is available.
  - Business stakeholders/college admin representatives are available to execute test scenarios.
- **Exit Criteria:**
  - All acceptance criteria (Given-When-Then scenarios) have been executed and passed.
  - Business stakeholders formally sign off that the system meets their needs.
  - No open Critical or High severity defects; any Medium/Low defects are documented and accepted or deferred.

### 12. Early QA Engagement Points in the V-Model

1. **Requirements Definition phase:** QA reviews user stories such as "As a college admin, I want to create a new course" for ambiguity and testability — for example, flagging that "course code" needs an explicit uniqueness rule and a defined format before any code is written. Catching this here is far cheaper than discovering it during system testing.
2. **Architecture Design phase:** QA reviews the proposed API contract (e.g., the OpenAPI/Swagger spec for `POST /api/courses/`) before implementation begins, verifying that request/response schemas, status codes, and error formats are clearly and testably defined — preventing integration-test rework later.

---

## Task 2: Agile QA and Shift-Left Testing

### 13. Problems Caused by Testing-After-Development (Waterfall) for the Course Management API

1. **Late defect discovery is expensive:** If a fundamental issue — like the course code uniqueness constraint not being enforced at the database level — is only found during system testing, fixing it may require reworking the schema, the endpoint logic, and any code already built on top of the flawed assumption, costing far more than catching it during requirements review.
2. **Requirements drift goes unnoticed:** Since business stakeholders (college admins) aren't involved until acceptance testing at the very end, a misunderstanding — for example, assuming courses can only belong to one department when the college actually needs multi-department courses — isn't caught until the entire API is already built around the wrong assumption.
3. **Compressed, high-pressure testing phase:** All testing gets squeezed into a short window at the end of the project. For the Course Management API, this means unit, integration, system, and acceptance testing may need to happen in rapid succession right before a deadline, increasing the risk of rushed test execution and defects slipping into production.

### 14. QA's Role in Agile Ceremonies

- **Sprint Planning:** QA collaborates with the team to define clear, testable Acceptance Criteria for each story before it's committed to the sprint — e.g., for "create a course" story, QA ensures criteria for duplicate course codes and missing fields are defined upfront, not left ambiguous.
- **Daily Standup:** QA reports any blocking issues affecting testing progress — for example, flagging that the staging environment for the Course Management API is down, or that a dependent service (auth) is returning inconsistent tokens, blocking integration test execution.
- **Sprint Review:** QA demonstrates the tested functionality to stakeholders, showing that the "create course" feature works end-to-end and walking through the edge cases (duplicate codes, validation errors) that were verified during the sprint.
- **Retrospective:** QA raises process improvements — for example, suggesting that API contract changes be communicated earlier in future sprints after a late schema change caused rework in integration tests this sprint.

### 15. Shift-Left Practices Applied to the Course Management API

| Practice | Application to the Course Management API |
|---|---|
| (a) Reviewing requirements for testability | Before development starts, QA reviews the "create course" user story and flags that "course code must be unique" needs a precise, testable definition (case-sensitive? scoped per department or global?) so test cases can be written unambiguously. |
| (b) Writing test cases before code (TDD/BDD) | QA and developers write Given-When-Then scenarios for `POST /api/courses/` (happy path, duplicate code, missing fields) before the endpoint is implemented, so the implementation is built to satisfy already-defined, executable acceptance tests. |
| (c) Static code analysis | Tools like `pylint`, `flake8`, or `bandit` (for security) run automatically in the CI pipeline on every commit to the Course Management API codebase, catching issues like unused variables, unsafe SQL string concatenation, or missing input validation before the code ever reaches a test environment. |
| (d) API contract testing before integration | Before the frontend team starts integrating with the Course Management API, the OpenAPI/Swagger contract for `POST /api/courses/` is validated against a contract-testing tool (e.g., Dredd or Schemathesis) to confirm the actual implementation matches the documented contract, catching mismatches before full integration testing begins. |

### 16. Acceptance Criteria — Given-When-Then (Gherkin)

**User Story:** As a college admin, I want to create a new course, so that students can enroll in it.

```gherkin
Feature: Course Creation

  Scenario: Successfully create a new course with valid data
    Given I am logged in as an authenticated college admin
    And no course with the code "CS301" exists
    When I submit a POST request to "/api/courses/" with name "Operating Systems", code "CS301", and credits 4
    Then the API should respond with status 201 Created
    And the response body should contain the newly created course with a generated course_id
    And a course with code "CS301" should now exist in the database

  Scenario: Attempt to create a course with a duplicate course code
    Given I am logged in as an authenticated college admin
    And a course with the code "CS301" already exists
    When I submit a POST request to "/api/courses/" with name "OS Lab", code "CS301", and credits 2
    Then the API should respond with status 409 Conflict
    And the response body should contain an error message indicating the course code already exists
    And no duplicate course should be created in the database

  Scenario: Attempt to create a course with missing required fields
    Given I am logged in as an authenticated college admin
    When I submit a POST request to "/api/courses/" with code "CS302" and credits 3, but no "name" field
    Then the API should respond with status 400 Bad Request
    And the response body should contain an error message indicating that "name" is required
    And no course should be created in the database
```