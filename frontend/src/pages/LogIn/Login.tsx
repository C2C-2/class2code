import { Button, Flex, Image } from '@mantine/core';
import React, { useState } from 'react';
import LoginImage from './LoginImage.svg';
import './Login.css'
import MainLogo from "./logo2 2.png";
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Divider,
    Checkbox,
    Anchor,
    Stack,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
// import { TwitterButton } from './TwitterButton';
import { auth } from '../../config/firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import Alert from '../../components/Alert/AlertBox.jsx'

const Login = () => {

    const [error, setError] = useState(null);
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    if (
        localStorage.getItem("token") &&
        localStorage.getItem("token") !== "null"
    ) {
        window.location.replace("/");
    }

    const login = async (e) => {
        e.preventDefault();
        try {
            if (form.isValid()) {
                const a = await signInWithEmailAndPassword(auth, form.values.email, form.values.password);
                localStorage.setItem("token", await a.user.getIdToken());
                // localStorage.removeItem("token");
                window.location.replace("/");
            }
        } catch (err) {
            setError("Check your email and password please");
            const time = setTimeout(() => setError(null), 3000);
            return () => clearTimeout(time);
        }
    }

    const register = async (e) => {
        e.preventDefault();
        try {
            if (form.isValid()) {
                const a = await createUserWithEmailAndPassword(auth, form.values.email, form.values.password);
                localStorage.setItem("token", await a.user.getIdToken());
                // localStorage.removeItem("token");
                window.location.replace("/");
            }
        } catch (err) {
            setError("Check your email and password please");
            const time = setTimeout(() => setError(null), 3000);
            return () => clearTimeout(time);
        }
    }

    return (
        <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
            id='LoginPage'
        >

            {error && (
                <Alert text={error} />
            )}

            <img src={MainLogo} alt="" id='mainLogo' />

            <span className="LogInFigmaMainPart1UnderText">
                @ {new Date().getFullYear()} Class2Code
            </span>

            <div style={{ flex: 2 }} className='LoginImage'>
                <Image
                    radius="md"
                    src={LoginImage}
                    w={"45%"}
                    id='LoginImageSvg'
                />
                <div className='titles'>
                    <div className="LogInFigmaMainPart1Center1">
                        <h4>
                            Welcome Back To <b>Class2Code! </b>
                            Please Login To Access Your Account.
                        </h4>
                    </div>
                    <div className="LogInFigmaMainPart1Center2">
                        <p className="LogInFigmaMainPart1Center2Text">
                            We're excited to have you back on the Class2Code platform. Logging
                            into your account allows you to continue your learning journey and
                            development through engaging in simulated software projects.
                        </p>
                    </div>
                    {type === 'login' && (
                        <Button onClick={() => toggle()} w={"100%"} radius="md" variant="filled" color="green" size="lg">Create Account</Button>

                    )}
                    {
                        type === 'register' && (
                            <Button onClick={() => toggle()} w={"100%"} radius="md" variant="filled" color="green" size="lg">Login</Button>
                        )
                    }
                </div>
            </div>

            <div className='LoginForm' style={{ flex: 1 }}>

                <div>
                    <div className="LoginFormLogo">
                        <img
                            src={MainLogo}
                            alt="Logo"
                            className="LoginFormLogoImage"
                        />
                        <h5 className="LoginFormLogoText">
                            Class2Code
                        </h5>
                    </div>
                    <hr />
                </div>

                <Paper radius="md" p="xl" id='LoginDetails'>
                    <div className="LogInFigmaMainPart2DesignCenter1">
                        <h4>
                            {type === 'login' ? 'Login to Your Account' : 'Create New Account'}
                        </h4>
                        <p>
                            Enter Yours Details to {type === 'login' ? 'Login' : 'Register'}
                        </p>
                    </div>

                    <Group grow mb="md" mt="md">
                        <GoogleButton radius="xl">Google</GoogleButton>
                        {/* <TwitterButton radius="xl">Twitter</TwitterButton> */}
                    </Group>

                    <Divider label="Or continue with email" labelPosition="center" my="lg" />

                    <form onSubmit={form.onSubmit(() => { })}>
                        <Stack>
                            {type === 'register' && (
                                <TextInput
                                    label="Name"
                                    placeholder="Your name"
                                    value={form.values.name}
                                    onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                                    radius="md"
                                />
                            )}

                            <TextInput
                                required
                                label="Email"
                                placeholder="hello@mantine.dev"
                                value={form.values.email}
                                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                                error={form.errors.email && 'Invalid email'}
                                radius="md"
                            />

                            <PasswordInput
                                required
                                label="Password"
                                placeholder="Your password"
                                value={form.values.password}
                                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                                error={form.errors.password && 'Password should include at least 6 characters'}
                                radius="md"
                            />

                            {
                                type === 'login' && (
                                    <Group justify="end" mt="lg" id='ForgetPassword'>
                                        <Anchor component="button" size="sm">
                                            Forgot password?
                                        </Anchor>
                                    </Group>
                                )
                            }

                            {type === 'register' && (
                                <Checkbox
                                    label="I accept terms and conditions"
                                    checked={form.values.terms}
                                    onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                                />
                            )}
                        </Stack>

                        <Group justify="space-between" mt="xl">
                            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                                {type === 'register'
                                    ? 'Already have an account? Login'
                                    : "Don't have an account? Register"}
                            </Anchor>
                            <Button type="submit" radius="xl" size='md' onClick={type === 'login' ? login : register}>
                                {upperFirst(type)}
                            </Button>
                        </Group>
                    </form>
                </Paper>
            </div>
        </Flex >
    )
}

export default Login
