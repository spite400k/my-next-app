// states/chatInputState.ts
// チャットの入力欄に入る文字列

import { atom } from 'recoil';

// メッセージオブジェクトの型を定義
interface Message {
  content: string;
}

// gptResponseStateの型をMessageの配列として定義
export const chatInputState = atom<Message>({
  key: 'chatInputState',
  default: {content:""},
});