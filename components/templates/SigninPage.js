import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { signIn, useSession } from 'next-auth/react'


function SigninPage() {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()


    const { status } = useSession()
    useEffect(() => {
        if (status === "authenticated") router.replace("/")

     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])



    const signInHandler = async (e) => {
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        
        if (!res.error) router.push("/")
    }



    return (
        <div className='signin-form'>
            <h3>Login Form </h3>
            <input type="text" name="email" placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={signInHandler} >Login</button>
            <div>
                <p>Create an account ? </p>
                <Link href={"/signup"} >SignUp</Link>
            </div>
        </div>
    )
}

export default SigninPage