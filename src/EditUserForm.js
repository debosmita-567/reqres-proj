import React, { useState } from "react";

function EditUserForm({ user, updateUserDetails, mode, onCancel }) {
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

    // Call the parent component's function to update or create user details
    if(editedUser.id==="" || editedUser.first_name==="" || editedUser.last_name==="" || editedUser.email===""){
      alert("Please fill all the fields in the form before submitting!");
    }
    else updateUserDetails(editedUser, mode);
  };

  return (
    <div className="create-user-form">
      <div className="form-container">
        <h2>{mode === "edit" ? "Edit User" : "Create User"}</h2>
        <form onSubmit={handleSubmit}>
          {mode === "create" && (
            <div>
              <label htmlFor="userId">User ID:</label> <br />
              <input
                type="text"
                id="userId"
                name="id"
                value={editedUser.id}
                onChange={handleInputChange}
              />
            </div>
          )}

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

          <button type="submit">
            {mode === "edit" ? "Save" : "Create"}
          </button>

          {/* Cancel button to close the form */}
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUserForm;
