import { useState, useEffect } from "react";
import axios from "axios";
import "../css/main.css";

const Main = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publishedYear: "",
    genre: "",
  });

  const [editingBook, setEditingBook] = useState(null); // Stores book being edited

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/books");
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const addBook = async () => {
    try {
      await axios.post("http://localhost:8080/api/books", newBook);
      fetchBooks();
      setNewBook({ title: "", author: "", publishedYear: "", genre: "" });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const startEditing = (book) => {
    setEditingBook(book);
    setNewBook({
      title: book.title,
      author: book.author,
      publishedYear: book.publishedYear,
      genre: book.genre,
    });
  };

  const updateBook = async () => {
    try {
      if (!editingBook) return;

      await axios.put(
        `http://localhost:8080/api/books/${editingBook._id}`,
        newBook
      );
      fetchBooks();
      setNewBook({ title: "", author: "", publishedYear: "", genre: "" });
      setEditingBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="main_container">
      <nav className="navbar">
        <h1>ONLINE BOOK STORE</h1>
        <button className="white_btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="create_book">
        <h2>{editingBook ? "Edit Book" : "Add a New Book"}</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newBook.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newBook.author}
          onChange={handleChange}
        />
        <input
          type="number"
          name="publishedYear"
          placeholder="Published Year"
          value={newBook.publishedYear}
          onChange={handleChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={newBook.genre}
          onChange={handleChange}
        />
        {editingBook ? (
          <button className="update_btn" onClick={updateBook}>
            Update Book
          </button>
        ) : (
          <button className="add_btn" onClick={addBook}>
            Add Book
          </button>
        )}
      </div>

      <div className="book_list">
        <h2>Available Books</h2>
        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          books.map((book) => (
            <div key={book._id} className="book_card">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Year: {book.publishedYear}</p>
              <p>Genre: {book.genre}</p>
              <button className="edit_btn" onClick={() => startEditing(book)}>
                Edit
              </button>
              <button
                className="delete_btn"
                onClick={() => deleteBook(book._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Main;
