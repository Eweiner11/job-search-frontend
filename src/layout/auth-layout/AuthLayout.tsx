import React, { ReactNode } from 'react'
import './AuthLayout.scss'

interface LayoutProp {
    children: ReactNode;
}

function AuthLayout({ children }: LayoutProp) {

    return (
        <div className='auth-container'>
            <div className = 'flex-container flex-column'>
                {children}
            </div>
            <div className = 'flex-container bg-blue'>
                <img src={require('../../assets/images/logo.png').default} alt = 'image here'/>
            </div>
        </div>
    )
}

export default AuthLayout