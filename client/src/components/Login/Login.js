import { FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement, VStack,Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ViewIcon } from '@chakra-ui/icons'

const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const showPassword = ()=> setShow(!show)
    const postDetails = (pics)=>{}
    const submitHandler = ()=>{}
  
    return (
        <VStack spacing="5px">


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
                           onChange={(e) => postDetails(e.target.files[0])}
                        />
                         
                    </InputRightElement>
                </InputGroup>
            </FormControl>


            <Button
            colorScheme='blue'
            width="100%"
            style={{marginTop : 15}}
            onClick={submitHandler}
            >
               Login! 
            </Button>
            <Button
            colorScheme='red'
            width="100%"
            style={{marginTop : 15}}
            onClick={()=>{
                setEmail("guest@example.com");
                setPassword("123456")
            }}
            >
               Login as Guest! 
            </Button>
        </VStack>
    )
}

export default Login