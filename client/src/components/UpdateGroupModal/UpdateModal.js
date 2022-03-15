import {
    useDisclosure,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,

    useToast,
    Box,
    FormControl,
    Input
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'

import React, { useState } from 'react'
import { ChatState } from '../../context/chatProvider'
import UserBadgeItem from '../shared/UserBadgeItem/UserBadgeItem'
import UserListItem from '../UserListItem/UserListItem'
import axios from 'axios'


const UpdateModal = ({ fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, selectedChat, setSelectedChat, header } = ChatState()
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState()
    const [members, setMembers] = useState([])

    const [groupName, setGroupName] = useState("")
    const [renameLoading, setRenameLoading] = useState(false)
    const toast = useToast()

    const handleDelete = async () => {
        try {
            setLoading(true)
            const {data} = await axios.put(`http://localhost:5000/chat/group/remove`,{
                chatId : selectedChat._id,
                userId : user._id
            },header)

            console.log(data);
            setSelectedChat(data)
            
            setFetchAgain(!fetchAgain)
            setLoading(false)
            onClose()

        } catch (error) {
            toast({
                title: 'no',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false)
        }


    }
    const handleGroupRemove = async (userId) => {
        if(user._id === userId._id){
            toast({
                title: 'you cant delete your self',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
            return ;
        }
        try {
            setLoading(true)
            const {data} = await axios.put(`http://localhost:5000/chat/group/remove`,{
                chatId : selectedChat._id,
                userId : userId._id
            },header)

            console.log(data);
            setSelectedChat(data)
            
            setFetchAgain(!fetchAgain)
            setLoading(false)


        } catch (error) {
            toast({
                title: 'no',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false)
        }


    }
    const handleRename = async () => {
        if (!groupName) {
            toast({
                title: 'Please enter the group name',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
            return ;
        }
        try {
            setRenameLoading(true)
            const { data } = await axios.put(`http://localhost:5000/chat/group`, {
                "chatId": selectedChat._id,
                "chatName": groupName
            }, header)

            setGroupName(data)
            console.log(data);
            setSelectedChat(data)
            
            setFetchAgain(!fetchAgain)
            setRenameLoading(false)
        } catch (error) {
            toast({
                title: 'no',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
            setRenameLoading(false)
        }
    }
    const handleAddUser = async (memberId) => { //i used memberId because user key is already used
        if (selectedChat.users.find((u) => u._id === memberId._id)) {
            toast({
                title: 'user is already added !',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
            return;
        }
if (selectedChat.isGroupAdmin._id !== user._id) {
            toast({
                title: 'you are not admin !',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
            return;
        }


        try {
            setLoading(true)
            const { data } = await axios.put(`http://localhost:5000/chat/group/add`, {
                "chatId": selectedChat._id,
                "userId": memberId._id
            }, header)

            console.log(data);
            setSelectedChat(data)
            
            setFetchAgain(!fetchAgain)
            setLoading(false)
        } catch (error) {
            toast({
                title: 'no',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false)
        }
    }
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


    return (
        <>


            <IconButton
                d={{ base: "flex" }}
                icon={<ViewIcon />}
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize={"35px"}
                        fontFamily={"Work Sans"}
                        d="flex"
                        justifyContent={"center"}
                    >
                        {selectedChat.chatName}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>


                        <Box
                            d="flex"
                            w={"100%"}
                            flexWrap={"wrap"}
                            pb={"3"}
                        >
                            {selectedChat.users.map(u => (
                                <UserBadgeItem key={u._id} user={u} handleFunction={() => handleGroupRemove(u)} />
                            ))}
                        </Box>

                        <FormControl d="flex">
                            <Input
                                placeholder={selectedChat.chatName}
                                mb={"3"}
                                onChange={(e) => setGroupName(e.target.value)}
                            />

                            <Button
                                variant={"solid"}
                                colorScheme={"teal"}
                                ml={"1"}
                                isLoading={renameLoading}
                                onClick={handleRename}
                            >Update !</Button>


                        </FormControl>

                        <FormControl d="flex">
                            <Input
                                placeholder='Add User'
                                mb={"3"}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>

                        {loading ? <div>Loading...


                        </div> : searchResult?.splice(0, 4).map(user => (
                            <UserListItem key={user._id} user={user} handleFunction={() => handleAddUser(user)} />
                        ))
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={handleDelete}>
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateModal