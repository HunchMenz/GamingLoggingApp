import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Import Hook
// import useFitText from "../../utils/hooks/useFitText";

// Icons
import { AiOutlineSearch, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function SearchUsers({ searchQueryResults = [], searchQueryCount = -1 }) {
  const router = useRouter();

  const [searchPhrase, setSearchPhrase] = useState(
    router.query.keyphrase ?? ""
  );
  const [searchResult, setSearchResult] = useState(searchQueryResults);

  // Pagination Values
  const [limit, setlimit] = useState(10);
  const [offset, setOffset] = useState(router.query.keyphrase ? 0 : -1);

  const [searchCount, setSearchCount] = useState(searchQueryCount);

  const igdbSearchEndpoint = "games";

  const fetchSearchResults = async () => {
    if (searchPhrase?.length > 0) {
      const searchQuery = `fields *, cover.url; search "${searchPhrase}"; limit ${limit}; offset ${offset};`;
      let count = searchCount;

      if (count === 0) {
        // Get count of search result
        const queryCount = await fetch("/api/igdb", {
          method: "POST",
          body: JSON.stringify({
            query: searchQuery,
            endpoint: igdbSearchEndpoint + "/count",
          }),
        })
          .then((res) => res.json())
          .then((response) => response.data);
        if (queryCount) {
          count = queryCount.count;
          setSearchCount(queryCount.count);
        }
      }

      if (count > 0) {
        // Retrieve data using search phrase
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
          if (foundResults?.length > 0) {
            setSearchResult(foundResults);
          } else {
            offset !== 0 && setOffset(offset - limit);
          }
        }
      }
    } else {
      setSearchResult([]);
    }
  };

  // Check if we should increment a page. Only fetch data when offset is changed or when limit is changed.
  useEffect(() => {
    if (searchCount > 0) fetchSearchResults();
  }, [limit, offset]);

  //  Check if we are trying to rerender the page. We need a second use effect, because
  // the first one would cause a duplicate call on search. This is to avoid making unnecessary calls
  useEffect(() => {
    if (searchCount === 0) {
      fetchSearchResults();
    }
  }, [searchCount]);

  return (
    <div className="flex flex-col h-[90vh] text-base-content overflow-x-hidden px-10">
      <div className="flex-initial">
        <h1 className="text-4xl m-6 font-bold underline decoration-blue-500 decoration-2 w-full text-center text-base-content">
          Search Game by Game Title!
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOffset(0);
            setSearchCount(0);
            if (router.query.keyphrase)
              router.replace("/games/search", undefined, { shallow: true });
          }}
        >
          <div className="justify-center flex w-full mb-10">
            <div className="w-1/4">
              <p className="relative grow">
                <input
                  type="text"
                  placeholder="Search"
                  className="input bg-base-200 pr-10 w-full"
                  value={searchPhrase}
                  onChange={(e) => {
                    setSearchPhrase(e.target.value);
                  }}
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

      <div className="flex flex-row justify-end">
        <div className="absolute inset-x-0 bg-base-300 w-1/6 h-96">
          FILTER OPTIONS GO HERE
        </div>
        <div className="bg-base-200 flex-0 w-5/6">
          {searchResult?.length > 0 &&
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

          {searchResult?.length > 0 && (
            <div className="btn-group justify-center items-center">
              {offset / limit > 0 ? (
                <>
                  <button
                    className="btn"
                    onClick={() =>
                      offset !== 0 ? setOffset(offset - limit) : setOffset(0)
                    }
                  >
                    <AiOutlineLeft />
                  </button>

                  {offset / limit - 1 > 0 && (
                    <button
                      className="btn"
                      onClick={() => setOffset(offset - limit * 2)}
                    >
                      {offset / limit - 1}
                    </button>
                  )}

                  <button
                    className="btn"
                    onClick={() => setOffset(offset - limit)}
                  >
                    {offset / limit}
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-disabled"
                  onClick={() =>
                    offset !== 0 ? setOffset(offset - limit) : setOffset(0)
                  }
                >
                  <AiOutlineLeft />
                </button>
              )}
              <button className="btn btn-disabled">...</button>
              {offset < searchCount - (searchCount % limit) ? (
                <>
                  {offset <
                    searchCount - limit - ((searchCount - limit) % limit) && (
                    <button
                      className="btn"
                      onClick={() =>
                        setOffset(
                          searchCount - limit - ((searchCount - limit) % limit)
                        )
                      }
                    >
                      {Math.ceil(searchCount / limit) - 1}
                    </button>
                  )}

                  <button
                    className="btn"
                    onClick={() =>
                      setOffset(searchCount - (searchCount % limit))
                    }
                  >
                    {Math.ceil(searchCount / limit)}
                  </button>
                  <button
                    className="btn"
                    onClick={() =>
                      offset < searchCount - limit && setOffset(offset + limit)
                    }
                  >
                    <AiOutlineRight />
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-disabled"
                  onClick={() =>
                    offset < searchCount - limit && setOffset(offset + limit)
                  }
                >
                  <AiOutlineRight />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { keyphrase } = context.query;
  const igdbSearchEndpoint = "games";

  let searchQueryResults = [];
  let searchQueryCount = -1;

  if (keyphrase?.length > 0) {
    const searchQuery = `fields *, cover.url; search "${keyphrase}"; limit 10;`;

    // Search Count
    const queryCount = await fetch(`${process.env.NEXTAUTH_URL}/api/igdb`, {
      method: "POST",
      body: JSON.stringify({
        query: searchQuery,
        endpoint: igdbSearchEndpoint + "/count",
      }),
    })
      .then((res) => res.json())
      .then((response) => response.data);
    if (queryCount) {
      searchQueryCount = queryCount.count;
    }

    // Search results
    const foundResults = await fetch(`${process.env.NEXTAUTH_URL}/api/igdb`, {
      method: "POST",
      body: JSON.stringify({
        query: searchQuery,
        endpoint: igdbSearchEndpoint,
      }),
    })
      .then((res) => res.json())
      .then((response) => response.data);
    if (foundResults) {
      searchQueryResults = foundResults;
    }
  }

  return {
    props: {
      searchQueryResults: searchQueryResults,
      searchQueryCount: searchQueryCount,
    },
  };
}

export default SearchUsers;
