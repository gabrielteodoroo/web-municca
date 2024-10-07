import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { EditDocumentFormData } from "../components/EditDocumentModal";

const API_URL = "http://localhost:3000";

const submit = async ({
  documentId,
  data,
}: {
  documentId: string;
  data: EditDocumentFormData;
}) => {
  const token = localStorage.getItem("token");
  return await axios.put(API_URL + `/documents/${documentId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export function useDocumentEditMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (variables: {
      documentId: string;
      data: EditDocumentFormData;
    }) => submit(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Documento atualizado com sucesso!");
    },
  });

  return mutate;
}
