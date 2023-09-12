import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { component$, useVisibleTask$ } from "@builder.io/qwik";

const initSwiper = () => {
  console.log("initSwiper");
  new Swiper(".swiper", {
    // Optional parameters
    modules: [Navigation, Pagination],
    direction: "vertical",
    loop: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
};

function useMySwiper() {
  useVisibleTask$(() => {
    initSwiper();
  });
}

export default component$(() => {
  useMySwiper();
  return (
    <div>
      <div class="swiper" style={{ width: "600px", height: "200px" }}>
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
        </div>
        <div class="swiper-pagination"></div>

        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <div class="swiper-scrollbar"></div>
      </div>
    </div>
  );
});
