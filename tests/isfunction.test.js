import {isfunction, isNotfunction} from "../src/isfunction";

import {myarray, myboolean, mynumber, myobject, mystring} from "./consts";

const myArrowFunction = () => {
};
const myConstFunction = function () {
};

function myfunction() {
}

describe("Function Tests", () => {
  test("My Function", () => {
    expect(isfunction(myfunction)).toEqual(true);
  });
  test("My Const Function", () => {
    expect(isfunction(myConstFunction)).toEqual(true);
  });
  test("My Arrow Function", () => {
    expect(isfunction(myArrowFunction)).toEqual(true);
  });
  test("My String", () => {
    expect(isfunction(mystring)).toEqual(false);
  });
  test("My Number", () => {
    expect(isfunction(mynumber)).toEqual(false);
  });
  test("My Object", () => {
    expect(isfunction(myobject)).toEqual(false);
  });
  test("My Array", () => {
    expect(isfunction(myarray)).toEqual(false);
  });
  test("My Boolean", () => {
    expect(isfunction(myboolean)).toEqual(false);
  });
  test("Undefined", () => {
    expect(isfunction(undefined)).toEqual(false);
  });
  test("Null", () => {
    expect(isfunction(null)).toEqual(false);
  });
});

describe("Function Tests Opposite", () => {
  test("My Function", () => {
    expect(isfunction(myfunction)).not.toEqual(false);
  });

  test("My Const Function", () => {
    expect(isfunction(myConstFunction)).not.toEqual(false);
  });
  test("My Arrow Function", () => {
    expect(isfunction(myArrowFunction)).not.toEqual(false);
  });
  test("My String", () => {
    expect(isfunction(mystring)).not.toEqual(true);
  });
  test("My Number", () => {
    expect(isfunction(mynumber)).not.toEqual(true);
  });
  test("My Object", () => {
    expect(isfunction(myobject)).not.toEqual(true);
  });
  test("My Array", () => {
    expect(isfunction(myarray)).not.toEqual(true);
  });
  test("My Boolean", () => {
    expect(isfunction(myboolean)).not.toEqual(true);
  });
  test("Undefined", () => {
    expect(isfunction(undefined)).not.toEqual(true);
  });
  test("Null", () => {
    expect(isfunction(null)).not.toEqual(true);
  });
});

describe("IsNotFunction Tests", () => {
  test("My Function", () => {
    expect(isNotfunction(myfunction)).toEqual(false);
  });
  test("My Const Function", () => {
    expect(isNotfunction(myConstFunction)).toEqual(false);
  });
  test("My Arrow Function", () => {
    expect(isNotfunction(myArrowFunction)).toEqual(false);
  });
  test("My String", () => {
    expect(isNotfunction(mystring)).toEqual(true);
  });
  test("My Number", () => {
    expect(isNotfunction(mynumber)).toEqual(true);
  });
  test("My Object", () => {
    expect(isNotfunction(myobject)).toEqual(true);
  });
  test("My Array", () => {
    expect(isNotfunction(myarray)).toEqual(true);
  });
  test("My Boolean", () => {
    expect(isNotfunction(myboolean)).toEqual(true);
  });
  test("Undefined", () => {
    expect(isNotfunction(undefined)).toEqual(true);
  });
  test("Null", () => {
    expect(isNotfunction(null)).toEqual(true);
  });
});

describe("Function Tests Opposite", () => {
  test("My Function", () => {
    expect(isNotfunction(myfunction)).not.toEqual(true);
  });

  test("My Const Function", () => {
    expect(isNotfunction(myConstFunction)).not.toEqual(true);
  });
  test("My Arrow Function", () => {
    expect(isNotfunction(myArrowFunction)).not.toEqual(true);
  });
  test("My String", () => {
    expect(isNotfunction(mystring)).not.toEqual(false);
  });
  test("My Number", () => {
    expect(isNotfunction(mynumber)).not.toEqual(false);
  });
  test("My Object", () => {
    expect(isNotfunction(myobject)).not.toEqual(false);
  });
  test("My Array", () => {
    expect(isNotfunction(myarray)).not.toEqual(false);
  });
  test("My Boolean", () => {
    expect(isNotfunction(myboolean)).not.toEqual(false);
  });
  test("Undefined", () => {
    expect(isNotfunction(undefined)).not.toEqual(false);
  });
  test("Null", () => {
    expect(isNotfunction(null)).not.toEqual(false);
  });
});
