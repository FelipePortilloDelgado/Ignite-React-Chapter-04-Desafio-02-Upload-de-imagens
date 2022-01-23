import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} size="6xl" onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="pGray.800" w="auto" h="min-content">
        <ModalBody p="0">
          <Image
            borderTopRadius="5px"
            src={imgUrl}
            alt="Imagem"
            maxW="900px"
            maxH="600px"
          />
        </ModalBody>
        <ModalFooter p="5px" fontSize="14px">
          <Link target="_blank" href={imgUrl}>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
