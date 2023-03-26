
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Card } from '@material-ui/core';
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, linkWithCredential, fetchSignInMethodsForEmail } from "firebase/auth";
import { FaGoogle } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
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
    const signInWithProvider = async (provider: any) => {
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          toast.success(`Successfully logged in with ${provider.providerId}!`);
        } catch (error:any) {
          if (error.code === 'auth/account-exists-with-different-credential') {
            return handleLinkFlow(provider);
          } else {
            let errorMessage = error.message;
            toast.error(errorMessage || `Failed to log in with ${provider.providerId}`);
          }
        }
      };

    const handleLinkFlow = async (provider: any) => {
        try {
          const result:any = await signInWithPopup(auth, provider);
          const user:any = result.user;
      
          const methods = await fetchSignInMethodsForEmail(auth, user.email);
          if (methods.includes(provider.providerId)) {
            await linkWithCredential(user, result?.credential);
            toast.success(`Successfully linked ${provider.providerId} account!`);
          } else {
            throw new Error(`No existing account found for ${provider.providerId}`);
          }
        } catch (error:any) {
          let errorMessage = error.message;
          toast.error(errorMessage || `Failed to link ${provider.providerId} account`);
        }
      };

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithProvider(provider);
    }

    const signInWithFacebook = () => {
        const provider = new FacebookAuthProvider();
        signInWithProvider(provider);
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
                        <div style = {{ marginTop:'10px'}}>
                         <Link to={'/password-reset'} style = {{textDecoration:'none'}} >Forgot Password?</Link>
                         </div>
                    </div>
                    <div>
                    <Button startIcon = {<FaGoogle/>} variant="contained" color="default" onClick={signInWithGoogle} style={{ width: '49%', marginTop: '10px',marginRight:'2%', fontWeight:'540' }}> Google</Button>
                    <Button startIcon = {<FaFacebook/>} variant="contained" color="primary" onClick={signInWithFacebook} style={{ width: '49%', marginTop: '10px', fontWeight:'540' }}>Facebook</Button>
                    </div>
                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%', marginTop: '10px' }}>Log in</Button>

                </form>
                <br></br>
                <div style={{ display: 'flex', justifyContent:'center', marginTop: '10px' }}>
                    <Link style = {{textDecoration:'none'}} to={'/register'}>Create Account</Link>
                </div>

            </Card>
        </>
    );
};

export default RegisterForm;