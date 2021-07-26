import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { Badge } from "@chakra-ui/react"

export const Post = ({ data,index }) => {

    const handleLike = () => {}
    const handleDelete = () => {}

    return (
        <Box p={4} boxShadow="1px 1px 4px 1px lightgrey" borderRadius="10px" minW="10rem" my = {5}>
            <Box>
                <Text fontSize="md" color="twitter.500">@{data.owner.username}</Text>


            </Box>
            <Box>
                <Text fontSize="2xl">{data.content}</Text>
                <Text fontSize="sm" color="gray.500">{`Posted on: ${new Date(data.createdAt).toLocaleString()}`}</Text>
            </Box>
            
            <HStack justify="space-between" align="center" minW = "100%">
                    <HStack align="flex-start">
                        <Badge p = {1}><Text>{`${data.likes.length} likes`}</Text></Badge>
                        
                        <Image
                            src="./thumbs-up.svg"
                            alt="thumbs up"
                            boxSize="20px"
                            cursor="pointer"
                            onClick={() => handleLike(data._id, index)}
                        />
                        
                    </HStack>

                    <Image
                        src="./trash.svg"
                        alt="delete"
                        boxSize="20px"
                        cursor="pointer"
                        onClick={() =>handleDelete(data._id, index)}
                    />
                </HStack>
        </Box>
    )
}
