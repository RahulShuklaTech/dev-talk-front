
import { Box, Button, Container, CSSReset, Heading, Spacer, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { Nav } from './Nav'
import { Post } from './Post'
import { SkeletonText } from "@chakra-ui/react"
import { DoRedirect } from './DoRedirect'



export const Profile = () => {
    const location = useLocation();
    const [loading, setLoading] = React.useState(true);
    const { username} = location.state || "";
    const history = useHistory();
    const loggedInUser = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    const [data, setData] = React.useState({});


 
    const getProfileData = async () => {
        setLoading(true);
        const postsResponse = await axios.get(`/profile/${username}`)
        const postsData = await postsResponse.data;
        setData(postsData.userFound.result.message);
        setLoading(false);
        
    }


    const handleFollow = async (e) => {
        e.preventDefault();
        let copy = JSON.parse(JSON.stringify(data));
        copy.followers.includes(userId) ? copy.followers.splice(copy.followers.indexOf(userId), 1) : copy.followers.push(userId);
        setData(copy)
        axios.post("follow/" +username, {});
    }

    const handleDelete = async (index,postId) => { 
        
        let copy =  {...data}
        copy.posts.splice(index, 1);
        setData(copy)
        await axios.delete(`post/${postId}`)
        
    }


    useEffect(() => {

       username && getProfileData()
      // eslint-disable-next-line  
    }, [])
    if(username === undefined) {
        history.push("/");
        return <DoRedirect/>
        
        
    }



    return (
        <Container  maxWidth="80%" minHeight="100vh" p = {0} >
            <CSSReset />
            <Nav username={location.state.username} showFeed = {true}/>
            {loading && <SkeletonText mt="10" noOfLines={4} spacing="4" isLoaded={!loading} width={'xl'} margin="5rem auto"></SkeletonText>}
           {!loading && <Container minWidth= "100%" minHeight="50px" my={10} p = {0}>
                <Box
                    p={4}
                    boxShadow="1px 1px 4px 1px lightgrey"
                    borderRadius="10px" minW="10rem"
                    maxW="30rem"
                    bg="white"
                    spacing={3}>

                    <Box>

                    </Box>

                    <Text
                        fontSize="1.5rem"
                        my={2}>
                        {data.name}


                    </Text>
                    <Box display="flex">
                        <Text
                            textTransform="capitalize"
                            fontSize="md"
                            my={2}>
                            @{username}
                        </Text>
                        <Spacer my={2} width={5} />
                        { loggedInUser !== username && data.followers.includes(userId) && <Button colorScheme="red" mt={2} color="white" onClick = {handleFollow}>Unfollow</Button>}
                        { loggedInUser !== username && !data.followers.includes(userId) && <Button bg="twitter.500" mt={2} color="white" onClick = {handleFollow}>Follow</Button>}
                    </Box>
                    <Box display="flex">
                        <Text
                            fontSize="md"
                            my={2}>
                            {data.following.length + " "}following
                        </Text>
                        <Spacer my={2} width={5} />
                        <Text
                            fontSize="md"
                            my={2}>
                            {data.followers.length + " "}followers
                        </Text>
                    </Box>
                    
                </Box>
                <Heading textTransform="capitalize" size="lg" color="red" my={5}>
                        {username}'s posts
                    </Heading>
                    {
                        data.posts.length === 0 ? <Text>No user posts.</Text> :
                            data.posts.map((post, index) => <Post data={post} key={index} username={username} index={index} like = {"trash.svg"} handleDelete = {handleDelete}/>)
                    }

            </Container>}

        </Container>
    )
}
