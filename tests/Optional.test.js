import Optional from "../src/Optional";

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

  test("Optional.map(Number)", () => {
    const total = 625;
    const mult = 5;
    const optional = Optional.of(125);
    const mapped = optional.map((value) => value * mult);
    expect(mapped.get()).toEqual(total);
  });

  test("Optional.map(String)", () => {
    const helloWorld = "Hello World!";
    const optional = Optional.of("Hello");
    const mapped = optional.map((value) => `${value} World!`);
    expect(mapped.get()).toEqual(helloWorld);
  });

  // test("Optional.filter()", () => {
  //   const helloWorld = "Hello World!";
  //   const optional = Optional.of("Hello");
  //   expect(optional.filter(null)).toThrow();
  // });

  // test("Optional.flatMap(String)", () => {
  //   const helloWorld = "Hello World!";
  //   const optional = Optional.of("Hello");
  //   const mapped = optional.map((value) => {
  //     if (helloWorld === `${value} World!`) {
  //
  //     }
  //   });
  //   expect(mapped.get()).toEqual(helloWorld);
  // });

  test("Optional.equals()", () => {
    const nullvalue = null;
    const one = Optional.of(1);
    const one2 = Optional.ofNullable(1);
    const hello = Optional.of("Hello");
    const hello2 = Optional.ofNullable("Hello");
    const world = Optional.of("World");
    const nullable = Optional.ofNullable(nullvalue);
    expect(hello.equals(nullable)).toEqual(false);
    expect(hello.equals(hello2)).toEqual(true);
    expect(hello.equals(world)).toEqual(false);
    expect(hello.equals(one)).toEqual(false);
    expect(one.equals(one2)).toEqual(true);
  });
});
