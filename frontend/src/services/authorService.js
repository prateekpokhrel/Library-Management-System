import api from "./api";

export const getAllAuthors = async () => {
    const response = await api.get("/authors");
    return response.data;
};

export const addAuthor = async (authorName) => {
    const response = await api.post(
        "/authors",
        {
            authorName,
        }
    );

    return response.data;
};

export const updateAuthor = async (
    id,
    authorName
) => {

    const response = await api.put(
        `/authors/${id}`,
        {
            authorName,
        }
    );

    return response.data;
};

export const deleteAuthor = async (id) => {
    await api.delete(
        `/authors/${id}`
    );
};