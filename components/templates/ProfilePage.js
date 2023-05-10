import React, { useEffect, useState } from "react";

import { CgProfile } from "react-icons/cg";
import ProfileForm from "../modules/ProfileForm";
import ProfileData from "../modules/ProfileData";
import { useRouter } from "next/router";

function ProfilePage() {
  const [loadingPage, setLoadingPage] = useState(true)
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false)
  const router = useRouter()


  useEffect(() => {
    fetchUser();
  }, [data]);

  const fetchUser = async () => {
    const res = await fetch("/api/auth/profile");
    const data = await res.json();
    setLoadingPage(false)
    if (data.status === "success" && data.data.name && data.data.lastName) {
      setData(data.data);
    }
  };

  const submitHandler = async () => {
    setLoading(true)
    const res = await fetch("/api/auth/profile", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await res.json();
    if (data.status === "success") {
      setLoading(false)
      router.reload()
    }
  };

  if (loadingPage === true) return <h1 className="text-2xl">Loading ... </h1>


  return (
    <div className="profile-form">
      <h2>
        <CgProfile /> Profile
      </h2>

      {data ? (
        <ProfileData data={data} />
      ) : (
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
      )}
    </div>
  );
}

export default ProfilePage;
