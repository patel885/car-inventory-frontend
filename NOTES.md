# Notes

Fill this in as you go — it carries as much weight in review as the code.
Keep it short; bullets are fine.

## What I completed

Built the inventory listing using MUI's Grid, Cards, and Chips with responsive layouts. Handled responsive images using native <picture> tags mapped directly to the mobile, tablet, and desktop breakpoints specified in the contract. Encapsulated all GraphQL interactions, filtering state, and sorting logic inside a dedicated useCars hook. Updated the Apollo InMemoryCache directly upon vehicle creation to keep the UI in sync without extra roundtrips. Implemented the creation modal with local input validation and inline alerts for backend BAD_USER_INPUT errors. Wired model search and year filters through GraphQL query variables alongside loading, error, and empty states. Added component integration tests covering data loading, filtering, and error handling.

## What I left out, and why

Omitted search input debouncing due to the 3–4 hour time boundary; in a real-world setting, throttling or debouncing keystrokes would be essential against a live database. Skipped a dedicated /cars/:id detail route and pagination to prioritize solid error handling, cache reconciliation, and test coverage on the primary workflow.

## Decisions and trade-offs

Organized code under src/features/cars/ following the suggested bulletproof-react structure. Repointed the root route / to the car inventory and preserved the original challenge instructions under /brief. Chose HTML <picture> over CSS background switching to leverage native browser asset negotiation and prevent layout shifts. Pushed filtering to server query variables as intended by the API schema, but left sorting on the client to avoid unnecessary network latency. Used cache.writeQuery instead of refetching queries to give an instantaneous optimistic update. Handled modal form inputs with local React state rather than pulling in external form libraries for a four-field form.

## If I had another day

Add debouncing to the model search input using useDeferredValue or a custom debounce hook. Implement the dynamic route for vehicle details backed by GetCar. Add mutation tests covering successful creation and form validation rejection. Improve modal keyboard focus trapping and aria-live announcements.

## Anything you should know to run it

Standard workflow applies. Run npm install followed by npm run dev. Run npm run verify to execute ESLint, TypeScript compilation, Jest tests, and the Vite production build.
