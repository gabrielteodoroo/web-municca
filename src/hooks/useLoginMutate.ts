import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { signInForm } from "../pages/auth/sign-in";

const API_URL = "http://localhost:3000";

const submit = async (data: signInForm) => {
  return await axios.post(API_URL + "/login", data);
};

export function useLoginMutate() {
  const navigate = useNavigate();

  const mutate = useMutation({
    mutationFn: submit,
    onSuccess: (data) => {
      toast.success("Usuário autenticado com sucesso!");
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("userId", data.data.user.id);
      navigate("/dashboard");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error("Email ou nome inválido");
          } else {
            toast.error("Erro ao tentar fazer o login!");
          }
        } else {
          toast.error("Erro interno!");
        }
      }
    },
  });

  return mutate;
}
