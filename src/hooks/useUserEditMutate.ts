import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { editUserForm } from "../pages/app/EditUser";

const API_URL = "http://localhost:3000";

const submit = async ({
  userId,
  data,
}: {
  userId: string;
  data: editUserForm;
}) => {
  const token = localStorage.getItem("token");
  return await axios.put(API_URL + `/users/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export function useUserEditMutate() {
  const mutate = useMutation({
    mutationFn: (variables: { userId: string; data: editUserForm }) =>
      submit(variables),
    onSuccess: () => {
      toast.success("Usuário atualizado com sucesso!");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            toast.error("Erro ao atualizar usuário!");
          } else {
            toast.error("Erro ao atualizar usuário!");
          }
        } else {
          toast.error("Erro interno!");
        }
      }
    },
  });

  return mutate;
}
