import React from "react";
import FeaturedSlider from "../components/FeaturedSlider";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import requests from "../utils/requests";

function myCarousel({ gameMasterList }) {
  return (
    <>
      <NavBar />
      <FeaturedSlider gameProp={gameMasterList[0].gameList} />
      {gameMasterList.map((obj) => {
        return obj.id === 0 ? (
          <FeaturedSlider
            key={`slider-genre-${obj.id}`}
            gameProp={obj.gameList}
            sliderTitle={obj.title}
          />
        ) : (
          <Slider
            key={`slider-genre-${obj.id}`}
            gameProp={obj.gameList}
            sliderTitle={obj.title}
          />
        );
      })}
    </>
  );
}

export async function getServerSideProps() {
  // Array of Promises
  let p = [];
  // Array of Carousel data objects
  let data = [];

  // Loop through all object requests under home.
  for (const listPromiseObj in requests.home) {
    // Save each promise to the promise array
    p.push(requests.home[listPromiseObj].promise);
    // Add Carousel Title to Titles array
    data.push({
      id: requests.home[listPromiseObj].id,
      title: requests.home[listPromiseObj].title,
    });
  }

  // Resolve all Promises in Promise array in parallel
  const pResponse = await Promise.all(p);

  // Create new Array of Carousel data objects
  const carousels = pResponse.map((list, idx) => {
    return { id: data[idx].id, title: data[idx].title, gameList: list };
  });

  return {
    props: {
      gameMasterList: carousels,
    },
  };
}

export default myCarousel;
