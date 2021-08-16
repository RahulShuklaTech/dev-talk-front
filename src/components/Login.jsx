import React, { useState } from 'react'
import { VStack, StackDivider, Container, Button, Text, InputGroup, InputRightElement } from "@chakra-ui/react"
import { ViewIcon,ViewOffIcon } from '@chakra-ui/icons'
import { Heading } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import {
    FormControl,
    FormLabel,

} from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"


import { Input } from "@chakra-ui/react"
import { Link, useHistory } from 'react-router-dom'



export const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);


    const history = useHistory();
    const loginUrl = 'https://dev-talks-1.herokuapp.com/auth/login';
    //"http://localhost:7524/auth/login"
    //'https://dev-talks-1.herokuapp.com/auth/login';


    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        let formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        let response = await fetch(loginUrl, {
            method: 'POST',
            body: formData,
        })

        if (response.status !== 201) {
            setErrorMessage("Invalid username or password");
            setLoading(false);
            return;
        }
        setErrorMessage('');
        let json = await response.json();

        localStorage.setItem('token', json.token);
        localStorage.setItem('refreshToken', json.refreshToken);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', json.userId);

        setLoading(false);
        history.push({
            pathname: '/feed',
            state: { username, userId: json.userId }
        })

    }


    const handleClick = () => setShow(!show)

    return (
        <Container minW="90rem" minH="100vh" centerContent display="flex" justifyContent="center"  >

            <Box display="flex" my={5} style={{ gap: "0rem" }}>
                <Image
                    src="loginImage.jpg"
                    alt="banner"
                    mr = {5}
                    
                />


                <form onSubmit={handleSubmit}  >
                    <VStack
                        divider={<StackDivider borderColor="gray.200" />}
                        spacing={2}
                        align="center"

                        backgroundColor="#AFD5E3"
                        padding="2rem"
                        borderRadius="6px"
                        minW="20rem"

                    >
                        <Heading as="h2" size="lg" marginBottom="2rem">
                            DevTalk Login
                        </Heading>

                        <Box bg="white" w="100%" py={3} px={5} marginY={4} color="black">

                            <FormControl id="username">
                                <FormLabel>Username</FormLabel>
                                <Input type="text"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    autoComplete="off"
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={show ? "text" : "password"}
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        autoComplete="off"
                                    />
                                    <InputRightElement width="1rem" pr = {3}>
                                        
                                            {show ? <ViewOffIcon cursor= "pointer" onClick={handleClick}/> : <ViewIcon cursor = "pointer" onClick={handleClick}/>}
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                        </Box>
                        <Button type="submit" color="primary" disabled={loading}>
                            Login
                        </Button>

                        <Text fontSize="md">Dont have an account <Link to="/signup"><Text color="twitter.500" as="span">Sign Up</Text></Link></Text>
                        <Box color="red" p={3}>{errorMessage}</Box>
                    </VStack>
                </form >
            </Box>
        </Container>
    )
}
