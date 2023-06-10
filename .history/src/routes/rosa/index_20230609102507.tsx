import { componentQrl, qrl } from "@builder.io/qwik";

const X = 123;

export default componentQrl(qrl("./Foo.js", "FOO"));

export const Clock = componentQrl(qrl("./Clock.js", "ClockSymb"));

////

export const FOO = () => {
  return <div>Hello Qwik! {X}</div>;
};

////

export const ClockSymb = () => {
  return <div>Clock</div>;
};
