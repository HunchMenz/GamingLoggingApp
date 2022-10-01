import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function SearchUsers() {
  const [searchResult, setSearchResult] = useState([]);

  const fetchUserResults = async (searchUsername) => {
    if (searchUsername.length > 0) {
      const foundUsers = await fetch(
        "/api/user/search?" +
          new URLSearchParams({
            username: searchUsername,
          }),
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((response) => response.data);
      console.log(foundUsers);
      setSearchResult(foundUsers);
    } else {
      setSearchResult([]);
    }
  };
  return (
    <div className="flex flex-col h-[91.9vh]">
      <div className="flex-initial">
        <h1 className="text-4xl m-6 font-bold underline decoration-blue-500 decoration-2 w-full text-center text-base-content">
          Search User by Username!
        </h1>
        <div className="flex justify-center pb-10">
          <input
            type="text"
            placeholder="Username"
            className="input w-1/3 bg-base-200"
            onChange={(e) => {
              fetchUserResults(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="bg-base-200 flex-1"></div>
    </div>
  );
}

export default SearchUsers;
