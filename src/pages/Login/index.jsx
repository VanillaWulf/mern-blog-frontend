import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const { register, handleSubmit, setError, formState: {errors, isValid} } = useForm({
        defaultValues: {
            email: 'test@mail.ty',
            password: '123456'
        },
        mode: 'OnChange'
    });

    const onSubmit = (values) => {
        dispatch(fetchAuth(values));
    };

    console.log('auth', isAuth);

    if (isAuth) {
        return <Navigate to="/" />
    }

      return (
        <Paper classes={{ root: styles.root }}>
          <Typography classes={{ root: styles.title }} variant="h5">
            Вход в аккаунт
          </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    error = {Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    fullWidth
                    type='email'
                    {... register('email', {required: 'укажите почту'})}
                />
                <TextField
                    className={styles.field}
                    label="Пароль"
                    fullWidth
                    error = {Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {... register('password', {required: 'укажите  pass'})}
                />
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Войти
                </Button>

            </form>
        </Paper>
    );
};
