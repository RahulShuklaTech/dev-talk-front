import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"
import { Button } from '@chakra-ui/react'
import { Textarea } from "@chakra-ui/react"
import axios from 'axios'



const sendData = (e,value) => { 
    e.preventDefault();
    if(value === "") return;
    axios.post('/post', {content: value})
        .then(response => { 
            console.log(response)
        }
    )
}


export const AddPostForm = ({isOpen,onClose}) => {

    const [value,setValue] = React.useState('')

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a new post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <Textarea placeholder="Enter your post here" value = {value} onChange = {(e) => setValue(e.target.value)}/>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost" onClick = {(e) => sendData(e,value)}>Add Post</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}
