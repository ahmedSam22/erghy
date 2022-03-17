import { Box, IconButton, Text, Spinner, FormControl, Input, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/chatProvider'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderProfile } from '../../Config/ChatLogics'
import ProfileModal from '../shared/Profile/ProfileModal'
import UpdateModal from '../UpdateGroupModal/UpdateModal'
import axios from 'axios'
import './singleChat.css'
import { ScrollableChat } from '../ScrollableChat/ScrollableChat'




const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, header } = ChatState()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const toast = useToast()

  useEffect(() => {
    fetchMessages()
  }, [selectedChat,setNewMessage])


  const sendMessage = async (event) => {

    if (event.key === "Enter" && newMessage) {
      try {
        setNewMessage("")
        const { data } = await axios.post(`http://localhost:5000/message`, {
          content: newMessage,
          chatId: selectedChat._id
        }, header)
        setMessages([...messages, data])
      } catch (error) {
        toast({
          title: 'failed to send Message',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: "bottom-left"
        });
      }
    }

  }
  const typingHandler = async (e) => {
    setNewMessage(e.target.value)

  }

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true)
      const id = selectedChat._id
      const { data } = await axios.get(`http://localhost:5000/message/${id}`, header)
      setMessages(data)
      setLoading(false)
      console.log(messages);
    } catch (error) {
      toast({
        title: 'failed to send Message',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "bottom-left"
      });
      return;
    }
  }



  return (
    <Box d={"flex"} flexDir={"column"} h={"100%"}>

      {selectedChat ? (<>
        <Text
          d="flex"
          fontSize={{ base: "28px", md: "30px" }}
          pb={"3"}
          px={"2"}
          w={"100%"}
          fontFamily={"Work Sans"}
          justifyContent={{ base: "space-between" }}
          alignItems={"center"}
        >
          <IconButton
            d={{ base: "flex", md: "none" }}
            icon={<ArrowBackIcon />}
            onClick={() => setSelectedChat("")}
          />

          {selectedChat.isGroupChat ? (<>{selectedChat.chatName}
            <UpdateModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages} />
          </>) : (<>
            {getSender(user, selectedChat.users)}
            <ProfileModal user={getSenderProfile(user, selectedChat.users)} />
          </>)}
        </Text>

        <Box
          d="flex"
          flexDir={"column"}
          justifyContent={"flex-end"}
          p={"3"}
          w={"100%"}
          h={"100%"}
          bg={"#e8e8e8"}
          borderRadius="lg"
          overflowY={"hidden"}
        >
          {loading ? (
            <Spinner
              size={"xl"}
              w={"20"}
              h={"20"}
              alignItems={"center"}
              margin={"auto"}
            />

          ) : (<div className="chatStyle">
            <ScrollableChat messages={messages} />
          </div>)}
          <FormControl onKeyDown={sendMessage} isRequired mt={"3"}>
            <Input
              variant={"filled"}
              bg={"#e0e0e0"}
              placeholder="Enter the message"
              onChange={typingHandler}
              value={newMessage}
            />
          </FormControl>
        </Box>


      </>) : (

        <Box
          d={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}

        >
          <Text
            fontFamily={"Work Sans"}
            fontSize="3xl"
            pb={"3"}
          >
            click on a user to start chat
          </Text>
        </Box>
      )}


    </Box>
  )
}

export default SingleChat