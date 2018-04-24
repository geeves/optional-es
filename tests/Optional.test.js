import Optional from "../src/Optional";
import {isnull, isnotnull} from "../src/isnull";

describe("Optional Empty", () => {
  const optionalEmpty = Optional.empty();
  const optionalEMPTY = Optional.EMPTY;
  test("Empty Optional.get() should throw an Error", () => {
    expect(() => {
      optionalEmpty.get()
    }).toThrow();
  });

  test("Empty Optional.isPresent() should return false", () => {
    expect(optionalEmpty.isPresent()).toEqual(false);
  });

  test("Optional.EMPTY Optional.get() should throw an Error", () => {
    expect(() => {
      optionalEMPTY.get()
    }).toThrow();
  });

  test("OptionalEMPTY Optional.isPresent() should return false", () => {
    expect(optionalEMPTY.isPresent()).toEqual(false);
  });
});
