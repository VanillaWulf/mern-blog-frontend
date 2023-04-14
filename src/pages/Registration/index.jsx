import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
        defaultValues: {
            fullName: 'any name',
            email: 'anyname@mail.ty',
            password: '1234'
        },
        mode: 'OnChange'
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values));
        if (!data.payload) {
            alert('не удалось авторизоваться')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        } else {
            alert('не удалось авторизоваться')
        }
    };

    if (isAuth) {
        return <Navigate to="/" />
    }

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{width: 100, height: 100}}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="Полное имя"
                    fullWidth
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    {... register('fullName', {required: 'укажите pass'})}
                />
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    type="email"
                    fullWidth
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {... register('email', {required: 'укажите почту'})}
                />
                <TextField
                    className={styles.field}
                    label="Пароль"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {... register('password', {required: 'укажите pass'})}
                    fullWidth/>
                <Button disabled={!isValid} size="large" variant="contained" fullWidth type="submit">
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>
    );
};
