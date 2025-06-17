// lib/states/chatState.ts
import { atom } from 'recoil';

type ChatMessage = {
  text: string;
  sender: 'user' | 'ai';
};

export const chatState = atom<ChatMessage[]>({
  key: 'chatState',
  default: [],
});
