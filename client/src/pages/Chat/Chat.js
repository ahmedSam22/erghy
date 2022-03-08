import { Box } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import ChatBox from "../../components/ChatBox/ChatBox";
import MyChat from "../../components/MyChat/MyChat";
import SideBar from "../../components/shared/SideBar/SideBar";
import { ChatState } from "../../context/chatProvider";
import './Chat.css';



function Chat() {
  const {user} = ChatState()
  const test = localStorage.getItem("token");
  const history = useHistory()
  if(!test){
    history.push("/")
  }

  return (
    <div className="main">   
      {user && <SideBar />}
      <Box
      d="flex"
      justifyContent={"space-between"}
      w="100%"
      h={"91.5vh"}
      p="10px"
      >
      {user && <MyChat />}
      {user && <ChatBox />}
      </Box>
      <div>

      </div>
    </div>
  );
}

export default Chat;
