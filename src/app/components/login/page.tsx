import React, { FormEvent, useRef } from 'react'
import Template from './pageTemplate'
import { useRouter } from 'next/navigation';

interface LoginProps {

    changeFn: (page: string) => void;

}

const Login: React.FC<LoginProps> = ({ changeFn }) => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const onSubmit = (event: FormEvent<HTMLFormElement>):void => {

        event.preventDefault();

        sendData();

    };

    const sendData = () => {

        const secretKey = process.env.NEXT_PUBLIC_API_URL;

        interface Params {

            email: string | undefined,
            password: string | undefined

        }

        const params: Params = {
            
            email: emailRef.current?.value,
            password: passwordRef.current?.value,

        }

        fetch(`${secretKey}/login/`, {

            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)

        }).then(res => {

            if (res.ok) {

              return res.json();

            } else {

              throw new Error('Invalid login');

            }

        }).then(res => {

            console.log(res.token.access);

            router.push('/joblist');

        }).catch(e => console.error('Error:', e));

    }

    return (

        <Template
            changeFn={changeFn}
            onSubmit={onSubmit}
            emailRef={emailRef}
            passwordRef={passwordRef}
        />

    )
}

export default Login