// dialogAtom.js

import { atom } from "recoil";

// Recoil 상태
export const dialogState = atom({
    key: "dialogState",
    default: {
        open: false,
        message: "",
        callback: () => {},
    },
});
