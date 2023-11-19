import React, { FormEvent, useRef } from 'react'
import Template from './pageTemplate'
import { useRouter } from 'next/navigation'
import { loginMutation } from '@/app/services/mutationReg.service';

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

    const params: Params = {
            
      email: emailRef.current?.value,
      password: passwordRef.current?.value,

    };

    const { mutate } = loginMutation(params);

    const onSubmit = (event: FormEvent<HTMLFormElement>):void => {

      event.preventDefault();

      fetchProfile();

    };

    const fetchProfile = ():void => {

      params.email = emailRef.current?.value;
      params.password = passwordRef.current?.value;

      mutate(params, {
        onSuccess: async (data) => {

          let info = await data.json();

          console.log(info.token.access);
          router.push('/joblist');

        },
        onError: (error) => {

          console.log(error);

        },
      });
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