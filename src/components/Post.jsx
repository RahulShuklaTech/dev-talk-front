import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'
// import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
// import { Badge } from "@chakra-ui/react"
import axios from 'axios'

export const Post = ({ data,username,userId }) => {

    const likePhoto = "./thumbs-up.svg"
    const [postData, setPostData] = React.useState(data);
    // const [loading, setLoading] = React.useState(false); 
    let color = "twitter.500"
   
    const handleLike = async (post) => {
        const response = await axios.post("post/like",{postId: post})
        console.log(response.data)
        
    }

    return (
        <Box p={4} boxShadow="1px 1px 4px 1px lightgrey" borderRadius="10px" minW="15rem" maxW = "30rem" my = {5}>
            <Box>
                <Text fontSize="md" color="twitter.500">@{data.owner.username}</Text>
            </Box>
            <Box>
                <Text fontSize="2xl">{data.content}</Text>
                <Text fontSize="sm" color="gray.500">{`Posted on: ${new Date(data.createdAt).toLocaleString()}`}</Text>
            </Box>
            
            <HStack justify="space-between" align="center" minW = "100%">
                    <HStack align="flex-start">
                        {/* <Badge p = {1}><Text>{`${postData.message.likes.length} likes`}</Text></Badge> */}
                        <Image
                            src= {likePhoto}
                            alt="thumbs up"
                            boxSize="20px"
                            cursor="pointer"
                            onClick={() => handleLike(postData._id,setPostData)}
                            bg = {postData.likes.includes(userId) ? color : ""}
                            borderRadius="50%"
                            padding="2px"

                        />
                    </HStack>

                  
                </HStack>
        </Box>
    )
}
