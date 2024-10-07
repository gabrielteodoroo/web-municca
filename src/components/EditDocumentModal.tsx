import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const documentSchema = z.object({
  name: z.string().min(1, "Nome do documento é obrigatório."),
  status: z.enum(["Aprovado", "Pendente", "Rejeitado"], {
    errorMap: () => ({ message: "Selecione um status válido." }),
  }),
});

export type EditDocumentFormData = z.infer<typeof documentSchema>;

interface EditDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditDocument: (data: EditDocumentFormData & { id: string }) => void;
  documentData: { id: string; name: string; status: string } | null;
}

export const EditDocumentModal: React.FC<EditDocumentModalProps> = ({
  isOpen,
  onClose,
  onEditDocument,
  documentData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditDocumentFormData>({
    resolver: zodResolver(documentSchema),
  });

  const onFormSubmit = (data: EditDocumentFormData) => {
    onEditDocument({ ...data, id: documentData!.id });
    reset();
    onClose();
  };

  useEffect(() => {
    if (documentData) {
      reset({
        name: documentData.name,
        status: documentData.status as "Aprovado" | "Pendente" | "Rejeitado",
      });
    } else {
      reset();
    }
  }, [documentData, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <ModalHeader>Editar Documento</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.name} isRequired>
              <FormLabel>Nome do Documento</FormLabel>
              <Input placeholder="Digite o nome" {...register("name")} />
              {errors.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.status} isRequired>
              <FormLabel>Status</FormLabel>
              <Select placeholder="Selecione o status" {...register("status")}>
                <option value="Aprovado">Aprovado</option>
                <option value="Pendente">Pendente</option>
                <option value="Rejeitado">Rejeitado</option>
              </Select>
              {errors.status && (
                <FormErrorMessage>{errors.status.message}</FormErrorMessage>
              )}
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" type="submit">
            Atualizar
          </Button>
          <Button variant="ghost" onClick={onClose} ml={3}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditDocumentModal;
