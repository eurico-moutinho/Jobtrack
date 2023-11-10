import React, { FormEvent, useEffect, useRef } from 'react'
import Template from './pageTemplate'
import { useRouter } from 'next/navigation';

interface LoginProps {

    changeFn: (page: string) => void;

}

const Login: React.FC<LoginProps> = ({ changeFn }) => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const abortController = new AbortController();

    useEffect(() => {
        return () => {
          abortController.abort();
        };
      }, []);

    const onSubmit = (event: FormEvent<HTMLFormElement>):void => {

        event.preventDefault();

        const secretKey = process.env.NEXT_PUBLIC_API_URL;

        fetch(`${secretKey}/login/`, {
            signal: abortController.signal,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
            })
        }).then(res => {

            if (res.ok) {

              return res.json();

            } else {

              throw new Error('Invalid login');

            }

        }).then(res => {

            console.log(res.token.access);

            router.push('/joblist');

        }).catch(e => console.log(e));

    };

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