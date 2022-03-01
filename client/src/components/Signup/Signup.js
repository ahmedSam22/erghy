import { FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement, VStack,Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ViewIcon } from '@chakra-ui/icons'

const Signup = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [password, setPassword] = useState()
    const [pic, setPic] = useState()

    const showPassword = ()=> setShow(!show)
    const postDetails = (pics)=>{}
    const submitHandler = ()=>{}
  
    return (
        <VStack spacing="5px">
            <FormControl isRequired id="name">
                <FormLabel>Name</FormLabel>
                <Input onChange={(e) => { setName(e.target.value) }} />
            </FormControl>

            <FormControl isRequired id="email">
                <FormLabel>email</FormLabel>
                <Input onChange={(e) => { setEmail(e.target.value) }} />
            </FormControl>

            <FormControl isRequired id="password">
                <FormLabel>password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "password"} onChange={(e) => { setPassword(e.target.value) }} />
                    <InputRightElement>
                        <IconButton
                            colorScheme='teal'
                            aria-label='Call Segun'
                            size='lg'
                            icon={<ViewIcon />}
                           onClick={showPassword}
                        />
                         
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl isRequired id="confirmPassword">
                <FormLabel>confirm password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "password"} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    <InputRightElement>
                        <IconButton
                            colorScheme='teal'
                            aria-label='Call Segun'
                            size='lg'
                            icon={<ViewIcon />}
                          
                        />
                         
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl  id="pic">
                <FormLabel>Upload your picture</FormLabel>
                <Input
                type={"file"}
                padding={1}
                accept="image/"
                onChange={(e) => { setEmail(e.target.value) }} />
            </FormControl>

            <Button
            colorScheme='blue'
            width="100%"
            style={{marginTop : 15}}
            onClick={submitHandler}
            >
               Sign Up! 
            </Button>
        </VStack>
    )
}

export default Signup