import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

// Icons
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");

  const igdbSearchEndpoint = "games";

  const goToSearch = (e) => {
    e.preventDefault();

    // Clear searchbar
    setSearchPhrase("");
    setSearchResult([]);

    window.location = `/games/search?${new URLSearchParams({
      keyphrase: searchPhrase,
    })}`;

    // Router.push(
    //   {
    //     pathname: "/games/search",
    //     query: { keyphrase: searchPhrase },
    //   },
    //   undefined
    // );
  };

  // Perform data fetch AFTER short delay. Prevents search onChange.
  useEffect(() => {
    const delayFetchFn = setTimeout(async () => {
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
          setSearchResult(foundResults);
        }
      } else {
        setSearchResult([]);
      }
    }, 500);

    return () => clearTimeout(delayFetchFn);
  }, [searchPhrase]);

  return (
    <form onSubmit={(e) => goToSearch(e)}>
      <div className="box-border clear-both relative">
        <input
          value={searchPhrase}
          type="text"
          placeholder="Search"
          className="input input-bordered w-full pr-10"
          //   onChange={(e) => fetchSearchResults(e)}
          onChange={(e) => setSearchPhrase(e.target.value)}
        />

        <button type="submit">
          <span className="absolute h-[3.0em] w-[2.5em] z-10 top-0 items-center inline-flex justify-center right-0">
            <AiOutlineSearch />
          </span>
        </button>
      </div>
      <div className="absolute z-10 overflow-auto max-h-72 min-w-xs max-w-xs mx-auto bg-neutral text-neutral-content shadow-lg ring-1 ring-black/5 flex flex-col divide-y px-2 mt-[21rem] right-[14.7rem] scrollbar-hide">
        {searchResult.length > 0 &&
          searchResult.map((game) => {
            return (
              <div
                className="flex items-center gap-4 p-4"
                key={`search_${game.id}`}
              >
                <Link
                  href={{
                    pathname: "/games/[name]",
                    query: { name: game.slug },
                  }}
                >
                  <a
                    onClick={() => {
                      setSearchPhrase("");
                      setSearchResult([]);
                    }}
                  >
                    {game.name}
                  </a>
                </Link>
              </div>
            );
          })}
      </div>
    </form>
  );
}

export default SearchBar;
