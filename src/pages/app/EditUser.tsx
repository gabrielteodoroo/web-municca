import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useUserEditMutate } from "../../hooks/useUserEditMutate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";

const editUserForm = z.object({
  email: z.string().email({ message: "Email inválido" }),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
});

export type editUserForm = z.infer<typeof editUserForm>;

export function EditUser() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { mutate } = useUserEditMutate();
  const { data } = useUser(userId!);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<editUserForm>({
    resolver: zodResolver(editUserForm),
    reValidateMode: "onBlur",
  });

  async function handleEditUser(data: editUserForm) {
    if (userId) {
      mutate({ userId, data });
    }
  }

  useEffect(() => {
    if (!data) return;
    setValue("name", data?.name);
    setValue("email", data?.email);
  }, [data]);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box
        p={8}
        maxWidth="400px"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        background={"#ffff"}
      >
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Editar Usuário
        </Heading>
        <form onSubmit={handleSubmit(handleEditUser)} noValidate>
          <Stack spacing={4}>
            <FormControl id="name" isRequired isInvalid={!!errors.name}>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                placeholder="Digite seu nome"
                {...register("name")}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="email" isRequired isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Digite seu email"
                {...register("email")}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              disabled={isSubmitting}
              colorScheme="teal"
              width="full"
            >
              Atualizar Usuário
            </Button>
            <Text
              _hover={{ color: "#2C7A7B" }}
              cursor={"pointer"}
              fontSize={"sm"}
              onClick={() => navigate("/")}
            >
              Cancelar
            </Text>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}
