import React, { useState, FormEvent, useRef } from 'react'
import Template from './pageTemplate'

interface RegisterProps {

    changeFn: (page: string) => void;

}

const Register: React.FC<RegisterProps> = ({ changeFn }) => {

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
        
        event.preventDefault();

        const secretKey = process.env.NEXT_PUBLIC_API_URL;

        fetch(`${secretKey}/register/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
            })
        }).then( req => console.log(req));

    };

    return (

        <Template
            changeFn={changeFn}
            onSubmit={onSubmit}
            nameRef={nameRef}
            emailRef={emailRef}
            passwordRef={passwordRef}
            confirmPasswordRef={confirmPasswordRef}
        />

    )
}

export default Register