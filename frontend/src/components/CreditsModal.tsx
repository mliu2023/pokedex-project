import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Text, VStack } from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreditsModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VStack p={10} spacing={2}>
            <Text>Thanks to Fullstack@Brown for running the bootcamp!</Text>
            </VStack>
          </ModalBody>
        </ModalContent>
    </Modal>
  );
};

export default CreditsModal;
