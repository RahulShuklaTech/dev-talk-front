import { Box, Button,Text } from '@chakra-ui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'

export const Followers = ({suggestion,index,handleFollow}) => {

    const history = useHistory();
    const handleProfile = async () => {
        history.push({
            pathname: "/profile/"+suggestion.username,
            state: { username: suggestion.username }
        })

    }
    return (    
        <Box p={4} boxShadow="1px 1px 4px 1px lightgrey" borderRadius="10px" minW="15rem" maxW="30rem" my={2} bg="white">
            
            <Box onClick={handleProfile} cursor="pointer" display= "flex" marginY= "1" >
            <Text fontSize="md" color="twitter.500"  >@{suggestion.username}</Text>
            </Box>
            <Box display="flex" my={1}>
            <Text fontSize="small" color="gray.500" marginRight = {3} >Followers: {suggestion.followers.length}</Text>
            <Text fontSize="small" color="gray.500"  >Following: {suggestion.following.length}</Text>
            
            </Box>
            <Button colorScheme="blue" onClick = {(e)=> handleFollow(e,index)} >Follow</Button>
            
        </Box>
    )
}
