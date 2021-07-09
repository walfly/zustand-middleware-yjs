import * as Y from "yjs";
import { arrayToYArray, yArrayToArray, } from "./utility";

describe("arrayToYArray", () =>
{
  let ydoc: Y.Doc = new Y.Doc();
  let ymap: Y.Map<any> = new Y.Map();

  beforeEach(() =>
  {
    ydoc = new Y.Doc();
    ymap = ydoc.getMap(`tmp`);
  });

  afterEach(() =>
  {
    ydoc.destroy();
  });

  it.each([
    [
      []
    ],
    [
      [ 1 ]
    ],
    [
      [ 1, 2, 3, 4 ]
    ]
  ])("Creates a YArray from %s.", (array) =>
  {
    ymap.set("array", arrayToYArray(array));
    expect(ymap.get("array").toJSON()).toEqual(array);
  });

  it.each([
    [
      [ [] ], 0
    ],
    [
      [ 1, [ 2, 3 ] ], 1
    ]
  ])(
    "Creates nested YArrays from %s.",
    (array, nestedArrayIndex) =>
    {
      ymap.set("array", arrayToYArray(array));

      expect(ymap.get("array").toJSON()).toEqual(array);
      expect((ymap.get("array").get(nestedArrayIndex) as Y.Array<any>).toJSON())
        .toEqual(array[nestedArrayIndex]);
    }
  );
});

describe("yArrayToArray", () =>
{
  it.each([
    [
      []
    ],
    [
      [ 1 ]
    ],
    [
      [ 1, 2, 3, 4 ]
    ]
  ])("Converts a YArray of %s to an array", (array) =>
  {
    const ydoc = new Y.Doc();
    const yarray = ydoc.getArray("test");

    yarray.push(array);

    expect(yArrayToArray(yarray)).toEqual(array);
  });
});
