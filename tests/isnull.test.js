import {isnull, isnotnull} from "../src/isnull";
import {myobject, mynumber, myarray, mystring, myboolean, mynull, myundefined, myemptystring} from "./consts";

const myArrowFunction = () => {
};
function myfunction() {
}

describe("Null Checks", () => {
  test("Null", () => {
    expect(isnull(mynull)).toEqual(true);
  });
  test("Not Null", () => {
    expect(isnotnull(mynull)).toEqual(false);
  });

  test("Undefined", () => {
    expect(isnull(undefined)).toEqual(true);
  });
  test("Not Undefined", () => {
    expect(isnotnull(myundefined)).toEqual(false);
  });

  test("Is Empty String Not Null", () => {
    expect(isnotnull(myemptystring)).toEqual(true);
  });

  test("Is Empty String Null", () => {
    expect(isnull(myemptystring)).toEqual(false);
  });

  test("Is String Not Null", () => {
    expect(isnotnull(mystring)).toEqual(true);
  });

  test("Is String Null", () => {
    expect(isnull(mystring)).toEqual(false);
  });

  test("Is Object Not Null", () => {
    expect(isnotnull(myobject)).toEqual(true);
  });

  test("Is Object Null", () => {
    expect(isnull(myobject)).toEqual(false);
  });

  test("Is Function Not Null", () => {
    expect(isnotnull(myfunction)).toEqual(true);
  });

  test("Is Function Null", () => {
    expect(isnull(myArrowFunction)).toEqual(false);
  });
  test("Is Function Call Not Null", () => {
    expect(isnotnull(myfunction())).toEqual(false);
  });

  test("Is Function Call Null", () => {
    expect(isnull(myArrowFunction())).toEqual(true);
  });
});
