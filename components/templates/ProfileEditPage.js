import React, { useEffect, useState } from 'react'
import ProfileForm from '../modules/ProfileForm'
import { useRouter } from 'next/router';

function ProfileEditPage() {
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const fetchUser = async () => {

        const res = await fetch("/api/auth/profile");
        const data = await res.json();
        if (data.status === "success" && data.data.name && data.data.lastName) {
            setLoadingPage(false)
            setName(data.data.name)
            setLastName(data.data.lastName)
        }
    };

    useEffect(() => {

        fetchUser()


    }, [])


    const router = useRouter()
    const submitHandler = async () => {
        setLoading(true)
        const res = await fetch("/api/auth/profile", {
            method: "PATCH",
            body: JSON.stringify({ name, lastName, password }),
            headers: {
                "Content-type": "application/json",
            },
        });

        const data = await res.json();
        console.log(data)
        if (data.status === "success") {
            setLoading(false);
            router.push("/profile")
        }
    };

    if (loadingPage) return <h1 className='text-3xl'>Loading ... </h1>


    return (
        <ProfileForm
            name={name}
            lastName={lastName}
            password={password}
            setLastName={setLastName}
            setName={setName}
            setPassword={setPassword}
            submitHandler={submitHandler}
            loading={loading}
        />
    )
}

export default ProfileEditPage