import { Box, Button, Container, CSSReset, Heading, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { AddPostForm } from './AddPostForm'
import { Nav } from './Nav'
import { Post } from './Post'
import { SkeletonText } from "@chakra-ui/react"
import { Followers } from './Followers'

export const Feed = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [posts, setPosts] = React.useState([]);
    const [suggestions, setSuggestions] = React.useState([]);
    const { username, userId } = location.state || "";
    const history = useHistory();

    const getData = async () => {

        try {
            setLoading(true);
            const postsResponse = await axios.get("post/")
            const suggestionsResponse = await axios.get("follow/")
            const postsData = await postsResponse.data;
            const suggestionsData = await suggestionsResponse.data;
            setPosts(postsData.message);
            setSuggestions(suggestionsData.message);
            setLoading(false);

        } catch (e) {
            console.log("error while getting data", e.message)
            setLoading(false);
            return [];
        }

    }


    const getSuggestions = async () => {
        const postsResponse = await axios.get("post/")
        const suggestionsResponse = await axios.get("follow/")
        const postsData = await postsResponse.data;
        const suggestionsData = await suggestionsResponse.data;
        setPosts(postsData.message);
        setSuggestions(suggestionsData.message);

    }


    const handleClick = () => {

        setIsOpen(!isOpen);
    }


    const handleFollow = async (e, index) => {
        e.preventDefault();
        setSuggestions(suggestions.filter((s) => s.username !== suggestions[index].username));
        let followResponse = await axios.post("follow/" + suggestions[index].username, {});

        if (followResponse.status) {
            // getData(); 
            getSuggestions();
        }

    }




    const onClose = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        getData();

    }, [])
    if (username === undefined) {

        history.push("/");
    }


    // if (loading && posts.length === 0) return <SkeletonText mt="10" noOfLines={4} spacing="4" isLoaded={!loading} width={'xl'} margin="5rem auto"></SkeletonText>
    return (
        <Container maxWidth="80%" minHeight="100vh" position="relative" p={0} >
            <CSSReset />
            <Nav username={location.state.username} />
            {(loading && posts.length === 0) && <SkeletonText mt="10" noOfLines={4} spacing="4" isLoaded={!loading} width={'xl'} margin="5rem auto"></SkeletonText>}

            {(!loading && posts.length === 0) && <Container display="flex" minWidth="100%" minHeight="50px" my={10} p={0} >
                <CSSReset />
                <Container minWidth="80%" p={0}>
                    {(!loading && posts.length === 0) ?
                        <Box p={8} maxWidth="60rem" bg="gray.100" > <Heading fontSize="3xl"> Welcome to DevTalk</Heading><Text my={10} fontSize="lg">Add a post or a follow as user to start</Text></Box>
                        :<Box display="flex" flexDirection="column" justifyContent="center" p={5}>
                            <Heading textTransform="capitalize" size="lg" color="white" bg="twitter.500" padding={3} my={5} maxW="fit-content">
                                {username}'s Feed
                            </Heading>
                            {
                                posts.map((post, index) => <Post data={post} key={index * Math.random()} username={username} userId={userId} like={"thumbs-up.svg"} />)
                            }
                        </Box>}

                </Container>
                <Container minWidth="fit-content" maxHeight="fit-content" p={3} backgroundColor="gray.100" borderRadius="12px">
                    <Heading fontSize="large" my={4}> Follow other users</Heading>
                    {
                        suggestions.length === 0 ? <Text color="gray.300" fontSize="large" my={4}> No suggestions at the moment</Text> :
                            suggestions.map((suggestion, index) =>
                                <Followers suggestion={suggestion} index={index} key={index * Math.random()} handleFollow={handleFollow} />
                            )
                    }
                </Container>
            </Container>}

            {!loading && <Button onClick={handleClick} position="fixed" right={"10%"} bottom={10} borderRadius="50%" height="2.5rem" width="2.5rem" bgColor="twitter.500" color="white" padding="1.5rem" fontSize="2xl" zIndex="1000">+</Button>}
            <AddPostForm isOpen={isOpen} onClose={onClose} setPosts={setPosts} setIsOpen={setIsOpen} />
        </Container>
    )
}


