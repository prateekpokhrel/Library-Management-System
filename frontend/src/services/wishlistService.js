import api from "./api";

export const getWishlist = async (userId) => {
    try {
        const response = await api.get(
            `/wishlist/${userId}`
        );

        return response.data;
    } catch (error) {
        console.error(
            "Failed to fetch wishlist:",
            error.response?.data || error.message
        );
        throw error;
    }
};

export const addToWishlist = async (
    userId,
    bookId
) => {
    try {
        const response = await api.post(
            `/wishlist/${userId}/${bookId}`
        );

        return response.data;
    } catch (error) {
        console.error(
            "Failed to add to wishlist:",
            error.response?.data || error.message
        );
        throw error;
    }
};

export const removeFromWishlist = async (
    userId,
    bookId
) => {
    try {
        const response = await api.delete(
            `/wishlist/${userId}/${bookId}`
        );

        return response.data;
    } catch (error) {
        console.error(
            "Failed to remove from wishlist:",
            error.response?.data || error.message
        );
        throw error;
    }
};