import api from "./api";

export const getAllBorrowRecords = async () => {
    const response = await api.get("/borrow");
    return response.data;
};

export const getMyBorrowedBooks = async (userId) => {
    const response = await api.get(
        `/borrow/history/${userId}`
    );

    return response.data;
};

export const returnBook = async (borrowId) => {
    const response = await api.put(
        `/borrow/return/${borrowId}`
    );

    return response.data;
};