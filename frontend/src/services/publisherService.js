// src/services/publisherService.js

import api from "./api";

export const getAllPublishers = async () => {
    const response = await api.get("/publishers");
    return response.data;
};

export const addPublisher = async (
    publisherName
) => {

    const response = await api.post(
        "/publishers",
        {
            publisherName,
        }
    );

    return response.data;
};

export const updatePublisher = async (
    id,
    publisherName
) => {

    const response = await api.put(
        `/publishers/${id}`,
        {
            publisherName,
        }
    );

    return response.data;
};

export const deletePublisher = async (
    id
) => {

    await api.delete(
        `/publishers/${id}`
    );
};