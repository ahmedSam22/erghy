import { AddIcon } from '@chakra-ui/icons'
import { Box, useToast,Text, Button, Stack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getSender } from '../../Config/ChatLogics'
import { ChatState } from '../../context/chatProvider'
import ChatLoading from '../ChatLoading/ChatLoading'
import GroupChatModal from '../GroupChatModal/GroupChatModal'

const MyChat = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState()
  const [loading, setLoading] = useState()
  const { user,setSelectedChat,token,selectedChat,chats,setChats } = ChatState()
  const toast = useToast()



  const getChats = async () => {

    try {
      setLoading(true)
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      const { data } = await axios.get(`http://localhost:5000/chat`, config)
      setLoading(false)
      setChats(data)
      console.log(data);
      

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

useEffect(()=>{
  setLoggedUser(JSON.parse(localStorage.getItem("userCheck")))
  getChats()
},[fetchAgain])
  return (
   <Box
   d={{base : selectedChat ? "none" : "flex" , md:"flex"}}
   flexDir="column"
   alignItems={"center"}
   p="3"
   bg={"white"}
   w={{base : "100%" , md : "31%"}}
   borderRadius="lg"
   borderWidth={"1px"}
   overflow={"hidden"}
   >
     <Box 
     w="100%"
     d="flex"
     justifyContent={"space-between"}
     alignItems={"center"}
     >
       <Text>
         Chats
       </Text>
       <GroupChatModal>

       <Button
       d="flex"
       fontSize="1rem"
       rightIcon={<AddIcon />}
       >
New groupchat
       </Button>
       </GroupChatModal>

     </Box>
     <Box
     d="flex"
     p={"3"}
     flexDir={"column"}
     bg={"f8f8f8"}
     w="100%"
     h="100%"
     borderRadius={"lg"}
     
     
     >
       {chats? (
         <Stack 
  overflowY={"scroll"}
         >
            {chats.map((chat)=>(
<Box
onClick={()=> setSelectedChat(chat)}
  cursor={"pointer"}
  bg={selectedChat === chat ? "#3882ac" : "#e8e8e8"}
  color={selectedChat === chat ? "white" : "black"}
  px={"3"}
  py={"2"}
  borderRadius={"lg"}
  key={chat._id}
>
<Text>
  {!chat.isGroupChat ? getSender(loggedUser , chat.users) : chat.chatName}
</Text>
</Box>
       ))}
         </Stack>
       ) : (
         <ChatLoading />
       )}
     </Box>
   </Box>
  )
}

export default MyChat