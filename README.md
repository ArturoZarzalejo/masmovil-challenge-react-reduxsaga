# frontend-react-challenge

## npm start to start the development client & server application.

Phone Catalog App
Your task is to write a very simple product catalog app.
Exercise 1. Write a simple REST API in whatever language you're most
comfortable (NodeJS, Rails, Java…) that…
 * has 1 endpoint /phones
 * returns a couple of mobile phones like iPhone 7, Samsung Galaxy S7 etc. with
some simple attributes like product image (just take some off of google images), title,
description, color, price etc.
 * The data can all be mocked, no need for a persistence layer
 
Exercise 2. Write a React app that displays the phones from the API
 * Use redux for state management
 * Axios (or similar library) for fetching data from the API
 * Create a `PhoneListContainer` component that shows the phones
 * Create a `PhoneDetailComponent` that shows a few more details about the phone
when the user selects it
 * Phones lists must support pagination
 * Display a spinner or placeholder component while the API request is ongoing
 * Make it look decent. No need for super sophisticated design, but at a minimum,
make it somewhat responsive so that it doesn’t look terrible on a mobile phone.
3. Push the code to a public github repo with a README.md that explains how to run/test/deploy
with Exercise 1 and 2 (API & Frontend app)

4. Bonus Points
- Dockerizing the app.
- Realistic unit/end-to-end tests.
- Linters/code format
- State async mutations with rxjs [redux-obserbable](https://redux-observable.js.org/)
- Pagination state could be defined via queryParams
- Typescript
