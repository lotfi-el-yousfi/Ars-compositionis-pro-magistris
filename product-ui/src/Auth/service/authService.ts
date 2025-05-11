import { UserProfile } from "../model/IUser";
import axios from "axios";

export const UpdateUser = async (user: UserProfile)
    : Promise<UserProfile> => {
    try {
        const response = await axios.put<UserProfile>("/user", user);
        return response.data;
    } catch (error) {
        throw new Error("Failed to update user profile. Please try again.");
    }
};
