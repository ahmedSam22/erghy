import { Box,IconButton,Text } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../../context/chatProvider'
import { ArrowBackIcon} from '@chakra-ui/icons'
import { getSender, getSenderProfile } from '../../Config/ChatLogics'
import ProfileModal from '../shared/Profile/ProfileModal'
import UpdateModal from '../UpdateGroupModal/UpdateModal'




const SingleChat = ({fetchAgain , setFetchAgain}) => {
const {user,selectedChat,setSelectedChat} = ChatState()


  return (
    <div>
      
      {selectedChat ? (<>
          <Text
          d="flex"
          fontSize={{base : "28px" , md : "30px"}}
          pb={"3"}
          px={"2"}
          w={"100%"}
          fontFamily={"Work Sans"}
          justifyContent={{base : "space-between"}}
          alignItems={"center"}
          >
              <IconButton 
                d={{base : "flex" , md: "none"}}
                icon={<ArrowBackIcon />}
                onClick={()=> setSelectedChat("")}
              />

              {selectedChat.isGroupChat ? (<>{selectedChat.chatName}
              <UpdateModal  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}   />
              </>) : (<>
              {getSender(user,selectedChat.users)}
              <ProfileModal user={getSenderProfile(user,selectedChat.users)} />
              </>)}
          </Text>

          <Box
            d="flex"
            flexDir={"column"}
            justifyContent={"flex-end"}
            p={"3"}
            w={"100%"}
            bg={"#e8e8e8"}
            h={"100%"}
            borderRadius="lg"
            overflowY={"hidden"}
          >
            {/* chat here */}
          </Box>
      
      
      </>): (
        
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


    </div>
  )
}

export default SingleChat