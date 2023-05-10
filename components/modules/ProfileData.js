import Link from 'next/link'
import React from 'react'

function ProfileData({ data }) {
    return (
        <div className='profile-data'>
            <div>
                <span>Name : </span>
                <p>{data?.name} </p>
            </div>
            <div>
                <span>Last Name : </span>
                <p>{data?.lastName} </p>
            </div>
            <div>
                <span>Email : </span>
                <p>{data?.email} </p>
            </div>
            <Link href={"/profile/update"}>
                <button type="button" className='bg-gray-300' >Edit Profile</button>
            </Link>
        </div>
    )
}

export default ProfileData