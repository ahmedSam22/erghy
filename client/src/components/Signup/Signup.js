import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ViewIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const showPassword = () => setShow(!show);
  const showConfirmationPassword = () => setShowConfirm(!showConfirm);

  const submitHandler = () => {
    if (!name || !email || !password || !confirmPassword) {
      return toast({
        title: "please enter your full data",
        status: "danger",
        duration: 4000,
        isClosable: true,
      });
    } else {
      console.log({ name, email, password,pic });
      axios
        .post("http://localhost:5000/user", {
          name,
          email,
          password,
          pic,
        })
        .then(function (response) {
          console.log(response);
          loginSubmit(name, password);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const loginSubmit = (name, password) => {
    axios
      .post("http://localhost:5000/login", {
        name,
        password,
      })
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "userCheck",
          JSON.stringify(response.data.userCheck)
        );
        setTimeout(() => {
          history.push("/chat");
        }, 1000);
        toast({
          title: "login success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //   const postDetails = (pics) => {
  //     setLoading(true);
  //     if (pics.type === "image/jpeg" || pics.type === "image/png") {
  //       const data = new FormData();
  //       data.append("file", pics);
  //       data.append("upload_present", "erghy_app");
  //       data.append("cloud_name", "erghy");
  //       fetch("https://api.cloudinary.com/v1_1/erghy/image/upload", {
  //         method: "post",
  //         body: data,
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setPic(data.url.toString());
  //           console.log(data.url.toString());
  //           setLoading(false);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           setLoading(false);
  //         });
  //     }

  //   };

  return (
    <VStack spacing="5px">
      <FormControl isRequired id="name">
        <FormLabel>Name</FormLabel>
        <Input
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>
      <FormControl isRequired id="email">
        <FormLabel>email</FormLabel>
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>

      <FormControl isRequired id="password">
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement>
            <IconButton
              colorScheme="teal"
              aria-label="Call Segun"
              size="md"
              icon={<ViewIcon />}
              onClick={showPassword}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired id="confirmPassword">
        <FormLabel>confirm password</FormLabel>
        <InputGroup>
          <Input
            type={showConfirm ? "text" : "password"}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <InputRightElement>
            <IconButton
              colorScheme="teal"
              aria-label="Call Segun"
              size="md"
              icon={<ViewIcon />}
              onClick={showConfirmationPassword}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => {
            setPic(e.target.files[0]);
            console.log(typeof(e.target.files[0]),"kk");
          }}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up!
      </Button>
    </VStack>
  );
};

export default Signup;
