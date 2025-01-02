// states/keywordInputState.ts
// チャットの入力欄に入る文字列

import { atom } from 'recoil';

// メッセージオブジェクトの型を定義
interface Message {
  content: string;
}

// gptResponseStateの型をMessageの配列として定義
export const keywordInputState = atom<Message>({
  key: 'keywordInputState',
  default: { content: '' }, // 必ず空文字列で初期化
});