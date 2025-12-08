
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

