// Import necessary packages
// 'express' is a framework that makes building web servers in Node.js much easier.
// 'cors' is a package to allow our Blogger page to safely communicate with this server.
const express = require('express');
const cors = require('cors');

// Create an instance of an Express application
const app = express();

// Define the port the server will run on. Render will provide this, but we'll default to 3001 for local testing.
const PORT = process.env.PORT || 3001;

// --- Middleware ---
// This tells our server to allow requests from any origin (for now, we can restrict this later).
app.use(cors());
// This allows our server to understand JSON data sent from the frontend.
app.use(express.json());


// --- API Endpoints (Routes) ---

// This is a simple test route to make sure our server is working.
app.get('/', (req, res) => {
  res.send('KDP Niche Tool Backend is running!');
});

/**
 * This is the main endpoint our Blogger tool will call.
 * It expects a 'keyword' and 'market' in the request.
 * Example request from the tool: /analyze?keyword=coloring books&market=fr
 */
app.get('/analyze', (req, res) => {
  // Get the keyword and market from the query parameters sent by the tool
  const { keyword, market } = req.query;

  // --- Data Validation ---
  if (!keyword || !market) {
    // If the keyword or market is missing, send back an error message.
    return res.status(400).json({ error: 'Keyword and market are required.' });
  }

  console.log(`Received request for keyword: "${keyword}" in market: "${market}"`);

  // --- THIS IS WHERE THE REAL LOGIC WILL GO ---
  // TODO:
  // 1. Connect to the Google Ads API using our credentials.
  // 2. Fetch the real search volume for the keyword.
  // 3. Connect to the Amazon bot to get competition data.
  // 4. Calculate a niche score.

  // For now, we'll send back the same kind of mock data as before.
  const mockData = {
    keyword: keyword,
    searchVolume: Math.floor(Math.random() * 10000 + 500),
    competition: Math.floor(Math.random() * 2000 + 300),
    nicheScore: `${Math.floor(Math.random() * 40) + 55}/100`,
    relatedKeywords: [
        { keyword: `${keyword} for kids`, volume: Math.floor(Math.random() * 5000) },
        { keyword: `simple ${keyword}`, volume: Math.floor(Math.random() * 3000) },
    ]
  };

  // Send the data back to the tool as a JSON object
  res.json(mockData);
});


// --- Start the Server ---
// This tells the server to start listening for requests on the specified port.
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
