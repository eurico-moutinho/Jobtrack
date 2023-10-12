import React from 'react'
import Template from './pageTemplate'

interface ForgotPassProps {

    changeFn: (page: string) => void;

}

const ForgotPass: React.FC<ForgotPassProps> = ({ changeFn }) => {

    return (

        <Template changeFn={changeFn} />

    )
}

export default ForgotPass