import React, { useState } from 'react'
import { VStack, StackDivider, Container, Button, Text } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import {
    FormControl,
    FormLabel,
   
} from "@chakra-ui/react"

import { Input } from "@chakra-ui/react"
import { Link, useHistory } from 'react-router-dom'
import { Nav } from './Nav'



export const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const [loading, setLoading] = useState(false);
    const [username,setUsername] = useState('');   
    const [password,setPassword] = useState(''); 
    
    const history = useHistory();
    const loginUrl = 'http://localhost:3300/auth/login';


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

        if(response.status !== 201){
            console.log(response,"response")
            setErrorMessage("Invalid username or password");
            setLoading(false);
            return;
        }
        setErrorMessage('');
        let json = await response.json();

        localStorage.setItem('token', json.token);
        localStorage.setItem('refreshToken', json.refreshToken);

        console.log(json);
        
        setLoading(false);
        history.push({
            pathname: '/feed',
            state: {username}
        })

    }

    return (
        <Container maxW="container.xl"  centerContent marginTop="2rem" >
            <Heading as="h2" size="2xl">
                DevTalk
            </Heading>
           
            <form onSubmit={handleSubmit}  >
                <VStack
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={2}
                        align="center"
                        marginTop="2rem"
                        backgroundColor="lightgrey"
                        padding="2rem"
                        borderRadius="6px"
                >
                    <Heading as="h2" size="lg" marginBottom="2rem">
                        Login
                    </Heading>
                    <Box bg="white" w="100%" py={3} px = {5} marginY= {4} color="black">

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
                            <Input type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="off"
                            />
                        </FormControl>
                    </Box>
                    <Button type="submit" color="primary" >
                       Login
                    </Button>
                    
                    <Text fontSize="md">Dont have an account <Link to = "/signup"><Text color="twitter.500" as ="span">Sign Up</Text></Link></Text> 
                    <Box color="red" p={3}>{errorMessage}</Box>
                </VStack>
            </form >
        </Container>
    )
}
