import { Avatar, Box,Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({user , handleFunction}) => {
  return (
    <Box
    onClick={handleFunction}
    cursor="pointer"
    bg={"#e8e8e8"}
    _hover={{
        background:"#3882ac",
        color :"white"


    }}
    w="100%"
    d="flex"
    alignItems={"center"}
    color={"blac"}
    px={"3"}
    py={"2"}
    mb={"2"}
    borderRadius={"lg"}
    >
        <Avatar
        // src={user.pic}
        name={user.name}
        mr={"2"}
        />

        <Box>
              <Text>
            {user.name}
        </Text>
        <Text fontSize={"xs"}>
        {user.email}
        </Text>
        </Box>
      
        

    </Box>
  )
}

export default UserListItem