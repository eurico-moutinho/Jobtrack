import React, { FormEvent, useState, useRef } from 'react'
import Template from './pageTemplate'
import {emailValidator, passwordValidator, passwordComparison} from '@/app/services/validator.service'
import { regMutation } from '@/app/services/mutationReg.service';

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

  const params: Params = {

    name: nameRef.current?.value,
    email: emailRef.current?.value,
    password: passwordRef.current?.value,

  }

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
      
      event.preventDefault();

      fetchData();

  };

  const { mutate } = regMutation(params);

  const fetchData = ():void => {

    params.name = nameRef.current?.value;
    params.email = emailRef.current?.value;
    params.password = passwordRef.current?.value;

    const validateEmail: boolean = emailValidator(params.email);

    const validatePassword: boolean = passwordValidator(params.password);

    const comparePassword: boolean = passwordComparison(params.password, confirmPasswordRef.current?.value);

    setPasswordSim(!comparePassword);

    if(validateEmail && validatePassword){

      mutate(params, {

        onSuccess: async () => {

          changeFn('login');

        },
        onError: (error) => {

          console.log(error);

        },
      });

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