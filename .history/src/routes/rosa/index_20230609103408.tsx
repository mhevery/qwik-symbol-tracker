// FILE: index
import { componentQrl, qrl } from "@builder.io/qwik";

const X = 123;

export default componentQrl(qrl("./foo.js", "FooSymb"));

export const Clock = componentQrl(qrl("./Clock.js", "ClockSymb"));

//// FILE: foo.js
import { Clock } from "./index";

export const FooSymb = () => {
  return (
    <div>
      Hello Qwik! {X}
      <Clock />
    </div>
  );
};

//// FILE: clock.js

export const ClockSymb = () => {
  return <div>Clock</div>;
};

/////

// You control which symbols are exported from the bundle through configuration file.
// Bundle A:
export { ClockSymb } from "./clock";
export { FooSymb } from "./foo";
