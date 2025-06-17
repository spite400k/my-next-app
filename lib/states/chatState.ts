// lib/states/chatState.ts
import { atom } from 'recoil';

type ChatMessage = {
  timestamp: string | Date | undefined;
  text: string;
  sender: 'user' | 'ai';
};

export const chatState = atom<ChatMessage[]>({
  key: 'chatState',
  default: [],
});
