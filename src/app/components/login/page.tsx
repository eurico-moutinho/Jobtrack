import React from 'react'
import Template from './pageTemplate'

interface LoginProps {

    changeFn: (page: string) => void;

}

const Login: React.FC<LoginProps> = ({ changeFn }) => {

    return (

        <Template changeFn={changeFn} />

    )
}

export default Login