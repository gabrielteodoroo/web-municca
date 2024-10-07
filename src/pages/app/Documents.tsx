import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";
import { useDocumentsList } from "../../hooks/useDocumentsList";
import AddDocumentModal from "../../components/AddDocumentModal";
import { useDocumentMutate } from "../../hooks/useDocumentMutate";
import { useEffect, useState } from "react";
import { useDeleteDocumentMutate } from "../../hooks/useDeleteDocumentMutate";
import EditDocumentModal from "../../components/EditDocumentModal";
import { useDocumentEditMutate } from "../../hooks/useDocumentEditMutate";
import { DocumentsData } from "../../interfaces/documents-data";

export function DocumentList() {
  const { data } = useDocumentsList();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentDocument, setCurrentDocument] = useState<DocumentsData>();
  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();
  const { mutate, isSuccess } = useDocumentMutate();
  const { mutate: mutateEdit } = useDocumentEditMutate();

  const { mutate: deleteDocument } = useDeleteDocumentMutate();

  useEffect(() => {
    onClose();
  }, [isSuccess]);

  return (
    <>
      <Flex direction="column" align="center" p={8}>
        <Box
          width="100%"
          maxW="900px"
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          boxShadow="lg"
        >
          <Heading as="h2" size="lg" mb={6} textAlign="center">
            Lista de Documentos
          </Heading>

          <Button colorScheme="teal" mb={4} onClick={onOpen}>
            Adicionar Documento
          </Button>

          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>Documentos cadastrados no sistema</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nome</Th>
                  <Th>Status</Th>
                  <Th isNumeric>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data &&
                  data.map((doc) => (
                    <Tr key={doc.id}>
                      <Td>{doc.id}</Td>
                      <Td>{doc.name}</Td>
                      <Td>
                        <Badge colorScheme={"teal"}>{doc.status}</Badge>
                      </Td>
                      <Td isNumeric>
                        <Button
                          colorScheme="teal"
                          size="sm"
                          mr={2}
                          onClick={() => {
                            onOpenEditModal();
                            setCurrentDocument(doc);
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={() => deleteDocument(doc.id)}
                        >
                          Excluir
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
      <AddDocumentModal
        isOpen={isOpen}
        onClose={onClose}
        onAddDocument={mutate}
      />
      <EditDocumentModal
        isOpen={isOpenEditModal}
        onClose={onCloseEditModal}
        onEditDocument={(data) => mutateEdit({ documentId: data.id, data })}
        documentData={currentDocument!}
      />
    </>
  );
}

export default DocumentList;
