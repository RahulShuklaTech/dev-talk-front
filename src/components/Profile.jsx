
import { Box, Button, Container, CSSReset, Heading, Spacer, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Nav } from './Nav'
import { Post } from './Post'
import { SkeletonText } from "@chakra-ui/react"



export const Profile = () => {
    const location = useLocation();
    const [loading, setLoading] = React.useState(true);
    const { username} = location.state || "";
    const history = useHistory();
    const loggedInUser = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    const [data, setData] = React.useState({});

    if(username === undefined) {
        history.push("/");
    }


    const getProfileData = async () => {
        setLoading(true);
        const postsResponse = await axios.get(`/profile/${username}`)
        const postsData = await postsResponse.data;
        setData(postsData.userFound.result.message);
        setLoading(false);
        
    }


    const handleFollow = async (e, index) => {
        e.preventDefault();
        let followResponse = await axios.post("follow/" +username, {});
        if (followResponse.status) {
            getProfileData();
        }
        
    }

    useEffect(() => {
        getProfileData()
      // eslint-disable-next-line  
    }, [])


  
    if (loading) return <SkeletonText mt="10" noOfLines={4} spacing="4" isLoaded={!loading} width={'xl'} margin="5rem auto"></SkeletonText>

    return (
        <Container  maxWidth="80%" minHeight="100vh" >
            <CSSReset />
            <Nav username={location.state.username} />

           {!loading && <Container minWidth= "100%" minHeight="50px" my={10}>
                <Box
                    p={4}
                    boxShadow="1px 1px 4px 1px lightgrey"
                    borderRadius="10px" minW="10rem"
                    maxW="30rem"
                    bg="white"
                    spacing={5}>

                    <Text
                        fontSize="1.5rem"
                        my={2}>
                        {data.name}


                    </Text>
                    <Box display="flex">
                        <Text
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
                <Heading size="lg" color="red" my={5}>
                        {username}'s posts
                    </Heading>
                    {
                        data.posts.length === 0 ? <Text>No user posts.</Text> :
                            data.posts.map((post, index) => <Post data={post} key={index} username={username} like = {"trash.svg"}/>)
                    }

            </Container>}




        </Container>
    )
}
