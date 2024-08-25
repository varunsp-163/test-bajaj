// index.js
const express = require("express");
const { requestSchema } = require("./schema");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.options("*", cors());

// Utility function to extract numbers, alphabets, and the highest lowercase alphabet
const processInputData = (data) => {
  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const lowercaseAlphabets = alphabets.filter(
    (item) => item >= "a" && item <= "z"
  );
  const highestLowercaseAlphabet = lowercaseAlphabets.length
    ? [lowercaseAlphabets.sort().pop()]
    : [];
  return { numbers, alphabets, highestLowercaseAlphabet };
};

// POST endpoint
app.post("/bfhl", (req, res) => {
  console.log("GOT:", req.body);
  const { error, value } = requestSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ is_success: false, error: error.details[0].message });
  }

  const { data } = value;

  const user_id = "john_doe_17091999";
  const email = "john@xyz.com";
  const roll_number = "ABCD123";

  const { numbers, alphabets, highestLowercaseAlphabet } =
    processInputData(data);

  return res.status(200).json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highestLowercaseAlphabet,
  });
});

// GET endpoint
app.get("/bfhl", (req, res) => {
  return res.status(200).json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
