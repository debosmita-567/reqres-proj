import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import EditUserForm from "./EditUserForm";

export default function App() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [searchText, setSearchText] = useState("");

  // EDIT USER DETAILS STATE
  const [editUserId, setEditUserId] = useState(null);

  // EDIT FUNCTIONS
  const handleEdit = (userId) => {
    setEditUserId(userId);
  };

  const updateUserDetails = (editedUser) => {
    // Update the user's details in the users array
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
    );

    // Close the edit form
    setEditUserId(null);
  };

  // CREATE USER FORM STATES
  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // You can perform actions with the form data here, like submitting it or dispatching it to a Redux store.
    console.log("Form data submitted:", formData);
    setUsers([...users, formData]);
    setSearchUser([...users, formData]);
    setFormData({
      id: "",
      first_name: "",
      last_name: "",
      email: "",
    });
  };

  // THIS FUNCTION IS USED TO DELETE USER FORM USE STATE ARRAY OF OBJECTS
  const deleteUser = (idToDelete) => {
    // Use the filter method to create a new array without the user with the specified id
    const updatedUsers = users.filter((user) => user.id !== idToDelete);
    setUsers(updatedUsers);
  };

  // THIS IS A CONST FUNCTION PREVIOUSLY USED
  // const getUsers = () => {
  //   axios.get("https://reqres.in/api/users?page=1").then((res) => {
  //     console.log("fetching success!")
  //     console.log(res.data.data)
  //     setUsers(res.data.data);
  //     setSearchUser(res.data.data);
  //   });
  // };
  // FUNCTION ENDS HERE.....
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setUsers(searchUser);
    } else {
      const searchResults = searchUser.filter(
        (user) =>
          user.first_name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          user.last_name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setUsers(searchResults);
    }
  };
  useEffect(() => {
    async function getUsers() {
      try {
        let allUsers = [];
        const totalPages = 2;
        for (let page = 1; page <= totalPages; page++) {
          const response = await axios.get(
            `https://reqres.in/api/users?page=${page}`
          );
          allUsers = allUsers.concat(response.data.data);
        }
        setUsers(allUsers);
        setSearchUser(allUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getUsers();
  }, []);
  return (
    <div className="App">
      <h1>Debo's Table</h1>
      <div className="searchDiv">
        <input
          type="search"
          placeholder="Search User..."
          value={searchText}
          onChange={(e) => {
            handleSearch(e);
          }}
        />
      </div>

      {/* create div */}
      <div>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="id">User ID:</label> <br />
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="first_name">First Name:</label> <br />
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name:</label> <br />
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email ID:</label> <br />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <button type="submit" style={{ margin: "1%", fontSize: "large" }}>
              Create User
            </button>
          </div>
        </form>
      </div>
      {/* create div ends here */}

      {/* EDIT FORM IMPORTED FROM EditUserForm.js File */}
      {editUserId && (
        <EditUserForm
          user={users.find((user) => user.id === editUserId)}
          updateUserDetails={updateUserDetails}
        />
      )}
      {/* EDIT FORM ENDS HERE */}
      {users.length > 0 ? (
        <table>
          <tr id={0}>
            <th>User Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email-Id</th>
            <th>Action</th>
          </tr>
          {users.map((user) => {
            const { id, first_name, last_name, email } = user;
            return (
              <>
                <tr key={id}>
                  <td>{id}</td>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{email}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(id)}>
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      ) : (
        <div>
          <h2>No Data Found</h2>
        </div>
      )}
    </div>
  );
}

