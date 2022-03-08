import { createContext, useContext,useState ,useEffect } from "react";
import { useHistory} from 'react-router-dom';

const ChatContext = createContext()

const ChatProvider = ({children}) => {
    const [user, setUser] = useState()
    const [token, setToken] = useState()
    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState()
    const history = useHistory()
    
    useEffect(() => {
      const logedin =  localStorage.getItem("token") ;
      const userCheck = JSON.parse(localStorage.getItem("userCheck")) ;
      setUser(userCheck)
      setToken(logedin)

      if(!logedin){

        // history.push('/')
      }
    }, [history])
    
    return (
    <ChatContext.Provider value={{user, token,selectedChat, setSelectedChat,chats, setChats}}>
        {children}
        </ChatContext.Provider>);
}
export const ChatState =() => {
    return useContext(ChatContext)
}

export default ChatProvider;