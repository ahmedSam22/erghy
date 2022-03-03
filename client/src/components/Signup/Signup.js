import { FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement, VStack,Button ,useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ViewIcon } from '@chakra-ui/icons'
import axios from "axios";


const Signup = () => {
    const [show, setShow] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [password, setPassword] = useState()
    const [pic, setPic] = useState()
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const showPassword = ()=> setShow(!show)
    const showConfirmationPassword = ()=> setShowConfirm(!showConfirm)
 
    const submitHandler = ()=>{
        if(!name || !email || !password || !confirmPassword){
           return toast({
                    title: 'please enter your full data',
                    status: 'danger',
                    duration: 4000,
                    isClosable: true,
                  });
                  
        }else{
            console.log({name , email , password});
            axios.post('http://localhost:5000/api/user', {
                name , email , password
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

        }
    }
  
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
                            size='md'
                            icon={<ViewIcon />}
                           onClick={showPassword}
                        />
                         
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl isRequired id="confirmPassword">
                <FormLabel>confirm password</FormLabel>
                <InputGroup>
                    <Input type={showConfirm ? "text" : "password"} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    <InputRightElement>
                        <IconButton
                            colorScheme='teal'
                            aria-label='Call Segun'
                            size='md'
                            icon={<ViewIcon />}
                           onClick={showConfirmationPassword}

                          
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
                onChange={(e) => { setPic(e.target.value) }}
                 />
            </FormControl>

            <Button
            colorScheme='blue'
            width="100%"
            style={{marginTop : 15}}
            onClick={submitHandler}
            isLoading={loading}
            >
               Sign Up! 
            </Button>
        </VStack>
    )
}

export default Signup