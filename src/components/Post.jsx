import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'
// import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { Badge } from "@chakra-ui/react"
import axios from 'axios'
import { useHistory } from 'react-router-dom'


export const Post = ({ data, username, userId, like }) => {

    const history = useHistory()
    const likePhoto = "https://determined-pike-9e5056.netlify.app/thumbs-up.svg"
    //"http://localhost:3000/thumbs-up.svg"
    const [postData, setPostData] = React.useState(data);
    const imgURL = 'https://dev-talks-1.herokuapp.com/uploads/';
    //"http://localhost:7524/uploads/"
    const [loading, setLoading] = React.useState(false); 
    let color = "twitter.500"

    const handleLike = async (post) => {
        const response = await axios.post("post/like", { postId: post })
        setPostData(response.data.message)

    }

    const handleProfile = async () => {
        history.push({
            pathname: "/profile/",
            state: { username: postData.owner.username }
        })

    }


    return (
        <Box p={4} boxShadow="1px 1px 4px 1px lightgrey" borderRadius="10px" minW="15rem" maxW="30rem" my={5}>
            <Box onClick={handleProfile} cursor="pointer" display= "flex" marginY= "3" >
                <Image
                    src={imgURL + postData.owner.username + ".png"}
                    boxSize="50px"
                    alt="avatar"
                    borderRadius="50%"
                    padding="2px"
                    marginRight = "3" />

                <Text fontSize="md" color="twitter.500"  >@{data.owner.username}</Text>
            </Box>
            <Box marginY={5}>
                <Text fontSize="2xl">{data.content}</Text>
                <Text fontSize="sm" color="gray.500">{`Posted on: ${new Date(data.createdAt).toLocaleString()}`}</Text>
            </Box>
            {console.log("like",like)}
            <HStack justify="space-between" align="center" minW="100%">
                <HStack align="flex-start">
                    <Badge p = {1}><Text>{`${postData.likes.length} likes`}</Text></Badge>
                    <Image
                        src= {likePhoto}
                        alt="thumbs up"
                        boxSize="20px"
                        cursor="pointer"
                        onClick={() => handleLike(postData._id)}
                        bg={postData.likes.includes(userId) ? color : ""}
                        borderRadius="50%"
                        padding="2px"

                    />
                </HStack>


            </HStack>
        </Box>
    )
}
