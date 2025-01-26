// states/keywordLogState.ts
// チャットのメッセージ欄の文字列リストを定義
import { atom } from 'recoil';
import { MessageType } from '../type/MessageType';

// gptResponseStateの型をMessageの配列として定義
export const keywordLogState = atom<MessageType[]>({
  key: 'keywordLogState',
  default: [],
});