import { TEST_DISPATCH } from "./types";

export const loginAction = credentials => {
  return {
    type: TEST_DISPATCH,
    payload: credentials
  };
};
