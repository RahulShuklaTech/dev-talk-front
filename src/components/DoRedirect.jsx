import { Container } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export const DoRedirect = () => {
    return (
        <Container>
            <h1>Please login again</h1>
            
            Redirecting to Login page if not redirected within 5 seconds <Link to="/">Login</Link>
        </Container>
    )
}
