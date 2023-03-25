import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import AuthLayout from '../layout/auth-layout/AuthLayout'

interface Props { }

function Login(props: Props) {
    const { } = props

    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    )
}

export default Login
