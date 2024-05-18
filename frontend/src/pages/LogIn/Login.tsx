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
    Paper,
    Group,
    Divider,
    Checkbox,
    Anchor,
    Stack,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
// import { TwitterButton } from './TwitterButton';
import { auth } from '../../config/firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signInWithRedirect } from 'firebase/auth';
import Alert from '../../components/Alert/AlertBox.jsx';
import { Paths } from '../../assets/Paths';
import { GithubFilled } from '@ant-design/icons';
import { ButtonProps } from 'antd';
import { FaGithub } from 'react-icons/fa';
import { gql, useMutation } from '@apollo/client';

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

    const Create_User = gql`
        mutation Mutation($user: UserInput!) {
            createNewUser(user: $user) {
                id
                type
                IsActive
            }
        }
    `;
    const [createUser, { data, loading }] = useMutation(Create_User);

    if (
        localStorage.getItem("token") &&
        localStorage.getItem("token") !== "null"
    ) {
        window.location.replace(Paths.Dashboard);
    }

    const login = async (e) => {
        e.preventDefault();
        try {
            if (form.isValid()) {
                const result = await signInWithEmailAndPassword(auth, form.values.email, form.values.password);
                localStorage.setItem("token", result.user.accessToken);
                localStorage.setItem("name", result?.user?.displayName);
                localStorage.setItem("id", result?.user?.uid);
                localStorage.setItem("type", "old");
                // window.location.replace(Paths.Dashboard);
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
                const result = await createUserWithEmailAndPassword(auth, form.values.email, form.values.password);
                const userName = result?.user?.displayName;
                if (type === 'register') {
                    const names = userName?.split(" ");
                    await createUser({
                        variables: {
                            user: {
                                id: result?.user?.uid,
                                FirstName: names[0] || '',
                                LastName: names[1] || '',
                            }
                        }
                    }).then(() => {
                        localStorage.setItem("token", result.user.accessToken);
                        localStorage.setItem("name", userName);
                        localStorage.setItem("id", result?.user?.uid);
                        localStorage.setItem("type", "new");
                        // window.location.replace(Paths.SecondSignup);
                    }).catch(err => {
                        setError(err.message);
                        const time = setTimeout(() => setError(null), 3000);
                        return () => clearTimeout(time);
                    });
                }
            }
            // window.location.replace(Paths.Dashboard);
        } catch (err) {
            setError("Check your email and password please");
            const time = setTimeout(() => setError(null), 3000);
            return () => clearTimeout(time);
        }
    }

    const signInByGoogle = async (e) => {
        e.preventDefault();
        try {
            const provider = new GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

            const result = await signInWithPopup(auth, provider);

            const userName = result?.user?.displayName;

            const names = userName?.split(" ");
            const FirstName = names[0] || '';
            names[0] = "";
            const LastName = names?.join(" ") || '';

            const user = await createUser({
                variables: {
                    user: {
                        id: result?.user?.uid,
                        FirstName: FirstName,
                        LastName: LastName,
                    }
                }
            });

            if (user?.data?.createNewUser?.type == "new") {
                localStorage.setItem("type", "new");
                localStorage.setItem("token", result?.user?.accessToken);
                localStorage.setItem("name", userName);
                localStorage.setItem("id", result?.user?.uid);
            } else if (user?.data?.createNewUser?.type == "old" && user?.data?.createNewUser?.IsActive == true) {
                localStorage.setItem("type", "old");
                localStorage.setItem("token", result?.user?.accessToken);
                localStorage.setItem("name", userName);
                localStorage.setItem("id", result?.user?.uid);
            } else {
                setError("You are not active user");
                const time = setTimeout(() => setError(null), 3000);
                return () => clearTimeout(time);
            }


        } catch (err) {
            setError(err.message);
            const time = setTimeout(() => setError(null), 3000);
            return () => clearTimeout(time);
        }
    }

    const signInByGithub = async (e) => {
        e.preventDefault();
        try {
            const provider = new GithubAuthProvider();

            const result = await signInWithRedirect(auth, provider);
            const userName = result?.user?.displayName;
            // localStorage.removeItem("token");
            if (type === 'register') {
                const names = userName?.split(" ");
                const re = await createUser({
                    variables: {
                        user: {
                            id: result?.user?.uid,
                            FirstName: names[0] || '',
                            LastName: names[1] || '',
                        }
                    }
                }).then(() => {
                    window.location.replace(Paths.SecondSignup);
                }).catch(err => {
                    setError(err.message);
                    const time = setTimeout(() => setError(null), 3000);
                    return () => clearTimeout(time);
                });
            }

            localStorage.setItem("token", result.user.accessToken);
            localStorage.setItem("name", userName);
            localStorage.setItem("id", result?.user?.uid);
            window.location.replace(Paths.Home);

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
                <Alert text={error} color="red" title="Error" />
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
                        <Button onClick={() => toggle()} w={"100%"} radius="md" variant="filled" color="green" size="md">Create Account</Button>

                    )}
                    {
                        type === 'register' && (
                            <Button onClick={() => toggle()} w={"100%"} radius="md" variant="filled" color="green" size="md">Login</Button>
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
                        <GoogleButton onClick={signInByGoogle} radius="xl">Google</GoogleButton>
                        <GithubButton onClick={signInByGithub} radius="xl"> Github </GithubButton>
                    </Group>

                    <Divider label="Or continue with email" labelPosition="center" my="lg" />

                    <form onSubmit={form.onSubmit(() => { })}>
                        <Stack>
                            {type === 'register' && (
                                <TextInput
                                    label="Full Name"
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
                                        <Anchor component="button" size="sm" onClick={() => {
                                            window.location.replace(Paths.ForgetPassword);
                                        }}>
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

export function GithubButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
    return <Button leftSection={<FaGithub />} variant="default" {...props} />;
}

export default Login
