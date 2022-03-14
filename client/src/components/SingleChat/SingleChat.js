import React from 'react'
import { ChatState } from '../../context/chatProvider'

const SingleChat = ({fetchAgain , setFetchAgain}) => {
const [user,selectedChat , setSelectedChat] = ChatState()


  return (
    <div>SingleChat</div>
  )
}

export default SingleChat