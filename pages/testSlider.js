import React from "react";
import FeaturedSlider from "../components/FeaturedSlider";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import buildRequest from "../utils/buildRequest";
import requests from "../utils/requests";

function myCarousel({ gameMasterList }) {
  return (
    <>
      <NavBar />
      {gameMasterList.map((obj, idx) => {
        return obj.name === "Top Games" ? (
          <FeaturedSlider
            key={`slider-genre-${obj.idx}`}
            gameProp={obj.result}
            sliderTitle={obj.name}
          />
        ) : (
          <Slider
            key={`slider-genre-${obj.idx}`}
            gameProp={obj.result}
            sliderTitle={obj.name}
          />
        );
      })}
    </>
  );
}

export async function getServerSideProps() {
  //** NOTE: Multiquery endpoint only allows 10 queries per call */
  let multiQueryBody1 = "";
  let multiQueryBody2 = "";
  let i = 0;
  for (const listPromiseObj in requests.home) {
    i++;
    if (i <= 10) {
      multiQueryBody1 = multiQueryBody1.concat(
        `query games "${requests.home[listPromiseObj].title}" { ${requests.home[listPromiseObj].query} };\n`
      );
    } else if (i > 10 && i <= 20) {
      multiQueryBody2 = multiQueryBody2.concat(
        `query games "${requests.home[listPromiseObj].title}" { ${requests.home[listPromiseObj].query} };\n`
      );
    } else break;
  }

  const response1 = await buildRequest("igdb", "multiquery", multiQueryBody1);
  const response2 = await buildRequest("igdb", "multiquery", multiQueryBody2);

  const response = [...response1, ...response2];

  return {
    props: {
      gameMasterList: response,
    },
  };
}

export default myCarousel;
