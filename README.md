# Javascript Concurrency Exercise 
## Requirements

- Node.js 18+ (recommended: latest LTS)
- npm 9+ (or yarn/pnpm)

## Installation

After clone or download this repository, install dependencies:

```bash
npm install
```

## Usage

```js
const urlList = [
  "https://api.restful-api.dev/objects/1",
  "https://api.restful-api.dev/objects/2",
  "https://api.restful-api.dev/objects/3",
  "https://api.restful-api.dev/objects/4",
  "https://api.restful-api.dev/objects/5",
  "https://api.restful-api.dev/objects/6",
];

const maxConcurrency = 3;

async function requestHandler(url) {
  const response = await fetch(url);
  return response.json();
}

fetchUrls(urlList, maxConcurrency, requestHandler)
  .then((responses) => {
    console.log("Respose: ", responses);
  })
  .catch((error) => {
    console.error("Error:", error);
  });)
```

## Running Tests

Run all tests:

```bash
npm run test
```

## Project Structure

```
src/
  test/
    fetchUrl.test.js   # Unit tests for fetchUrls function
  fetchUrl.js          # Logic for resquest urls using concurrency
```

## License

MIT License
