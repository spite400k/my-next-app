// states/chatLogState.ts
// チャットのメッセージ欄の文字列リストを定義
import { atom } from 'recoil';
import { MessageType } from '../type/MessageType';

// gptResponseStateの型をMessageの配列として定義
export const chatLogState = atom<MessageType[]>({
  key: 'chatLogState',
  default: [
    { id: 1, content: "ようこそ！問題解決のお手伝いを致します！", sender: "other" ,time: ""},
  ],
});