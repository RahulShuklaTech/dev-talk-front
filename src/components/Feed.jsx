import { Button, Container } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AddPostForm } from './AddPostForm'
import { Nav } from './Nav'

export const getData = async () => {
    try {
        const response = await axios.get("post/details/60fa60f09758b2381c119511")
        const data = await response.data;
        console.log("data from db ", data)
    } catch (e) {
        console.log("error while getting data", e.message)
    }
}


export const Feed = () => {
    const location = useLocation();
    const [isOpen,setIsOpen] = React.useState(false);
    

    const handleClick = () => {
        setIsOpen(!isOpen);
    }


    const onClose = () => { 
        setIsOpen(false);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <Container centerContent minWidth = "100%" minHeight = "100vh" border = "2px solid red">
            <Nav username={location.state.username} />
            {location?.state.username ? location.state.username : 'No user found'}
            <Button onClick={handleClick} borderRadius = "50%" height="2rem" width ="2rem" bgColor = "blue" color="white" padding = "1.5rem">+</Button>
            
            <AddPostForm isOpen = {isOpen} onClose = {onClose} />
        </Container>
    )
}


