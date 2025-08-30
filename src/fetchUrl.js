async function fetchUrls(urlList, maxConcurrency, requestHandler) {
  const responses = [];
  let index = 0;

  async function fetchNext() {
    while (index < urlList.length) {
      const i = index++;
      try {
        responses[i] = await requestHandler(urlList[i]);
      } catch (error) {
        responses[i] = { error: error.message };
      }
    }
  }

  const jobs = Array.from(
    { length: Math.min(maxConcurrency, urlList.length) },
    () => fetchNext()
  );

  await Promise.all(jobs);
  return responses;
}

module.exports = { fetchUrls };
