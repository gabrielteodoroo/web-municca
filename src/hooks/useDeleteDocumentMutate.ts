import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const API_URL = "http://localhost:3000";

const submit = async (documentId: string) => {
  const token = localStorage.getItem("token");
  return await axios.delete(API_URL + `/documents/${documentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export function useDeleteDocumentMutate() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: submit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Documento deletado com sucesso!");
    },
  });

  return mutate;
}
