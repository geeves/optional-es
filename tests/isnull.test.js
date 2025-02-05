import {isNotnull, isnull} from "../src/isnull";
import {
  myemptystring,
  mynull,
  myobject,
  mystring,
  myundefined
} from "./consts";

const myArrowFunction = () => {
};

function myfunction() {
}

describe("Null Checks", () => {
  test("Null", () => {
    expect(isnull(mynull)).toEqual(true);
  });
  test("Not Null", () => {
    expect(isNotnull(mynull)).toEqual(false);
  });

  test("Undefined", () => {
    expect(isnull(undefined)).toEqual(true);
  });
  test("Not Undefined", () => {
    expect(isNotnull(myundefined)).toEqual(false);
  });

  test("Is Empty String Not Null", () => {
    expect(isNotnull(myemptystring)).toEqual(true);
  });

  test("Is Empty String Null", () => {
    expect(isnull(myemptystring)).toEqual(false);
  });

  test("Is String Not Null", () => {
    expect(isNotnull(mystring)).toEqual(true);
  });

  test("Is String Null", () => {
    expect(isnull(mystring)).toEqual(false);
  });

  test("Is Object Not Null", () => {
    expect(isNotnull(myobject)).toEqual(true);
  });

  test("Is Object Null", () => {
    expect(isnull(myobject)).toEqual(false);
  });

  test("Is Function Not Null", () => {
    expect(isNotnull(myfunction)).toEqual(true);
  });

  test("Is Function Null", () => {
    expect(isnull(myArrowFunction)).toEqual(false);
  });
  test("Is Function Call Not Null", () => {
    expect(isNotnull(myfunction())).toEqual(false);
  });

  test("Is Function Call Null", () => {
    expect(isnull(myArrowFunction())).toEqual(true);
  });
});
