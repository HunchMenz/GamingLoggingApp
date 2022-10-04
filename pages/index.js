// Components
import { data } from "autoprefixer";
import Slider from "../components/Slider";

// IGDB requests
import requests from "../utils/requests";

export default function Home({ homeCarousels }) {
  return (
    <div>
      Temp Words
      {homeCarousels.map((data, idx) => {
        console.log(`home_${idx}${data.id}`);
        return (
          <div key={`home_${idx}${data.id}`}>
            <Slider gameProp={data.result} sliderTitle={data.name} />
          </div>
        );
      })}
      <button onClick={() => handleTest()}>Tester</button>
    </div>
  );
}

export async function getServerSideProps() {
  // IGDB \\
  const igdbEndpoint = "multiquery";
  const homeQueries = requests.home;

  // Get queries and seperate them in an array
  let queries = [];
  const queryIds = [];
  let idx = 0;
  for (const req in homeQueries) {
    queries[Math.floor(idx / 10).toString()] =
      (queries[Math.floor(idx / 10).toString()] ?? "") +
      `query games "${homeQueries[req].title}" { ${homeQueries[req].query} };`;

    queryIds.push(homeQueries[req].id);
    idx++;
  }

  // Create array of promises from query bodies
  let pArr = [];
  queries.forEach((query) => {
    pArr.push(
      fetch(`${process.env.NEXTAUTH_URL}/api/igdb`, {
        method: "POST",
        body: JSON.stringify({ query: query, endpoint: igdbEndpoint }),
      }).then((resp) => resp.json().then((res) => res.data))
    );
  });

  // resolve promises
  const res = await Promise.all(pArr);

  const carouselData = res.flat().map((data, idx) => {
    return { ...data, id: queryIds[idx] };
  });

  return {
    props: { homeCarousels: carouselData, queryIds: queryIds },
  };
}
