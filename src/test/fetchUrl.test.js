const { fetchUrls } = require("../fetchUrl.js");

describe("fetchUrls", () => {
  test("should fetch URLs without exceeding the max concurrency", async () => {
    const urlsList = ["url1", "url2", "url3", "url4"];
    const maxConcurrency = 2;

    let activeRequests = 0;
    let maxRequests = 0;

    const mockRequestHandler = jest.fn(() => {
      activeRequests++;
      maxRequests = Math.max(maxRequests, activeRequests);

      return new Promise((resolve) => {
        setTimeout(() => {
          activeRequests--;
          resolve({ text: () => Promise.resolve("resolved") });
        }, 50);
      });
    });

    await fetchUrls(urlsList, maxConcurrency, mockRequestHandler);

    expect(maxRequests).toBeLessThanOrEqual(maxConcurrency);
    expect(mockRequestHandler).toHaveBeenCalledTimes(urlsList.length);
  });

  test("should return responses in the correct order", async () => {
    const urlsList = ["url1", "url2", "url3", "url4"];
    const maxConcurrency = 2;

    const mockRequestHandler = jest.fn((url) =>
      Promise.resolve(`response url ${url}`)
    );

    const results = await fetchUrls(
      urlsList,
      maxConcurrency,
      mockRequestHandler
    );

    expect(results).toEqual([
      "response url url1",
      "response url url2",
      "response url url3",
      "response url url4",
    ]);
    expect(mockRequestHandler).toHaveBeenCalledTimes(urlsList.length);
  });
});
