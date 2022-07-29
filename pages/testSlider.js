import React from "react";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import buildRequest from "../utils/buildRequest";
import requests from "../utils/requests";

function myCarousel({ gameMasterList, testList }) {
  return (
    <>
      <NavBar />

      {/* {console.log(testList[0].gameList)} */}
      {/* {console.log(testList[0].title)} */}

      <Slider gameProp={gameMasterList.gameList0} sliderTitle="Top Games" />
      <Slider gameProp={testList[0].gameList} sliderTitle={testList[0].title} />
      <Slider gameProp={testList[1].gameList} sliderTitle={testList[1].title} />
      <Slider gameProp={testList[2].gameList} sliderTitle={testList[2].title} />
      <Slider gameProp={testList[3].gameList} sliderTitle={testList[3].title} />
      <Slider gameProp={testList[4].gameList} sliderTitle={testList[4].title} />
      <Slider gameProp={testList[5].gameList} sliderTitle={testList[5].title} />
      <Slider gameProp={testList[6].gameList} sliderTitle={testList[6].title} />
      <Slider gameProp={testList[7].gameList} sliderTitle={testList[7].title} />
      <Slider gameProp={testList[8].gameList} sliderTitle={testList[8].title} />
      <Slider gameProp={testList[9].gameList} sliderTitle={testList[9].title} />
      <Slider
        gameProp={testList[10].gameList}
        sliderTitle={testList[10].title}
      />
      <Slider
        gameProp={testList[11].gameList}
        sliderTitle={testList[11].title}
      />
      <Slider
        gameProp={testList[12].gameList}
        sliderTitle={testList[12].title}
      />
      <Slider
        gameProp={testList[13].gameList}
        sliderTitle={testList[13].title}
      />
      <Slider
        gameProp={testList[14].gameList}
        sliderTitle={testList[14].title}
      />
      <Slider
        gameProp={testList[15].gameList}
        sliderTitle={testList[15].title}
      />
      <Slider
        gameProp={testList[16].gameList}
        sliderTitle={testList[16].title}
      />
      <Slider
        gameProp={testList[17].gameList}
        sliderTitle={testList[17].title}
      />
      <Slider
        gameProp={testList[18].gameList}
        sliderTitle={testList[18].title}
      />
      <Slider
        gameProp={testList[19].gameList}
        sliderTitle={testList[19].title}
      />
      <Slider
        gameProp={testList[20].gameList}
        sliderTitle={testList[20].title}
      />
      {/* <Slider
        gameProp={testList[21].gameList}
        sliderTitle={testList[21].title}
      /> */}
      {/* <Slider
        gameProp={testList[22].gameList}
        sliderTitle={testList[22].title}
      /> */}

      {/* <Slider
        gameProp={gameMasterList.gameList1}
        sliderTitle="Point and Click"
      />
      <Slider gameProp={gameMasterList.gameList2} sliderTitle="Fighting" />
      <Slider gameProp={gameMasterList.gameList3} sliderTitle="Shooter" />
      <Slider gameProp={gameMasterList.gameList4} sliderTitle="Music" />
      <Slider gameProp={gameMasterList.gameList5} sliderTitle="Platform" />
      <Slider gameProp={gameMasterList.gameList6} sliderTitle="Puzzle" />
      <Slider gameProp={gameMasterList.gameList7} sliderTitle="Racing" /> */}
    </>
  );
}

export async function getServerSideProps() {
  const fields = [
    "name",
    "slug",
    "cover.url",
    "genres",
    "genres.name",
    "platforms.abbreviation",
    "platforms.platform_logo.url",
    "total_rating",
    "release_dates.date",
    "aggregated_rating_count",
  ];

  const filter_0 =
    "sort aggregated_rating_count desc; where aggregated_rating >= 90; limit 20;";

  const query_0 = "fields " + fields.join(",") + ";" + filter_0;

  const response_0 = await buildRequest("igdb", "games", query_0);

  // const filter_1 =
  //   "sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (2); limit 20;";

  // const query_1 = "fields " + fields.join(",") + ";" + filter_1;

  // const response_1 = await buildRequest("igdb", "games", query_1);

  // const filter_2 =
  //   "sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (4); limit 20;";

  // const query_2 = "fields " + fields.join(",") + ";" + filter_2;

  // const response_2 = await buildRequest("igdb", "games", query_2);

  // const filter_3 =
  //   "sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (5); limit 20;";

  // const query_3 = "fields " + fields.join(",") + ";" + filter_3;

  // const response_3 = await buildRequest("igdb", "games", query_3);

  // const filter_4 =
  //   "sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (7); limit 20;";

  // const query_4 = "fields " + fields.join(",") + ";" + filter_4;

  // const response_4 = await buildRequest("igdb", "games", query_4);

  // const filter_5 =
  //   "sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (8); limit 20;";

  // const query_5 = "fields " + fields.join(",") + ";" + filter_5;

  // const response_5 = await buildRequest("igdb", "games", query_5);

  // const filter_6 =
  //   "sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (9); limit 20;";

  // const query_6 = "fields " + fields.join(",") + ";" + filter_6;

  // const response_6 = await buildRequest("igdb", "games", query_6);

  // const filter_7 =
  //   "sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (10); limit 20;";

  // const query_7 = "fields " + fields.join(",") + ";" + filter_7;

  // const response_7 = await buildRequest("igdb", "games", query_7);

  ///////////////////////////////////////////////////////////////////////////

  const genreFields = "fields *; limit 40;";

  const genreResponse = await buildRequest("igdb", "genres", genreFields);

  ///////////////////////////////////////////////////////////////////////////

  // var testMasterList = {};

  // for (var i = 0; i < genreResponse.length; i++) {
  //   const testFilter =
  //     "sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (" +
  //     genreResponse[i].id +
  //     "); limit 20;";

  //   const testQuery = "fields " + fields.join(",") + ";" + testFilter;
  //   const testResponse = await buildRequest("igdb", "games", testQuery);

  //   testMasterList[genreResponse[i].name] = testResponse;
  // }

  // console.log(JSON.stringify(testMasterList));

  ///////////////////////////////////////////////////////////////////////////

  const gameMasterList = {
    // genreList: genreResponse,
    gameList0: response_0,
    // gameList1: response_1,
    // gameList2: response_2,
    // gameList3: response_3,
    // gameList4: response_4,
    // gameList5: response_5,
    // gameList6: response_6,
    // gameList7: response_7,
  };

  let p = [];
  let test = [];

  for (const listPromiseObj in requests.home) {
    p.push(requests.home[listPromiseObj].promise);
    test.push({ title: requests.home[listPromiseObj].title });
  }

  const pResponse = await Promise.all(p);

  const test2 = pResponse.map((e, idx) => {
    return { title: test[idx].title, gameList: e };
  });

  const response = test2;
  // return {
  //   props: { gameList: response },
  // };

  return {
    props: {
      gameMasterList: gameMasterList,
      testList: response,
    },
  };
}

export default myCarousel;
