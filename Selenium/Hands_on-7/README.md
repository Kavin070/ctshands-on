# Page Object Model

Without POM:

If the Submit button ID changes from

submit

to

btn-submit

every test using that locator must be updated.

With POM:

Only the locator inside SimpleFormPage changes.

No test file changes are required.

This improves maintainability and reusability.