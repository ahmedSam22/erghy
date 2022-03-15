import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { ChatState } from '../../context/chatProvider'
import UserListItem from '../UserListItem/UserListItem'
import UserBadgeItem from '../shared/UserBadgeItem/UserBadgeItem'
import ChatLoading from '../ChatLoading/ChatLoading'

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [groupName, setGroupName] = useState()
  const [members, setMembers] = useState([])
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState()

  const toast = useToast()

  const { chats,setChats,header } = ChatState()

  const handleSearch = async (query) => {
    setSearch(query)
    if (!query) {
      return;
    }
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:5000/user?search=${search}`, header)
      setSearchResult(data)
      setLoading(false)

    } catch (error) {
      toast({
        title: 'failed to load users',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "bottom-left"
      });
    }

  }
  const handleGroup = (userToAdd) => {
    if (members.includes(userToAdd)) {
      toast({
        title: 'user is already added !',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
      return;
    } else {
      setMembers([...members, userToAdd])
      console.log(members);
    }
  }
  const handleDelete = (delUser) => {
    setMembers(members.filter(sel => sel._id != delUser._id))

  }

  const handleSubmit = async () => {
    if(members.length < 3){
      return;
    }

    try {
      setLoading(true)
      const { data } = await axios.post(`http://localhost:5000/chat/group`, {
        name : groupName,
        users : JSON.stringify(members.map((i)=>i._id)),
      },header)
      setLoading(false)
      setChats([data , ...chats])
      onClose()
      toast({
        title: 'Group Created successfully !',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });

    } catch (error) {
      toast({
        title: 'failed to create group',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "bottom-left"
      });
    }

  }
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily={"Work Sans"}
            d="flex"
            justifyContent={"center"}
          >create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir={"column"}
            alignItems={"center"}
          >
            <FormControl>
              <Input
                placeholder='Chat Name'
                mb={"3"}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder='Add member'
                mb={"1"}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>


            <Box d="flex" w={"100%"} flexWrap={"wrap"} >
              {members.map(u => (
                <UserBadgeItem key={u._id} user={u} handleFunction={() => handleDelete(u)} />
              ))}
            </Box>

            {loading ? <div>Loading...


            </div> : searchResult?.splice(0,4).map(user => (
              <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />
            ))
            }
            {/* here */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={handleSubmit} isLoading={loading}>
              Create !
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal