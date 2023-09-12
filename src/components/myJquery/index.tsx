import { component$, useVisibleTask$ } from "@builder.io/qwik";
import _ from "jquery";

function useJquery() {
  useVisibleTask$(() => {
    console.log("JQuery_____", _);
  });
}

export default component$(() => {
  useJquery();
  return (
    <div style={{ color: "red" }}>
      <h3>JQuery Test</h3>
    </div>
  );
});
