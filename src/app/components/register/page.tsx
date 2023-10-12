import React from 'react'
import Template from './pageTemplate'

interface RegisterProps {

    changeFn: (page: string) => void;

}

const Register: React.FC<RegisterProps> = ({ changeFn }) => {

    return (

        <Template changeFn={changeFn} />

    )
}

export default Register