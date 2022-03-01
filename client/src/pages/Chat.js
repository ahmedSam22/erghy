import { useEffect } from "react";
import axios from 'axios'

function Chat() {

    const fetchChats = async () =>{
        const data = await axios.get("http://localhost:5000/api/chat");

        console.log(data);
    }

    useEffect(()=>{
        fetchChats()
    },[])
  return (
    <div className="App">
      chattttttttttttttttttttttttttttttt
    </div>
  );
}

export default Chat;
