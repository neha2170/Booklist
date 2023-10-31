const express = require("express");
const Book = require("./models/book");
const { connectToDB } = require("./db/db");

const app = express();
app.use(express.json());
connectToDB();

//for adding books
app.post("/books", async (req, res) => {
  try {
    const { title, author, summary } = req.body;
    if (!title || !author || !summary) {
      throw new Error("All fields are required");
    }

    const newBook = await Book.create({ title, author, summary });
    res.status(200).json({ message: "Book added Successfully", data: newBook });
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.title === 1
    ) {
      // Handling duplicate key error for the 'title' field as 'title' is the unique field
      res.status(400).json({ status: 0, message: "This Book already exists." });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

//for getting book list
app.get("/books", async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.status(200).json(allBooks);
  } catch (error) {
    onsole.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//for getting book by its id
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//for getting updating book by its id
app.put("/books/:id", async (req, res) => {
  try {
    const { title, author, summary } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        summary,
      },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//for deleting book by its id
app.delete("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;

    // Check if the book exists before deletion
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Book exists, proceed with deletion
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete the book" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
