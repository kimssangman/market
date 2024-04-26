// atoms/userAtom.js
import { atom } from "recoil";

export const userState = atom({
    key: "userState",
    default: null, // default value for user
});
