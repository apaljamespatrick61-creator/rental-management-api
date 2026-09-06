# Copilot Instructions for rental-management-api

These instructions guide AI-assisted code changes for this repository.

## Project Overview
- Stack: Node.js + Express + Prisma.
- Pattern: Controller -> Service -> Repository.
- API style: JSON-only REST endpoints.
- Database: Prisma schema and migrations under `prisma/`.

## Architectural Rules
- Keep controllers thin.
  - Parse request input.
  - Call service methods.
  - Return HTTP response.
  - Do not place business logic in controllers.
- Put business rules in services.
  - Validation flow orchestration.
  - Domain checks and computed fields.
  - Transaction coordination if needed.
- Put direct data access in repositories.
  - Prisma queries live here.
  - No HTTP concerns in repositories.
- Keep routes for wiring only.
  - Route definitions and middleware composition.

## Code Organization
- Follow existing module layout under `src/modules/<domain>/`:
  - `<domain>.controller.js`
  - `<domain>.service.js`
  - `<domain>.repository.js`
  - `<domain>.validators.js`
  - `<domain>.routes.js`
- Reuse existing shared config from `src/config/`.
- Reuse existing middleware from `src/middlewares/`.

## Validation and Error Handling
- Validate request payloads using the module validator files.
- Return consistent status codes:
  - 200 for successful reads/updates.
  - 201 for successful creates.
  - 400 for validation/input errors.
  - 401/403 for auth/permission failures.
  - 404 for missing resources.
  - 500 for unhandled server errors.
- Keep error messages clear and actionable.
- Never leak sensitive internals in API responses.

## Auth and Security
- Respect auth middleware patterns already in the codebase.
- Do not bypass tenant/user scoping checks.
- Never hardcode secrets, tokens, credentials, or URLs.
- Read sensitive values from environment variables only.

## Prisma and Database Changes
- Update `prisma/schema.prisma` for model changes.
- Add a migration for every schema change.
- Keep naming consistent with current conventions (snake_case DB fields where used).
- Avoid raw SQL unless Prisma cannot express the query.
- If raw SQL is necessary, parameterize queries and document why.

## API Change Rules
- Preserve backward compatibility when possible.
- Do not rename/remove public fields or endpoints without explicit instruction.
- If breaking changes are required, include migration notes in PR/commit message.

## Style and Quality
- Match existing JavaScript style used in nearby files.
- Prefer small, focused functions.
- Avoid introducing new dependencies unless clearly justified.
- Add concise comments only when logic is non-obvious.

## Testing and Verification
- For behavior changes, add or update tests when test setup exists.
- At minimum, run existing lint/test commands before finalizing changes.
- Validate critical flows:
  - auth
  - room
  - tenant
  - transaction

## What Copilot Should Do by Default
- Before large edits, inspect related controller/service/repository files.
- Prefer extending existing patterns over introducing new abstractions.
- Keep diffs minimal and scoped to the request.
- If requirements are ambiguous, ask for clarification instead of guessing domain rules.
