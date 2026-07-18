Hands-On 1: QA Concepts, Functional Testing & Defect Lifecycle

Project Under Test: Course Management API


Task 1: Map Testing Types to a Real System

1. Test Cases Across Test Levels

Unit Testing

Tests a single function in isolation, with no database or network involved.


Function under test: validate_course_name(name: str) -> bool
Test case: Call validate_course_name("A") (a single-character string).
Expected result: Function returns False because the course name is shorter than the minimum allowed length (e.g., 3 characters).
Type: Functional


Integration Testing

Tests two components working together — here, the API endpoint and the database layer.


Components under test: POST /api/courses/ endpoint + PostgreSQL courses table.
Test case: Send a valid course payload to POST /api/courses/ and then query the database directly to confirm a matching row was inserted with the correct course_id, name, and created_at fields.
Expected result: The row exists in the database and its field values match the request payload.
Type: Functional


System Testing

Tests a full end-to-end flow from API request to database response, exercising the whole stack (routing, validation, business logic, persistence, response serialization).


Test case: Create a course via POST /api/courses/, then retrieve it via GET /api/courses/{id}, then update it via PUT /api/courses/{id}, then delete it via DELETE /api/courses/{id} — verifying the correct HTTP status and payload at every step.
Expected result: Each step returns the correct status code (201, 200, 200, 204) and the final GET after deletion returns 404.
Type: Functional


User Acceptance Testing (UAT)

Tests from the perspective of an actual college admin user, focused on whether the system meets real business needs rather than technical correctness.


Test case: A college admin logs into the portal, creates a new course called "Data Structures and Algorithms," assigns it to the CSE department, and confirms it appears correctly in the course listing page they see day-to-day.
Expected result: The admin can complete the entire workflow without confusion or errors, and the course appears exactly as expected in the UI.
Type: Functional


2. Non-Functional Test Example


Test case: Send 100 concurrent POST /api/courses/ requests and measure the 95th-percentile response time.
Expected result: 95% of requests complete within 500 ms, and the API does not return 5xx errors under this load.
Type: Non-Functional (Performance)


Non-functional tests answer "how well" the system performs — covering performance (speed under load), security (can the endpoint be exploited via SQL injection or missing auth checks?), and reliability (does the system recover gracefully after a crash or restart?) — as opposed to functional tests, which only check "does it do the right thing?"

3. Black-Box vs White-Box Testing

AspectBlack-Box TestingWhite-Box TestingKnowledge of codeTester has no knowledge of internal implementationTester has full knowledge of internal implementationFocusInputs and outputs — does the system behave correctly from the outside?Internal logic, code paths, branches, and structuresExample techniqueBoundary value analysis, equivalence partitioningStatement coverage, branch coverage, path testingWho typically performs itQA TesterDeveloperExample on this projectSending malformed JSON to POST /api/courses/ and checking the response is a 400, without looking at the route handler codeReviewing the validate_course_name() function's source and writing a unit test for every if/else branch inside it

Summary: A QA tester typically performs black-box testing, treating the API as a sealed system and validating it purely through inputs and observed outputs. A developer typically performs white-box testing, since they have access to the source code and can target specific logic branches, loops, and edge cases within the implementation itself.

4. Formal Test Cases — POST /api/courses/

Test Case IDDescriptionPreconditionsTest StepsExpected ResultActual ResultPass/FailTC_COURSE_001Create a course with valid, complete dataAPI server is running; admin is authenticated with a valid token1. Send POST /api/courses/ with body {"name": "Operating Systems", "code": "CS301", "credits": 4}
2. Observe responseAPI returns 201 Created with the new course object, including a generated course_idTC_COURSE_002Attempt to create a course with a missing required field (name)API server is running; admin is authenticated1. Send POST /api/courses/ with body {"code": "CS302", "credits": 3} (no name)
2. Observe responseAPI returns 400 Bad Request with an error message indicating name is required; no row is inserted into the databaseTC_COURSE_003Attempt to create a course with a duplicate course codeA course with code CS301 already exists; admin is authenticated1. Send POST /api/courses/ with body {"name": "OS Lab", "code": "CS301", "credits": 2}
2. Observe responseAPI returns 409 Conflict indicating the course code already exists; no duplicate row is created


Task 2: Defect Lifecycle & Severity Classification

5. Defect Lifecycle

   ┌────────┐      ┌───────────┐      ┌────────┐      ┌────────┐      ┌─────────┐      ┌──────────┐      ┌────────┐
   │  New   │ ───▶ │ Assigned  │ ───▶ │  Open  │ ───▶ │ Fixed  │ ───▶ │ Retest  │ ───▶ │ Verified │ ───▶ │ Closed │
   └────────┘      └───────────┘      └────────┘      └────────┘      └─────────┘      └──────────┘      └────────┘
                                           │                                 │
                                           ▼                                 ▼
                                     ┌───────────┐                    ┌────────────┐
                                     │ Rejected  │                    │  Reopened  │
                                     └───────────┘                    │ (back to   │
                                           │                          │   Open)    │
                                           ▼                          └────────────┘
                                     ┌───────────┐
                                     │ Deferred  │
                                     └───────────┘


New: Tester logs the defect for the first time after finding unexpected behavior.
Assigned: A lead or manager reviews the defect and assigns it to a specific developer.
Open: The developer starts investigating and confirms the defect is valid and reproducible.
Fixed: The developer implements a fix and marks the defect as resolved, ready for verification.
Retest: The QA tester re-executes the original steps to reproduce the defect against the fixed build.
Verified: The tester confirms the fix works and no regression was introduced.
Closed: The defect is formally closed once verified; no further action is needed.
Rejected path: From "Open," if the developer determines the reported behavior is actually expected behavior, a duplicate, or not reproducible, the defect moves to Rejected instead of being fixed.
Deferred path: From "Open" (or "Rejected"), if the defect is valid but the team decides it is low-impact and not worth fixing in the current release, it moves to Deferred, to be revisited in a future release cycle.
Reopened path: If, during "Retest," the tester finds the issue still occurs (or a fix caused a regression), the defect moves back to Open rather than proceeding to "Verified."


6. Severity & Priority Classification

BugSeverityPriorityJustification(a) POST /api/courses/ returns 500 for all requestsCriticalP1Core functionality is completely broken — no course can be created by anyone. This blocks the primary feature of the API and demands immediate attention.(b) Course names longer than 150 characters are silently truncated without an errorMediumP3The system doesn't crash and most legitimate course names are far shorter than 150 characters, so the functional impact is limited. However, silent data loss is a real correctness issue, so it isn't Low — it just isn't urgent enough to interrupt current work.(c) /docs Swagger page has a typo in the API descriptionLowP4Purely cosmetic — has zero impact on functionality, data integrity, or usability. Can be fixed whenever convenient, such as during a documentation pass.(d) Login with correct credentials occasionally returns 401 on the first attempt (intermittent)HighP2Although it doesn't happen every time, it directly blocks legitimate users from accessing the system and suggests an underlying race condition or token-handling bug. Intermittent authentication failures erode user trust and are prioritized highly even though the failure rate may be moderate.

7. Defect Report — Bug (a)

FieldValueDefect IDDEF-2026-0142TitlePOST /api/courses/ returns 500 Internal Server Error for all requestsEnvironmentStaging (staging-api.coursemgmt.internal), Chrome 126 / Postman 11.2Build Versionv1.4.2-rc3SeverityCriticalPriorityP1Steps to Reproduce1. Authenticate as an admin user and obtain a valid bearer token.
2. Send a POST request to /api/courses/ with a valid JSON body, e.g. {"name": "Database Systems", "code": "CS401", "credits": 4}.
3. Observe the response.Expected ResultAPI responds with 201 Created and the newly created course object in the response body.Actual ResultAPI responds with 500 Internal Server Error and an empty response body. Server logs show an unhandled NullReferenceException in the course-creation service layer.Attachmentsscreenshot of 500 error

8. Severity vs Priority


Severity measures the technical impact of the defect on the system — how badly it breaks functionality, data integrity, or stability, regardless of who is affected or how soon it needs fixing.
Priority measures the business urgency of fixing the defect — how soon it needs to be addressed, based on factors like visibility, user impact, and business deadlines, independent of how "bad" the underlying bug is technically.


Real-world example where High Severity ≠ High Priority:
Imagine a bug in a batch job that runs once a year to archive old course records, and it crashes with a null-pointer exception whenever it encounters a record with a missing instructor field. This is High Severity — the job completely fails and could corrupt archived data. However, if the job isn't scheduled to run again for another 10 months and there's time to fix it well before then, it may be assigned Low Priority — it doesn't need to be fixed in this week's sprint, even though it's technically a severe defect.

Conversely, a cosmetic bug where the company logo is misaligned on the CEO's personalized dashboard is Low Severity (nothing is broken functionally) but might be marked High Priority because leadership will see it immediately and visibility/optics demand a same-day fix.