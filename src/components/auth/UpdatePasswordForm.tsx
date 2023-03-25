import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Card } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import {  confirmPasswordReset} from "firebase/auth";
import { auth } from '../../services/firebase';
import { toast } from 'react-toastify';
import TextInput from '../TextInput';
import { Link, useLocation } from 'react-router-dom';
import { useStyles } from './authStyles';

interface LoginFormInputs {
    password: string;
    confirmPassword: string
}


const UpdatePasswordForm: React.FC = () => {
    const { watch, handleSubmit, control, formState: { errors } } = useForm<LoginFormInputs>();
    const classes = useStyles()
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const oobCode = params.get('oobCode')

    const onSubmit = (data: LoginFormInputs) => {
        const { password } = data
        if (!oobCode) {
            toast.error('Link expired, Please resend password reset email.')
        }
        confirmPasswordReset(auth, oobCode || '', password)
            .then((userCredential) => {
                toast.success('Successfully updated password!')
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage = error.message;
                const errorLookup: any = {
                    'Firebase: Error (auth/wrong-password).': 'Incorrect Password',
                    'Firebase: Error (auth/user-not-found).': 'Email Not Found'
                }
                console.log(error)
                toast.error(errorLookup[errorMessage] || 'Failed to Create Account.')
            });
    };

    return (
        <>
            <Card className={classes['login-container']}>
                <h1>Update Password</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ marginBottom: '20px' }}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 6
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
                                minLength: 6,
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
                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%', marginTop: '10px' }}>Update</Button>
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

export default UpdatePasswordForm;