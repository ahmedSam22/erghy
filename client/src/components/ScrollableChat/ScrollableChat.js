import { Avatar, Tooltip } from '@chakra-ui/react'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../Config/ChatLogics'
import { ChatState } from '../../context/chatProvider'

export const ScrollableChat = ({messages}) => {

    const {user} = ChatState()
  return (
    <ScrollableFeed>
        
        {messages && messages.map((m , i) =>(
            <div style={{display : "flex"}} key={m._id}>
{

(isSameSender(messages , m , i , user._id) || isLastMessage(messages , i , user._id)) && (
    <Tooltip
    label={m.sender.name}
    placement="bottom-start"
    hasArrow
    >
        <Avatar
        mt={"7pd"}
        mr={"1"}
        size={"sm"}
        cursor={"pointer"}
        name={m.sender.name}
        src={m.sender.pic}
        />
    </Tooltip>
)}      


    <span
    style={{backgroundColor : `${m.sender._id === user._id ? '#bee3f8':'#b9f5d0'}`,
    borderRadius:"20px",
    padding:"5px 15px",
    marginLeft: isSameSenderMargin(messages , m , i , user._id),
    marginTop: isSameUser(messages , m , i , user._id) ? "3px" : "px",
maxWidth:"75%"}}


    >

        {m.content}
        </span>      </div>
        ))}
    </ScrollableFeed>
  )
}
