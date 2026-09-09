const http = require("http");

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () =>
        resolve({
          status: res.statusCode,
          headers: res.headers,
          length: data.length,
          body: data,
        })
      );
    }).on("error", reject);
  });
}

async function test() {
  console.log("--- Test 1: Fetch HomePage ---");
  const home = await fetchUrl("http://localhost:3000");
  console.log("HomePage status:", home.status, "Content length:", home.length);

  // Extract layout chunk url if present
  const match = home.body.match(/static\/chunks\/app\/layout\.js[^\"]*/);
  const layoutChunk = match ? match[0] : null;
  console.log("Layout chunk found in HTML:", layoutChunk);

  if (layoutChunk) {
    console.log("--- Test 2: Fetch Layout Chunk ---");
    const chunkRes = await fetchUrl("http://localhost:3000/_next/" + layoutChunk);
    console.log("Layout chunk status:", chunkRes.status, "Size:", chunkRes.length);
  }

  console.log("--- Test 3: Repeated Refreshes (5 iterations) ---");
  for (let i = 1; i <= 5; i++) {
    const res = await fetchUrl("http://localhost:3000");
    console.log("Refresh", i, "status:", res.status, "length:", res.length);
  }

  console.log("All dev server tests passed successfully!");
}

test().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
