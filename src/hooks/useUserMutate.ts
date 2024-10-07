import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { signUpForm } from "../pages/auth/sign-up";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

const submit = async (data: signUpForm) => {
  return await axios.post(API_URL + "/users", data);
};

export function useUserMutate() {
  const navigate = useNavigate();

  const mutate = useMutation({
    mutationFn: submit,
    onSuccess: () => {
      toast.success("Usuário criado com sucesso!");
      navigate("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            toast.error("Usuário já cadastrado!");
          } else {
            toast.error("Erro ao criar usuário!");
          }
        } else {
          toast.error("Erro interno!");
        }
      }
    },
  });

  return mutate;
}
