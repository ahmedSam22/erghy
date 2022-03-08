import { FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement, VStack,Button,useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ViewIcon } from '@chakra-ui/icons'
import { useHistory} from 'react-router-dom';
import axios from "axios"

const Login = () => {
    const history = useHistory();
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const showPassword = ()=> setShow(!show)
    const submitHandler = ()=>{
        setLoading(true)
        if(!email || !password){
            setLoading(false)
            return toast({
                title: 'please enter the data',
                status: 'warning',
                duration: 4000,
                isClosable: true,
              });
        }else{
            axios.post("http://localhost:5000/login",{
                email , password
            })
            .then(function (response) {
                localStorage.setItem("token", response.data.token);

                localStorage.setItem("userCheck", JSON.stringify(response.data.userCheck) );
                setTimeout(() => {
                    history.push('/chat')
                }, 1000);
                
              })
              .catch(function (error) {
                console.log(error);
              });
              toast({
                title: 'login success',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
        }
      console.log( localStorage.getItem("token"),"token catch");

    }
  
    return (
        <VStack spacing="5px">


            <FormControl isRequired >
                <FormLabel>email</FormLabel>
                <Input onChange={(e) => { setEmail(e.target.value) }} />
            </FormControl>

            <FormControl isRequired >
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


            <Button
            colorScheme='blue'
            width="100%"
            style={{marginTop : 15}}
            onClick={submitHandler}
            isLoading={loading}
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