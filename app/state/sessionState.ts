import { atom } from "recoil";

export const sessionState = atom({
  key: "sessionState", // ユニークなキー
  default: null, // 初期値（セッション情報がない状態）
});
