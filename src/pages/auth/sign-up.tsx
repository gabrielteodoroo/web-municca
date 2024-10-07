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
import { useUserMutate } from "../../hooks/useUserMutate";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpForm = z.object({
  email: z.string().email({ message: "Email inválido" }),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
});

export type signUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();
  const { mutate } = useUserMutate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<signUpForm>({
    resolver: zodResolver(signUpForm),
    reValidateMode: "onBlur",
  });

  async function handleSignUp(data: signUpForm) {
    mutate(data);
  }

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
          Criar Conta
        </Heading>
        <form onSubmit={handleSubmit(handleSignUp)} noValidate>
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
              Criar Conta
            </Button>
            <Text
              _hover={{ color: "#2C7A7B" }}
              cursor={"pointer"}
              fontSize={"sm"}
              onClick={() => navigate("/")}
            >
              Já possui conta? Efetuar login
            </Text>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}
