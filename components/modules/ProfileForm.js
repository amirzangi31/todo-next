import React from "react";

function ProfileForm({
  name,
  lastName,
  password,
  setLastName,
  setName,
  setPassword,
  submitHandler,
  loading
}) {
  return (
    <>
      <div className="profile-form__input">
        <div>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name : </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button onClick={submitHandler} disabled={loading}>{loading ? "loading ..." : "Update"}</button>
    </>
  );
}

export default ProfileForm;
