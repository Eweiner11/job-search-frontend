import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Card } from '@material-ui/core';
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../services/firebase';
import { toast } from 'react-toastify';
import TextInput from '../TextInput';
import { Link } from 'react-router-dom';
import { useStyles } from './authStyles';

interface RegisterFormInputs {
    email: string;
    password: string;
    confirmPassword: string
}

const RegisterForm: React.FC = () => {
    const { watch, handleSubmit, control, formState: { errors } } = useForm<RegisterFormInputs>();
    const classes = useStyles()

    const onSubmit = (data: RegisterFormInputs) => {
        const { email, password } = data
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                toast.success('Successfully Created Account!')
            })
            .catch((error) => {
                let errorMessage = error.message;
                const errorLookup: any = {
                    'Firebase: Error (auth/wrong-password).': 'Incorrect Password',
                    'Firebase: Error (auth/user-not-found).': 'Email Not Found'
                }
                toast.error(errorLookup[errorMessage] || 'Failed to Create Account.')
            });
    };

    return (
        <>
            <Card className={classes['login-container']}>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ marginBottom: '20px' }}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ // add email pattern validation
                            }}
                            render={({ field }) => (
                                <TextInput
                                    label="Email"
                                    value={field.value}
                                    onChange={field.onChange}
                                    type="email"
                                    fullWidth
                                    error={Boolean(errors.email)}
                                    helperText={errors.email && (errors.email?.type === 'pattern' ? 'Invalid email' : 'Email is required')}
                                />
                            )}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength:6
                            }}
                            render={({ field }) => (
                                <TextInput
                                    label="Password"
                                    value={field.value}
                                    onChange={field.onChange}
                                    type="password"
                                    fullWidth
                                    error={Boolean(errors.password)}
                                    helperText={errors.password && (errors.password.type === "minLength"
                                    ? "Password should be at least 6 characters" : 'Password is Required')}
                                />
                            )}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength:6,
                                validate: (value: string) => value === watch('password') || 'Passwords do not match',
                            }}
                            render={({ field }) => (
                                <TextInput
                                    label="Confirm Password"
                                    value={field.value}
                                    onChange={field.onChange}
                                    type="password"
                                    fullWidth
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={
                                        errors.confirmPassword && (errors.confirmPassword.type === "minLength"
                                            ? "Password should be at least 6 characters"
                                            : errors.confirmPassword && errors.confirmPassword.message || 'Password is required')
                                    }
                                />
                            )}
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%', marginTop: '10px' }}>Create Account</Button>
                </form>
                <br></br>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Link to={'/login'}>Login</Link>
                <Link to={'/password-reset'}>Forgot Password</Link>
                </div>
            </Card>
        </>
    );
};

export default RegisterForm;