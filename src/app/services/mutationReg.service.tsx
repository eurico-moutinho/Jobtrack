import { useMutation, UseMutationResult } from 'react-query'
import { URL } from 'url'


interface Params {

    name?: string | undefined,
    email: string | undefined,
    password: string | undefined,

}

interface Url {

    login: string,
    register: string,

};

const secretKey = process.env.NEXT_PUBLIC_API_URL;

let url: Url = {

    login: `${secretKey}/login/`,
    register: `${secretKey}/register/`

};

const loginMutation = (params: Params): UseMutationResult<Response, Error> => {

    return useMutation(() => {
    
        return fetch(url.login, {
  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
          
        });
    });
}

const regMutation = (params: Params): UseMutationResult<Response, Error> => {

    return useMutation(() => {
    
        return fetch(url.register, {
  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
          
        });
    });
}

export {loginMutation, regMutation}