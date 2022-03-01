import { useEffect, useState } from "react";
import axios from 'axios'

function Chat() {
  const [chat,setChat] = useState([])

    const fetchChats = async () =>{
        const { data } = await axios.get("http://localhost:5000/api/chat");
        setChat(data);
    }


    useEffect(()=>{
        fetchChats()
    },[])
  return (
    <div className="">   
      chattt
      <div>
        {chat.map((e)=>{
         return <div key={e._id}> {e.chatName} </div>
        })}
      </div>
    </div>
  );
}

export default Chat;
