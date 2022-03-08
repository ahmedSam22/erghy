import './Home.css';

import { Box, Container,Text,TabList,Tab,Tabs,TabPanels,TabPanel } from "@chakra-ui/react"
import Login from '../../components/Login/Login';
import Signup from '../../components/Signup/Signup';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
  const test = localStorage.getItem("token");
  const history = useHistory()
  if(test){
    history.push("/chat")
  }
    useEffect(() => {
      // const userInfo = JSON.parse(localStorage.getItem("token"));
      // console.log(userInfo);
      // if(userInfo){
      //     history.push("/chat")
      // }
    }, [history])

    
  return (
    <Container maxW="xl" centerContent>
       <Box
       d="flex"
       justifyContent="center"
       p={3}
       w="100%"
       m="40px 0 15px 0"
       borderRadius="lg"
       bg={"white"}
       >
         
         <Text fontSize={"4xl"} fontFamily={"work sans"} color={"black"}>erghy</Text>
       </Box>

       <Box
       d="flex"
       justifyContent="center"
       p={3}
       w="100%"
       m="40px 0 15px 0"
       borderRadius="lg"
       bg={"white"}
       >
         <Tabs variant='soft-rounded' colorScheme='green' w="100%">
  <TabList>
    <Tab width="50%">Login </Tab>
    <Tab width="50%">Sign Up!</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login />
    </TabPanel>
    <TabPanel>
      <Signup />
    </TabPanel>
  </TabPanels>
</Tabs>
       </Box>
    </Container>
  );
}

export default Home;
