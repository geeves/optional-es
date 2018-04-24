import {isfunction, isnotfunction} from "../src/isfunction";

import  {myobject, mynumber, myarray, mystring, myboolean} from "./consts";

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
    expect(isnotfunction(myfunction)).toEqual(false);
  });
  test("My Const Function", () => {
    expect(isnotfunction(myConstFunction)).toEqual(false);
  });
  test("My Arrow Function", () => {
    expect(isnotfunction(myArrowFunction)).toEqual(false);
  });
  test("My String", () => {
    expect(isnotfunction(mystring)).toEqual(true);
  });
  test("My Number", () => {
    expect(isnotfunction(mynumber)).toEqual(true);
  });
  test("My Object", () => {
    expect(isnotfunction(myobject)).toEqual(true);
  });
  test("My Array", () => {
    expect(isnotfunction(myarray)).toEqual(true);
  });
  test("My Boolean", () => {
    expect(isnotfunction(myboolean)).toEqual(true);
  });
  test("Undefined", () => {
    expect(isnotfunction(undefined)).toEqual(true);
  });
  test("Null", () => {
    expect(isnotfunction(null)).toEqual(true);
  });
});

describe("Function Tests Opposite", () => {
  test("My Function", () => {
    expect(isnotfunction(myfunction)).not.toEqual(true);
  });

  test("My Const Function", () => {
    expect(isnotfunction(myConstFunction)).not.toEqual(true);
  });
  test("My Arrow Function", () => {
    expect(isnotfunction(myArrowFunction)).not.toEqual(true);
  });
  test("My String", () => {
    expect(isnotfunction(mystring)).not.toEqual(false);
  });
  test("My Number", () => {
    expect(isnotfunction(mynumber)).not.toEqual(false);
  });
  test("My Object", () => {
    expect(isnotfunction(myobject)).not.toEqual(false);
  });
  test("My Array", () => {
    expect(isnotfunction(myarray)).not.toEqual(false);
  });
  test("My Boolean", () => {
    expect(isnotfunction(myboolean)).not.toEqual(false);
  });
  test("Undefined", () => {
    expect(isnotfunction(undefined)).not.toEqual(false);
  });
  test("Null", () => {
    expect(isnotfunction(null)).not.toEqual(false);
  });
});
