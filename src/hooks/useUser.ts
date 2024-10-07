import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserData } from "../interfaces/user-data";

const API_URL = "http://localhost:3000";

const getUserById = async (userId: string): Promise<UserData> => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export function useUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
}
