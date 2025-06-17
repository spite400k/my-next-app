// chatState.ts
import { atom } from 'recoil';

export type ChatMessage = {
  text: string;
  sender: 'user' | 'ai';
  timestamp?: string;
};

export const chatState = atom<ChatMessage[]>({
  key: 'chatState',
  default: [],
});
