
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Card } from '@material-ui/core';
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../services/firebase';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import TextInput from '../TextInput';
import { useStyles } from './authStyles';


interface RegisterFormInputs {
    email: string;
    password: string;
}

const RegisterForm: React.FC = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<RegisterFormInputs>();
    const classes = useStyles()
    const onSubmit = (data: RegisterFormInputs) => {
        const { email, password } = data
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                toast.success('Successfully logged in!')

            })
            .catch((error) => {
                let errorMessage = error.message;
                const errorLookup: any = {
                    'Firebase: Error (auth/wrong-password).': 'Incorrect Password',
                    'Firebase: Error (auth/user-not-found).': 'Email Not Found'
                }
                toast.error(errorLookup[errorMessage] || 'Failed to log in')
            });
    };
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                toast.success('Successfully logged in with Google!')
            })
            .catch((error) => {
                let errorMessage = error.message;
                toast.error(errorMessage || 'Failed to log in with Google')
            });
    }

    const signInWithFacebook = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                toast.success('Successfully logged in with Facebook!');
            })
            .catch((error) => {
                let errorMessage = error.message;
                toast.error(errorMessage || 'Failed to log in');
            });
    }

    
    return (
        <>
            <Card className={classes['login-container']}>
                <h1>Log In</h1>
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
                            }}
                            render={({ field }) => (
                                <TextInput
                                    label="Password"
                                    value={field.value}
                                    onChange={field.onChange}
                                    type="password"
                                    fullWidth
                                    error={Boolean(errors.password)}
                                    helperText={errors.password && 'Password is Required'}
                                />
                            )}
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%', marginTop: '10px' }}>Log in</Button>
                    <Button variant="contained" color="default" onClick={signInWithGoogle} style={{ width: '100%', marginTop: '10px' }}>Log in with Google</Button>
                    <Button variant="contained" color="primary" onClick={signInWithFacebook} style={{ width: '100%', marginTop: '10px' }}>Log in with Facebook</Button>
                </form>
                <br></br>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <Link to={'/register'}>Register</Link>
                    <Link to={'/password-reset'}>Forgot Password</Link>
                </div>

            </Card>
        </>
    );
};

export default RegisterForm;