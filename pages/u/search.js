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
    <div className="flex flex-col h-[90vh] overflow-hidden">
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
      <div className="bg-base-200 flex-1">
        {searchResult.length > 0 &&
          searchResult.map((user) => (
            <div
              className="flex items-center gap-4 p-4"
              key={`search_${user._id}`}
            >
              <Link href={`/u/${user.username}/list`}>
                <a>
                  <div className="w-12 h-12 border border-base-300 rounded-full">
                    <Image
                      src={user.image}
                      layout="responsive"
                      objectFit="contain"
                      width={500}
                      height={500}
                      className="rounded-full"
                    />
                  </div>
                </a>
              </Link>
              <div className="flex flex-col">
                <Link href={`/u/${user.username}/list`}>
                  <a>
                    <strong className="text-base-content text-sm font-medium">
                      {user.username}
                    </strong>
                  </a>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchUsers;
