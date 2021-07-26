import React from 'react'
import {  HStack, Box, Button } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Spacer } from "@chakra-ui/react"
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'

export const Nav = () => {
    const location = useLocation();
    const history = useHistory();
    const {username} = location.state

    const handleSignOut = async () => {
        const url = "http://localhost:3300/auth/logout"
        const response = await fetch(url, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({"username": username})
        })
        if (response.status === 200) {
            history.push("/")
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

            <Box >
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