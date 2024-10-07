import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DocumentFormData } from "../components/AddDocumentModal";

const API_URL = "http://localhost:3000";

const submit = async (data: DocumentFormData) => {
  const token = localStorage.getItem("token");
  return await axios.post(API_URL + "/documents", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export function useDocumentMutate() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: submit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Documento criado com sucesso!");
    },
  });

  return mutate;
}
