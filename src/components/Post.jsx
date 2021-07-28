import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Image } from "@chakra-ui/react"
import { Badge } from "@chakra-ui/react"
import axios from 'axios'
import { useHistory } from 'react-router-dom'


export const Post = ({ data,userId,handleDelete,index}) => {

    const history = useHistory()
    const [postData, setPostData] = React.useState(data);
    const imgURL = 'https://dev-talks-1.herokuapp.com/uploads/';
    // const [loading, setLoading] = React.useState(false); 
    const username = localStorage.getItem('username')
    let color = "gray.300"
    let liked = postData.likes.includes(userId)


    const handleLike = async (post) => {
       
        let copy =  {...postData}
        if(copy.likes.includes(userId)){
            copy.likes.splice(copy.likes.indexOf(userId),1)
        }else{
            copy.likes.push(userId)
        }
        setPostData(copy)
        await axios.post("post/like", { postId: post })
        
    }

    
    const handleProfile = async () => {
        history.push({
            pathname: "/profile/"+postData.owner.username,
            state: { username: postData.owner.username }
        })

    }

    return (
        <Box p={4} boxShadow="1px 1px 4px 1px lightgrey" borderRadius="10px" minW="15rem" maxW="30rem" my={5}>
            <Box onClick={handleProfile} cursor="pointer" display= "flex" marginY= "3" >
                <Image
                    src={imgURL + postData.owner.filename} 
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
            <HStack display="flex" justify="space-between" align="flex-end" minW="100%" minHeight = "fit-content">
                
                    <Box display = "flex">
                    <Badge p = {1}><Text>{`${postData.likes.length} likes`}</Text></Badge>
                    <Image
                        src= "https://determined-pike-9e5056.netlify.app/thumbs-up.svg"
                        alt="like"
                        boxSize="2rem"
                        cursor="pointer"
                        onClick={() => handleLike(postData._id)}
                        bg={ liked? color : ""}
                        borderRadius="50%"
                        padding="5px"
                        mx={2}
                    />
                    {liked && <Text as = "span" fontSize="small">you like this</Text>}
                    </Box>
                    {username === postData.owner.username && handleDelete &&
                        <Image
                        src= "https://determined-pike-9e5056.netlify.app/trash.svg"
                        alt="delete"
                        boxSize="2rem"
                        cursor="pointer"
                        onClick={() => handleDelete(index,postData._id)}
                        bg={ color }
                        borderRadius="50%"
                        padding="5px"
                    />}
                
            </HStack>
        </Box>
    )
}
