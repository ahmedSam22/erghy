import { Box, IconButton, Text, Spinner, FormControl, Input, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/chatProvider'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderProfile } from '../../Config/ChatLogics'
import ProfileModal from '../shared/Profile/ProfileModal'
import UpdateModal from '../UpdateGroupModal/UpdateModal'
import axios from 'axios'
import io from 'socket.io-client'
import './singleChat.css'
import { ScrollableChat } from '../ScrollableChat/ScrollableChat'
import Lottie from 'react-lottie'
import animationData from '../../animation/typing.json';
const ENDPOINT = "http://localhost:5000"
var socket, selectedChatCompare;


const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, header, notification, setNotification } = ChatState()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [socketConnected, setSocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const toast = useToast()



  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true))
    socket.on("typing", () => setIsTyping(true))
    socket.on("stop typing", () => setIsTyping(false))

  }, [])

  useEffect(() => {
    fetchMessages()
    selectedChatCompare = selectedChat
  }, [selectedChat])

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification])
          setFetchAgain(!fetchAgain)
        }
      } else {
        setMessages([...messages, newMessageRecieved])
      }
    })
  })



  const sendMessage = async (event) => {

    if (event.key === "Enter" && newMessage) {
      socket.emit('stop typing', selectedChat._id)
      try {
        setNewMessage("")
        const { data } = await axios.post(`http://localhost:5000/message`, {
          content: newMessage,
          chatId: selectedChat._id
        }, header)
        socket.emit('new message', data)
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

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true)
      socket.emit("typing", selectedChat._id)
    }
    let lastTypingTime = new Date().getTime()
    var timerLength = 1500
    setTimeout(() => {
      var timerNow = new Date().getTime();
      var timerDiff = timerNow - lastTypingTime;

      if (timerDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id)
        setTyping(false)
      }

    }, timerLength);

  }

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true)
      const id = selectedChat._id
      const { data } = await axios.get(`http://localhost:5000/message/${id}`, header)
      setMessages(data)
      setLoading(false)
      socket.emit('join chat', selectedChat._id)
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
            {isTyping ? (
              <div>
                <Lottie
                  options={defaultOptions}
                  // height={50}
                  width={70}
                  style={{ marginBottom: 10, marginLeft: 0 }}
                />
              </div>

            ) : ''}
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