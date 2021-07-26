import React from 'react'
import { Stack, HStack, VStack, Box, Button } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Flex, Spacer } from "@chakra-ui/react"
import { useHistory, useLocation } from 'react-router-dom'

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
    console.log(username)

    return (
        <HStack spacing="24px" width="100%" border="2px solid black" >

            <Box >
                <Heading>DevTalk</Heading>

            </Box>
            <Spacer />
            <HStack>
                <Button>Profile</Button>
                <Spacer width="10px" />
                <Button onClick = {handleSignOut}>Log Out</Button>
            </HStack>
        </HStack>
    )
}
