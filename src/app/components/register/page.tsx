import React, { useState, FormEvent } from 'react'
import Template from './pageTemplate'

interface RegisterProps {

    changeFn: (page: string) => void;

}

const Register: React.FC<RegisterProps> = ({ changeFn }) => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
        
        event.preventDefault();

        fetch('http://127.0.0.1:8000/register/', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                password,
                confirmPassword,
            })
        }).then( req => console.log(req));

    };

    return (

        <Template
            changeFn={changeFn}
            onSubmit={onSubmit}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            name={name}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
        />

    )
}

export default Register