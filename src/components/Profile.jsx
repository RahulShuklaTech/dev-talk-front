
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
    const { username } = location.state || "";
    const history = useHistory();
    
    // const [name, setName] = React.useState('');
    const [data, setData] = React.useState({});

    console.log("username", username);
    if(username === undefined) {
        console.log("jkhasdfjkhsdfjkhsjkfhjksdfhjkhsfjkhaskjf")
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
        console.log("followResponse", followResponse);
        console.log(e.target, index);
    }

    useEffect(() => {
        getProfileData()
      // eslint-disable-next-line  
    }, [])


  
    if (loading) return <SkeletonText mt="10" noOfLines={4} spacing="4" isLoaded={!loading} width={'xl'} margin="5rem auto"></SkeletonText>





    return (
        <Container centerContent minWidth="100%" minHeight="100vh" >
            <CSSReset />
            <Nav username={location.state.username} />

            <Container minWidth="80%" minHeight="50px" my={10}>
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
                        <Button bg="twitter.500" mt={2} color="white" onClick = {handleFollow}>Follow</Button>
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
                    {/* <Button onClick={(e) => handleFollow(e, index)}>Follow</Button></Box> */}
                    
                </Box>
                <Heading size="lg" color="red" my={5}>
                        {username}'s posts
                    </Heading>
                    {
                        data.posts.length === 0 ? <Text>No user posts.</Text> :
                            data.posts.map((post, index) => <Post data={post} key={index} username={username} like = {"trash.svg"}/>)
                    }


                <Container minWidth="70%" >
                    
                </Container>





            </Container>




        </Container>
    )
}
