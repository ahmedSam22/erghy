import { useDisclosure,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text
   } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'

import React from 'react'

const ProfileModal = ({user , children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    {
      children? <span onClick={onOpen}>{children}</span> : <IconButton
        d={{base :"flex"}}
        icon={<ViewIcon />}
        onClick={onOpen}
      />
    }

<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize={"40px"}
          fontFamily={"Work Sans"}
          d="flex"
          justifyContent={"center"}
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Image 
            src={user.pic}
            borderRadius="full"
            boxSize={"150px"}
            alt={user.name}
            margin="auto"
          />
          <Text
            align={"center"}
            fontSize="25px"
            py={"5"}
          >
            Email : {user.email}
          </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal