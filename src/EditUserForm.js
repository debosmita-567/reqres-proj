import React, { useState } from "react";

function EditUserForm({ user, updateUserDetails }) {
  const [editedUser, setEditedUser] = useState({ ...user });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the parent component's function to update user details
    updateUserDetails(editedUser);
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">User Id:</label> <br />
          <input
            type="text"
            id="userId"
            name="userId"
            value={editedUser.id}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="first_name">First Name:</label> <br />
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={editedUser.first_name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="last_name">Last Name:</label> <br />
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={editedUser.last_name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label> <br />
          <input
            type="email"
            id="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" style={{ margin: "1%", fontSize: "large" }}>
          Save
        </button>
      </form>
    </div>
  );
}

export default EditUserForm;
