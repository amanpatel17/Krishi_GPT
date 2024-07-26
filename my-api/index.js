// // index.js
// const express = require("express");
// const app = express();
// const port = 3000;

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Sample data
// let items = [
//   { id: 1, name: "Item One" },
//   { id: 2, name: "Item Two" },
// ];

// // Routes
// app.get("/", (req, res) => {
//   res.send("Welcome to the API");
// });

// app.get("/items", (req, res) => {
//   res.json(items);
// });

// app.get("/items/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const item = items.find((i) => i.id === id);
//   if (item) {
//     res.json(item);
//   } else {
//     res.status(404).send("Item not found");
//   }
// });

// app.post("/items", (req, res) => {
//   const newItem = {
//     id: items.length + 1,
//     name: req.body.name,
//   };
//   items.push(newItem);
//   res.status(201).json(newItem);
// });

// app.put("/items/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const itemIndex = items.findIndex((i) => i.id === id);
//   if (itemIndex >= 0) {
//     items[itemIndex].name = req.body.name;
//     res.json(items[itemIndex]);
//   } else {
//     res.status(404).send("Item not found");
//   }
// });

// app.delete("/items/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   items = items.filter((i) => i.id !== id);
//   res.status(204).send();
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`API listening at http://localhost:${port}`);
// });

// // index.js

// // Create a global object to hold our functions
// // window.KrishiGPTAPI = {

// // };

// const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key
// const API_URL = "https://api.openai.com/v1/chat/completions";
// async function fetchKrishiGPTResponse(message) {
//   try {
//     const response = await fetch(this.API_URL, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${this.API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are KrishiGPT, an AI assistant specializing in agricultural solutions.",
//           },
//           { role: "user", content: message },
//         ],
//         temperature: 0.7,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data.choices[0].message.content;
//   } catch (error) {
//     console.error("Error in fetchKrishiGPTResponse:", error);
//     throw error;
//   }
// }

// console.log("Index runinng...");

// index.js
const express = require("express");
const cors = require("cors"); // Import cors
const app = express();
const port = 3000;

// Middleware to enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let items = [
  { id: 1, name: "Item One" },
  { id: 2, name: "Item Two" },
];

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

app.post("/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === id);
  if (itemIndex >= 0) {
    items[itemIndex].name = req.body.name;
    res.json(items[itemIndex]);
  } else {
    res.status(404).send("Item not found");
  }
});

app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter((i) => i.id !== id);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
