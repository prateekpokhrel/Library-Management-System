import api from "./api";

export const getAllBooks = async () => {
  const response = await api.get("/books");
  return response.data;
};

export const getBookById = async (id) => {
  const response = await api.get(`/books/id/${id}`);
  return response.data;
};

// Updated addBook method to handle multipart/form-data
export const addBook = async (formData) => {
  const response = await api.post("/books", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateBook = async (id, bookData) => {
  const response = await api.put(`/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  await api.delete(`/books/${id}`);
};

export const searchBooks = async (keyword) => {
  const response = await api.get(`/books/search?keyword=${keyword}`);
  return response.data;
};

export const borrowBook = async (userId, bookId) => {
  const response = await api.post("/borrow", {
    userId,
    bookId,
  });
  return response.data;
};

export const getAllPdfBooks = async () => {
  const response = await api.get("/books");
  return response.data.filter(
      (book) => book.pdfFile && book.pdfFile.trim() !== ""
  );
};

export const getBooksByCategory = async (categoryId) => {
  const response = await api.get(`/books/category/${categoryId}`);
  return response.data;
};

export const getRecommendedBooks = async () => {
  const response = await api.get("/books");
  return response.data;
};