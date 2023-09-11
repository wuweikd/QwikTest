import { $, component$, useOnDocument } from "@builder.io/qwik";
import _ from "jquery";

function useJquery() {
  useOnDocument(
    "DOMContentLoaded",
    $(() => {
      console.log("JQuery_____", _);
    }),
  );
}

export default component$(() => {
  useJquery();
  return (
    <div style={{ color: "red" }}>
      <h3>JQuery Test</h3>
    </div>
  );
});
