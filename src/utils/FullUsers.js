// For retrieving the records of full users from the API to use in other components

// React imports
import { useEffect, useState } from "react";
// Library imports
import axios from "axios";
// Local imports
import { apiUrl } from "./ApiUrl";
import { jwtToken } from "./LocalStorage";

export default function FullUsers() {
  const [fullUsers, setFullUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + "users/all/fullusers", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        const sortedUsers = response.data.Users.sort((a, b) =>
          `${a.name.first} ${a.name.last}`.localeCompare(
            `${b.name.first} ${b.name.last}`
          )
        );

        setFullUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { fullUsers, loading };
}
