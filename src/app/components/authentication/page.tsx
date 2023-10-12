"use client";
import React, { useState, useEffect } from 'react'
import Template from './pageTemplate'
import Login from '../login/page'
import Register from '../register/page'

const Authentication: React.FC = () => {

    const [form, setForm] = useState<string>('login');

    const changeForm = (page: string): void => {

        setForm(page);

    }

    return (

        <Template>

            {form === 'login' ? <Login changeFn={changeForm} /> : <Register changeFn={changeForm} />}

        </Template>

    )
}

export default Authentication