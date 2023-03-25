import React from 'react'
import UpdatePasswordForm from '../components/auth/UpdatePasswordForm'
import AuthLayout from '../layout/auth-layout/AuthLayout'

interface Props { }

function UpdatePassword(props: Props) {
    const { } = props

    return (
        <AuthLayout>
            <UpdatePasswordForm />
        </AuthLayout>
    )
}

export default UpdatePassword
