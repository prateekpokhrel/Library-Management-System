import api from "./api";

export const getUserDashboard = async (userId) => {
    const response = await api.get(
        `/users/dashboard/${userId}`
    );

    return response.data;
};

export const getUserProfile = async (userId) => {
    const response = await api.get(
        `/users/${userId}`
    );

    return response.data;
};