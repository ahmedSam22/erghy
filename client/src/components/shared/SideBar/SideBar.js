import { Box, Button, Tooltip, Text, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerHeader, DrawerFooter, DrawerBody, Input, useToast, IconButton, Spinner } from '@chakra-ui/react'
import { ArrowBackIcon, BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { ChatState } from '../../../context/chatProvider'
import { useHistory } from 'react-router-dom';
import ProfileModal from '../Profile/ProfileModal';
import axios from "axios"
import ChatLoading from '../../ChatLoading/ChatLoading';
import UserListItem from '../../UserListItem/UserListItem';

const SideBar = () => {

  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const history = useHistory()
  const { user,setSelectedChat,token,selectedChat,chats,setChats,header } = ChatState()
  const toast = useToast()


  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'please enter any thing ',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: "top-left"
      });
      return;
    }
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:5000/user?search=${search}`, header)
      setLoading(false)
      setSearchResult(data)

    } catch (error) {
      toast({
        title: 'failed',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  }


  const accessChat = async (userId) =>{
    try {
      setLoadingChat(true)

      const { data } = await axios.post("http://localhost:5000/chat" , {userId} , header)
      
        // if(!chats.find((e) => e._id === data._id)) setChats([data ,...chats])
      setChats([data , ...chats])
      setSelectedChat(data)
      setLoadingChat(false)
      onClose()
      console.log(data);
    } catch (error) {
      toast({
        title: 'error fetching chat',
        description: error.message,
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: "bottom-left"
      });
    }
    
  }
  return (
    <>
      <Box
        d="flex"
        justifyContent={"space-between"}
        alighitems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth={"5px"}
      >

        <Tooltip
          label="search user to chat"
          hasArrow
          placement='bottom-end'
        >
          <Button variant={"ghost"} onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text
              d={{ base: "none", md: "flex" }}
              px="4"
            >Search User</Text>
          </Button>
        </Tooltip>
        <Text
          fontSize='2xl'
          fontFamily="Work Sans"
          fontWeight={"bold"}
        >
          Erghy
        </Text>
        <div>
          <Menu>
            <MenuButton p="1">
              <BellIcon fontSize="2xl" p={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>

          <Menu>
            <MenuButton as={Button} variant={"ghost"} rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />

            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem color={"red"} onClick={() => {
                localStorage.clear();
                history.push("/")
              }}>log out !</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1"}>
            <IconButton
            variant='outline'
              colorScheme='teal'
              fontSize={"2xl"}
              mr={"3"}
              onClick={onClose}
              icon={<ArrowBackIcon />}
            />
            Search users

          </DrawerHeader>

          <DrawerBody>
            <Box d="flex" pb={"2"}>
              <Input
                placeholder="search from here"
                mr={"2"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}
              isLoading={loading}
              >GO</Button>

            </Box>

            {loading ? (<ChatLoading />) : (
              searchResult?.map((user)=>(
              <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                  />
                  )
              )
            )}

            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>



      </Drawer>
    </>
  )
}

export default SideBar