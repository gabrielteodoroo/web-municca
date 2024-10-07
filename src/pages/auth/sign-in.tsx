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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useLoginMutate } from "../../hooks/useLoginMutate";

const signInForm = z.object({
  email: z.string().email({ message: "Email inválido" }),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
});

export type signInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const navigate = useNavigate();
  const { mutate } = useLoginMutate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<signInForm>({
    resolver: zodResolver(signInForm),
    reValidateMode: "onBlur",
  });

  async function handleSignIn(data: signInForm) {
    mutate(data);
  }

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box
        p={8}
        maxWidth="400px"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        background={"#ffff"}
      >
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Login
        </Heading>
        <form onSubmit={handleSubmit(handleSignIn)} noValidate>
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
              Entrar
            </Button>
            <Text
              _hover={{ color: "#2C7A7B" }}
              cursor={"pointer"}
              fontSize={"sm"}
              onClick={() => navigate("/sign-up")}
            >
              Não possui conta? Cadastre-se
            </Text>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}
