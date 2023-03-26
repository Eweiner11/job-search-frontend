
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Card } from '@material-ui/core';
import { sendPasswordResetEmail} from "firebase/auth";
import { auth } from '../../services/firebase';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import TextInput from '../TextInput';
import { useStyles } from './authStyles';

interface PasswordResetInputs {
    email: string;
}

const PasswordResetForm: React.FC = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<PasswordResetInputs>();
    const classes = useStyles()
    const onSubmit = (data: PasswordResetInputs) => {
        const { email } = data
        
        sendPasswordResetEmail(auth, email,)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential
                toast.success('Email Sent!')
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage = error.message;
                const errorLookup: any = {
                    'Firebase: Error (auth/user-not-found).': 'Email Not Found'
                }
                toast.error(errorLookup[errorMessage] || 'Failed to log in')
            });
    };

    return (
        <>
            <Card className={classes['login-container']}>
                <h1>Forgot Again?</h1>
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
                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%', marginTop: '10px' }}>Send Link</Button>
                </form>
                <br></br>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Link to={'/login'}>Log In</Link>
                </div>

            </Card>
        </>
    );
};

export default PasswordResetForm;