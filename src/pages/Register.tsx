import React from 'react'
import RegisterForm from '../components/auth/RegisterForm'
import AuthLayout from '../layout/auth-layout/AuthLayout'

interface Props { }

function Register(props: Props) {
    const { } = props

    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>

    )
}

export default Register
