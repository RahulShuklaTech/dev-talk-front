import React, { useState } from 'react'
import { VStack, StackDivider, Container, Button, Text } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import * as Yup from "yup"

import { Input } from "@chakra-ui/react"
import { Link, useHistory } from 'react-router-dom'
import { Flex, Spacer } from "@chakra-ui/react"



export const Signup = () => {



    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const signUpUrl = 'http://localhost:3300/auth/signup';


    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        username: Yup.string().required(`Required`).min(5, 'Must be longer than 5 characters')
            .max(20, 'Must be less than 20 characters'),
        email: Yup.string().email(`invalid email format`).required(`Required`),
        password: Yup.string().required('Required').min(5, 'Must be longer than 5 characters')
            .max(20, 'Must be less than 20 characters'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], `Passwords must match`)
    });


    const initialValues = {
        name: '',
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: null
    }


    const handleError = (val) => {
        console.log("error", val);
        switch (val) {

            case 'username':
                setErrorMessage('Username already taken');
                break;
            case 'email':
                setErrorMessage('Email already taken');
                break;
            case 'password':
                setErrorMessage('Password must be at least 6 characters');
                break;
            default:
                setErrorMessage('Unknown error');


        }
    }

    const onSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        let formData = new FormData();
        formData.append("name", values.name);
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("password", values.password);
        if (values.avatar != null) { formData.append("avatar", values.avatar); }
        let response = await fetch(signUpUrl, {
            method: 'POST',
            body: formData,
        })
        if (response.status !== 201) {
            let data = await response.json();
            console.log(data);
            // data.code ? handleError(data.code) :
            handleError(Object.keys(data.keyPattern)[0]);

            setLoading(false);
            return;
        }
        let result = await response.json();

        setErrorMessage("");
        setLoading(false);
        history.push(`/`);

        console.log("sfdsdfsdf", values)
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    })

    return (
        <Container>
            <Flex>

                <form onSubmit={formik.handleSubmit}  >
                    <Heading as="h2" size="2xl">
                        DevTalk
                    </Heading>
                    <VStack
                        divider={<StackDivider borderColor="gray.200" />}
                        spacing={4}
                        align="center"
                        marginTop="4rem"
                    >
                        <Heading as="h2" size="xl" marginBottom="2rem">
                            Sign Up
                        </Heading>
                        <Box bg="" w="100%" p={0} color="black">

                            <FormControl id="name">
                                <FormLabel>Name</FormLabel>
                                <Input type="text"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"

                                />
                                {formik.errors.name && formik.touched.name && <small>{formik.errors.name}</small>}
                            </FormControl>
                            <FormControl id="username">
                                <FormLabel>Username</FormLabel>
                                <Input type="text"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                //FormErrorMessage={errorMessage.username}
                                />
                                {formik.errors.username && formik.touched.username && <small>{formik.errors.username}</small>}
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                //FormErrorMessage={errorMessage.email}
                                />
                                {formik.errors.email && formik.touched.email && <small>{formik.errors.email}</small>}


                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                //FormErrorMessage={errorMessage.password}
                                />
                                {formik.errors.password && formik.touched.password && <small>{formik.errors.password}</small>}
                            </FormControl>
                            <FormControl id="confirmPassword">
                                <FormLabel>Confirm Password</FormLabel>
                                <Input type="password"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                //FormErrorMessage={errorMessage.confirmPassword}
                                />
                                {formik.errors.confirmPassword && formik.touched.confirmPassword && <small>{formik.errors.confirmPassword}</small>}
                            </FormControl>
                            <input accept="image/*"
                                id="photo"
                                type="file"
                                name="photo"
                                onChange={(e) => formik.setFieldValue("avatar", e.currentTarget.files[0])}
                                style={{ display: 'none', }}
                            />

                            <label htmlFor="photo" name="photo">
                                <Box
                                    height="24px"
                                    lineHeight="1.2"
                                    transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                                    border="1px"
                                    px="8px"
                                    borderRadius="2px"
                                    fontSize="14px"
                                    fontWeight="semibold"
                                    bg="#f5f6f7"
                                    borderColor="#ccd0d5"
                                    color="#4b4f56"
                                    _hover={{ bg: "#ebedf0" }}
                                    _active={{
                                        bg: "#dddfe2",
                                        transform: "scale(0.98)",
                                        borderColor: "#bec3c9",
                                    }}
                                    _focus={{
                                        boxShadow:
                                            "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                                    }}>upload photo</Box>

                                {formik.values.file?.name}
                            </label>

                        </Box>

                        <Button type="submit" color="primary" >
                            Sign Up
                        </Button>

                        <Text fontSize="md">Have an account <Link to="/">Login</Link></Text>
                        <Box color="red" p={3}>{errorMessage}</Box>
                    </VStack>
                </form >
            </Flex>
        </Container>
    )
}
