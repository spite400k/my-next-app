// states/chatLogState.ts
// チャットのメッセージ欄の文字列リストを定義
import { atom } from 'recoil';
import { MessageType } from '../components/chat/MessageType';

// gptResponseStateの型をMessageの配列として定義
export const chatLogState = atom<MessageType[]>({
  key: 'chatLogState',
  default: [
    { id: 1, content: "こんにちは！", sender: "user" ,time: new Date().toLocaleTimeString()},
    { id: 2, content: "元気ですか？", sender: "other" ,time: new Date().toLocaleTimeString()},
  ],
});