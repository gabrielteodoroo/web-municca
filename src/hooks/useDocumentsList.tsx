import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DocumentsData } from "../interfaces/documents-data";

const API_URL = "http://localhost:3000";

const getDocuments = async (): Promise<DocumentsData[]> => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/documents`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export function useDocumentsList() {
  return useQuery({
    queryKey: ["documents"],
    queryFn: () => getDocuments(),
  });
}
