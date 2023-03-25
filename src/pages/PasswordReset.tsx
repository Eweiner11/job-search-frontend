import React from 'react'
import PasswordResetForm from '../components/auth/PasswordResetForm'
import AuthLayout from '../layout/auth-layout/AuthLayout'

interface Props { }

function PasswordReset(props: Props) {
    const { } = props

    return (
        <AuthLayout>
            <PasswordResetForm />
        </AuthLayout>
    )
}

export default PasswordReset