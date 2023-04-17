/* global describe it */
import chai from "chai";

import sleep from "sleep-promise";
import namedTask from "../src";

let execCount = 0;
const task = async () => {
  await sleep(1000);
  execCount += 1;
};

const thread1 = async () => {
  await namedTask("oneTask", task, []);
};

const thread2 = async () => {
  await namedTask("oneTask", task, []);
};

describe("fn", async () => {
  it("exec count should be 1", async () => {
    thread2();

    return thread1().then(() => {
      setTimeout(() => {
        chai.expect(execCount).to.equal(1);
      }, 3000);
    });
  });
});
