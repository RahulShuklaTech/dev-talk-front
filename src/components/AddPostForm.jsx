import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Spacer,
} from "@chakra-ui/react"
import { Button } from '@chakra-ui/react'
import { Textarea } from "@chakra-ui/react"
import axios from 'axios'



const sendData = async (e, value, setPosts, setIsOpen) => {
    e.preventDefault();
    if (value === "") return;
    let response = await axios.post('/post', { content: value })
    if (response.status === 200) {
        setPosts(posts => posts.concat(response.data.message))
    }
    console.log("response", response)
    setIsOpen(state => !state)

}


export const AddPostForm = ({ isOpen, onClose, setPosts, setIsOpen }) => {

    const [value, setValue] = React.useState('')

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a new post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea placeholder="Enter your post here" value={value} onChange={(e) => setValue(e.target.value)} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" onClick={(e) => sendData(e, value, setPosts, setIsOpen)}>Add Post</Button>
                        <Spacer />
                        <Button  colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}
