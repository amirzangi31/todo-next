import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function SignupPage() {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const signup = async (e) => {
        e.preventDefault();
        setLoading(true)
        const res = await fetch("/api/auth/signup", {
            method: 'POST',
            body: JSON.stringify({
                email, password
            }),
            headers: {
                'Content-type': "application/json"
            }
        })
        const data = await res.json()
        if (data.status === "success") {
            router.push("/signin")
            setLoading(false)
        }
    }

    const { status } = useSession()
    useEffect(() => {
        if (status === "authenticated") router.replace("/")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])


    return (
        <div className='signin-form'>
            <h3>Registeration Form </h3>
            <input type="text" name="email" placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={signup} disabled={loading}  >{loading ? "Loading..." : "Register"}</button>

            <div>
                <p>Have an account ? </p>
                <Link href={"/signin"} >SignIn</Link>
            </div>
        </div>
    )
}

export default SignupPage