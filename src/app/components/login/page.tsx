import React, { useState, FormEvent } from 'react'
import Template from './pageTemplate'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface LoginProps {

    changeFn: (page: string) => void;

}

const Login: React.FC<LoginProps> = ({ changeFn }) => {

    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');

    const onSubmit = (event: FormEvent<HTMLFormElement>):void => {

        event.preventDefault();

        fetch('http://127.0.0.1:8000/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            })
        }).then( req => console.log(req));

    };

    return (

        <Template
            changeFn={changeFn}
            onSubmit={onSubmit}
            setEmail={setEmail}
            setPassword={setPassword}
            email={email}
            password={password}
        />

    )
}

export default Login