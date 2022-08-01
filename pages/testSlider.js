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
      {gameMasterList.map((obj) => {
        return obj.name === "Top Games" ? (
          <FeaturedSlider
            key={`slider-genre-${obj.id}`}
            gameProp={obj.result}
            sliderTitle={obj.name}
          />
        ) : (
          <Slider
            key={`slider-genre-${obj.id}`}
            gameProp={obj.result}
            sliderTitle={obj.name}
          />
        );
      })}
    </>
  );
}

export async function getServerSideProps() {
  // // Array of Promises
  // let p = [];
  // // Array of Carousel data objects
  // let data = [];

  // // Loop through all object requests under home.
  // for (const listPromiseObj in requests.home) {
  //   // Save each promise to the promise array
  //   p.push(requests.home[listPromiseObj].promise);
  //   // Add Carousel Title to Titles array
  //   data.push({
  //     id: requests.home[listPromiseObj].id,
  //     title: requests.home[listPromiseObj].title,
  //   });
  // }

  // // Resolve all Promises in Promise array in parallel
  // const pResponse = await Promise.all(p);

  // // Create new Array of Carousel data objects
  // const carousels = pResponse.map((list, idx) => {
  //   return { id: data[idx].id, title: data[idx].title, gameList: list };
  // });

  let multiQueryBody = "";
  let i = 0;
  for (const listPromiseObj in requests.home2) {
    i++;
    multiQueryBody = multiQueryBody.concat(
      `query games "${requests.home2[listPromiseObj].title}" { ${requests.home2[listPromiseObj].query} };\n`
    );

    if (i == 10) {
      break;
    }
  }

  const response = await buildRequest("igdb", "multiquery", multiQueryBody);

  return {
    props: {
      gameMasterList: response,
    },
  };
}

export default myCarousel;
