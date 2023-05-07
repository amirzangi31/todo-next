import React, { useEffect, useState } from "react";

import { CgProfile } from "react-icons/cg";
import ProfileForm from "../modules/ProfileForm";
import ProfileData from "../modules/ProfileData";

function ProfilePage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await fetch("/api/auth/profile");
    const data = await res.json();

    if (data.status === "success" && data.data.name && data.data.lastName) {
      setData(data.data);
    }
  };

  const submitHandler = async () => {
    const res = await fetch("/api/auth/profile", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await res.json();
  };

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
        />
      )}
    </div>
  );
}

export default ProfilePage;
