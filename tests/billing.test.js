import { calculateCost} from "../libs/billing-lib";

test("Lowest tier", () =>{
  const storage = 10;

  const cost = 4000;
  const expectedCost = calculateCost(storage);

  expect(cost).toEqual(expectedCost);
});

