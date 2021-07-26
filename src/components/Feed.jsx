import { Box, Button, Container, CSSReset, Heading, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AddPostForm } from './AddPostForm'
import { Nav } from './Nav'
import { Post } from './Post'
import { SkeletonText } from "@chakra-ui/react"



export const Feed = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [posts, setPosts] = React.useState([]);
    const [suggestions, setSuggestions] = React.useState([]);
    const { username } = location.state || {};


    const getData = async () => {

        try {
            setLoading(true);
            await new Promise (resolve => setTimeout(resolve, 1000));
            const postsResponse = await axios.get("post/")
            const suggestionsResponse = await axios.get("follow/")
            const postsData = await postsResponse.data;
            const suggestionsData = await suggestionsResponse.data;
            console.log("data", postsData, suggestionsData);
            setPosts(postsData.message);
            setSuggestions(suggestionsData.message);
            setLoading(false);


        } catch (e) {
            console.log("error while getting data", e.message)
            setLoading(false);
            return [];
        }

    }


    const handleClick = () => {

        setIsOpen(!isOpen);
    }


    const handleFollow = async (e, index) => {
        e.preventDefault();
        let followResponse = await axios.post("follow/" + suggestions[index].username, {});
        if (followResponse.status) {
            console.log("following", suggestions[index].username);
            setSuggestions(suggestions.filter((s) => s.username !== suggestions[index].username));
            getData();
        }
        console.log("followResponse", followResponse);
        console.log(e.target, index);
    }

    const onClose = () => {
        setIsOpen(false);
    }

    useEffect(() => {

        getData();




    }, [])

    if (loading) return <SkeletonText mt="10" noOfLines={4} spacing="4" isLoaded={!loading} width={'xl'} margin ="5rem auto"></SkeletonText>
    
    return (
        // <SkeletonText mt="10" noOfLines={4} spacing="4" isLoaded={!loading}>
        <Container centerContent minWidth="100%" minHeight="100vh" position="relative">
            <CSSReset />
            <Nav username={location.state.username} />
            
                <Container display="flex" minWidth="80%" minHeight="50px" my={10}>

                    <Container minWidth="70%" >
                        <Heading size="lg" color="red" my={5}>
                            {username}'s Feed
                        </Heading>
                        {
                            posts.map((post, index) => <Post data={post} key={index} />)
                        }

                    </Container>
                    <Container minWidth="30%" p={3} backgroundColor="gray.100">
                        <Heading fontSize="large" my={4}> Follow other users</Heading>
                        {
                            suggestions.map((suggestion, index) =>
                                <Box
                                    p={4}
                                    boxShadow="1px 1px 4px 1px lightgrey"
                                    borderRadius="10px" minW="10rem"
                                    key={index}
                                    bg="white"
                                    spacing={5}>

                                    <Text
                                        my={2}>
                                        {suggestion.username}
                                    </Text>
                                    <Button onClick={(e) => handleFollow(e, index)}>Follow</Button></Box>
                            )}
                    </Container>
                </Container>

            <Button onClick={handleClick} position="absolute" right={10} bottom={10} borderRadius="50%" height="2.5rem" width="2.4rem" bgColor="twitter.500" color="white" padding="1.5rem" fontSize="2xl">+</Button>

            <AddPostForm isOpen={isOpen} onClose={onClose} setPosts={setPosts} setIsOpen={setIsOpen} />
        </Container>
        // </SkeletonText>
    )
}


