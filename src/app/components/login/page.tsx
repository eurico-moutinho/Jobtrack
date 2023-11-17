import React, { FormEvent, useRef } from 'react'
import Template from './pageTemplate'
import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'

interface LoginProps {

    changeFn: (page: string) => void;

}

interface Params {

    email: string | undefined,
    password: string | undefined

}

const Login: React.FC<LoginProps> = ({ changeFn }) => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const loginMutation = useMutation((params: Params) => {

      const secretKey = process.env.NEXT_PUBLIC_API_URL;
  
      return fetch(`${secretKey}/login/`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
        
      }).then((res) => {

        if (res.ok) {

          return res.json();

        } else {

          throw new Error('Invalid login');
          
        }
      });
    });

    const onSubmit = (event: FormEvent<HTMLFormElement>):void => {

        event.preventDefault();

        fetchProfile();

    };

    const fetchProfile = ():void => {

        const params: Params = {
            
            email: emailRef.current?.value,
            password: passwordRef.current?.value,

        }

        loginMutation.mutate(params);

        if (loginMutation.isSuccess) {

            console.log(loginMutation.data?.token.access);
            router.push('/joblist');

        }
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