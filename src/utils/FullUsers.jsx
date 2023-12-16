// WORK IN PROGRESS - COME BACK TO ME


import { useState, useEffect } from "react";

const API_URL =
  "https://weppreciate-api-05b8eaa3cdc2.herokuapp.com/users/all/fullusers";

const FullUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const { Users } = await response.json();
        setUsers(Users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const usersFormList = users
    .map(({ name }) => `${name.first} ${name.last}`)
    .sort()
    .map((name) => ({
      value: name,
      label: name,
    }));

    return usersFormList
};

export default FullUsers;
