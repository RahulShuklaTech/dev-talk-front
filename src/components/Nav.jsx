import React from 'react'
import {  HStack, Box, Button } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Spacer } from "@chakra-ui/react"
import { useHistory, useLocation } from 'react-router-dom'
// import axios from 'axios'

export const Nav = () => {
    const location = useLocation();
    const history = useHistory();
    const {username} = location.state

    const handleSignOut = async () => {
        const url = 'https://dev-talks-1.herokuapp.com/auth/signup';
        //"http://localhost:7524/auth/logout"
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



    console.log(username)

    return (
        <HStack spacing="24px" width="100%" marginY = {1}>

            <Box onClick = {() => history.goBack()} >
                <Heading>DevTalk</Heading>

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
