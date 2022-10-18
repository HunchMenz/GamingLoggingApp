import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Import Hook
// import useFitText from "../../utils/hooks/useFitText";

// Icons
import { AiOutlineSearch, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function SearchUsers() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const igdbSearchEndpoint = "games";

  const fetchSearchResults = async (searchPhrase) => {
    if (searchPhrase.length > 0) {
      const searchQuery = `fields *, cover.url; search "${searchPhrase}"; limit 10;`;
      const foundResults = await fetch("/api/igdb", {
        method: "POST",
        body: JSON.stringify({
          query: searchQuery,
          endpoint: igdbSearchEndpoint,
        }),
      })
        .then((res) => res.json())
        .then((response) => response.data);
      if (foundResults) {
        // console.log(foundResults);
        setSearchResult(foundResults);
      }
    } else {
      setSearchResult([]);
    }
  };
  return (
    <div className="flex flex-col h-[90vh] text-base-content overflow-x-hidden">
      <div className="flex-initial">
        <h1 className="text-4xl m-6 font-bold underline decoration-blue-500 decoration-2 w-full text-center text-base-content">
          Search Game by Game Title!
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchSearchResults(searchPhrase);
          }}
        >
          <div className="justify-center flex w-full mb-10">
            <div className="w-1/4">
              <p className="relative grow">
                <input
                  type="text"
                  placeholder="Search"
                  className="input bg-base-200 px-10 w-full"
                  onChange={(e) => setSearchPhrase(e.target.value)}
                />
                <button type="submit">
                  <span className="absolute h-[3.0em] w-[2.5em] z-10 top-0 items-center inline-flex justify-center right-0">
                    <AiOutlineSearch />
                  </span>
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-base-200 flex flex-row justify-end">
        <div className="flex-initial bg-base-300 w-1/6 h-96">
          FILTER OPTIONS GO HERE
        </div>
        <div className="flex-1">
          {searchResult.length > 0 &&
            searchResult.map((game) => {
              return (
                <div
                  className="flex items-center gap-4 p-4"
                  key={`search_${game.id}`}
                >
                  {/* div wrapping game name, rating, systems (maybe), and summary */}
                  <div className="card card-side backdrop-blur-xl backdrop-brightness-150 w-full">
                    <Link
                      href={{
                        pathname: "/games/[name]",
                        query: { name: game.slug },
                      }}
                    >
                      <a>
                        <div className="relative w-52 h-[17rem]">
                          <Image
                            src={
                              game.cover
                                ? "https:" +
                                  game.cover.url
                                    .replace("t_thumb", "t_cover_big")
                                    .replace(".jpg", ".png")
                                : "https://bulma.io/images/placeholders/128x128.png"
                            }
                            width={300}
                            height={400}
                            objectFit="contain"
                          />
                        </div>
                      </a>
                    </Link>
                    <div className="card-body">
                      <div className="card-title text-white h-14 w-11/12 line-clamp-1">
                        {`${game.name}`}
                      </div>
                      <h2 className="card-title text-white text-2xl">
                        Rating: {game.rating?.toFixed(0)}
                      </h2>
                      <div className="divider"></div>
                      <div className="text-white text-left line-clamp-2">
                        {game.summary}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          {searchResult.length > 0 && (
            <div className="btn-group justify-center items-center">
              <AiOutlineLeft />
              <button className="btn">1</button>
              <button className="btn">2</button>
              <button className="btn btn-disabled">...</button>
              <button className="btn">99</button>
              <button className="btn">100</button>
              <AiOutlineRight />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchUsers;
