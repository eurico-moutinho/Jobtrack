import React, { FormEvent, useState, useRef } from 'react'
import Template from './pageTemplate'
import {emailValidator, passwordValidator, passwordComparison} from '@/app/services/validator.service'
import { useMutation } from 'react-query'

interface RegisterProps {

    changeFn: (page: string) => void;

}

interface Params {

    name: string | undefined,
    email: string | undefined,
    password: string | undefined,

}

const Register: React.FC<RegisterProps> = ({ changeFn }) => {

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const [emailError, setEmailError] = useState<Boolean>(false);
    const [passwordError, setPasswordError] = useState<Boolean>(false);
    const [passwordSim, setPasswordSim] = useState<Boolean>(false);

    const registerMutation = useMutation((params: Params) => {

      const secretKey = process.env.NEXT_PUBLIC_API_URL;
  
      return fetch(`${secretKey}/register/`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
        
      }).then((res) => {

        if (res.ok) {

          return res.json();

        } else {

          throw new Error('Registration failed');

        }
      });

    });


    const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
        
        event.preventDefault();

        fetchData();

    };

    const fetchData = ():void => {

        const params: Params = {

            name: nameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,

        }

        const validateEmail: boolean = emailValidator(emailRef.current?.value);

        const validatePassword: boolean = passwordValidator(passwordRef.current?.value);

        const comparePassword: boolean = passwordComparison(passwordRef.current?.value, confirmPasswordRef.current?.value);

        comparePassword ? setPasswordSim(false) : setPasswordSim(true);

        if(validateEmail && validatePassword){

            registerMutation.mutate(params);

        }else if(!validateEmail && !validatePassword){

            setEmailError(true);

            setPasswordError(true);

        }else if(!validatePassword){

            setPasswordError(true);

        }else{

            setEmailError(true);

        }
    };

    return (

        <Template
            changeFn={changeFn}
            onSubmit={onSubmit}
            nameRef={nameRef}
            emailRef={emailRef}
            passwordRef={passwordRef}
            confirmPasswordRef={confirmPasswordRef}
            emailError={emailError}
            passwordError={passwordError}
            passwordSim={passwordSim}
        />

    )
}

export default Register