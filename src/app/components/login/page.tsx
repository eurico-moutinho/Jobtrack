import React from 'react'
import Template from './pageTemplate'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface LoginProps {

    changeFn: (page: string) => void;

}

const Login: React.FC<LoginProps> = ({ changeFn }) => {

    const { data: session } = useSession()

    return (

        <Template changeFn={changeFn} />

    )
}

export default Login