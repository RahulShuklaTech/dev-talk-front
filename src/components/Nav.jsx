import React from 'react'
import {  HStack, Box, Button } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Spacer } from "@chakra-ui/react"
import { useHistory } from 'react-router-dom'

export const Nav = () => {
    const history = useHistory();
    const username = localStorage.getItem('username');

    const handleSignOut = async () => {
        const url = 'https://dev-talks-1.herokuapp.com/auth/logout';
        const response = await fetch(url, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({"username": username})
        })
        if (response.status === 200) {
            history.push("/")
            let token = localStorage.getItem("token")
            if(token) localStorage.removeItem("token")
            let refreshToken = localStorage.getItem("refreshToken")
            if(refreshToken) localStorage.removeItem("refreshToken")
            localStorage.removeItem("username")
            localStorage.removeItem("userId")
        }else{
            alert(response)
        }

    }

    const handleProfile = async () => { 
        history.push({
            pathname: "/profile/",
            state: {username}
        })
        
    }

    return (
        <HStack spacing="24px" width="100%" marginY = {1}>

            <Box onClick = {() => history.goBack()} >
                <Heading  color = "twitter.500" cursor="pointer">DevTalk</Heading>

            </Box>
            <Spacer />
            <HStack>
                <Button colorScheme = "blue" onClick = {handleProfile}>Profile</Button>
                <Spacer width="10px" />
                <Button colorScheme = "red" onClick = {handleSignOut}>Log Out</Button>
            </HStack>
        </HStack>
    )
}
