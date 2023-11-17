"use client";
import React, { useState, useEffect } from 'react'
import Template from './pageTemplate'
import Login from '../login/page'
import Register from '../register/page'
import ForgotPass from '../forgotpass/page';
import { QueryClient, QueryClientProvider } from 'react-query';

const Authentication: React.FC = () => {

    const queryClient = new QueryClient();

    const [form, setForm] = useState<string>('login');

    const changeForm = (page: string): void => {

        setForm(page);

    }

    return (
        <QueryClientProvider client={queryClient}>

            <Template form={form}>

                {form === 'login' ? <Login changeFn={changeForm} /> : form === 'register' ? <Register changeFn={changeForm} /> : <ForgotPass changeFn={changeForm} />}

            </Template>

        </QueryClientProvider>

    )
}

export default Authentication