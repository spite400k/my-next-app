// states/chatLogState.ts
import { atom } from 'recoil';

export interface isLoading{
  bool: boolean,
};

export const loadingState = atom<isLoading>({
  key: 'loadingState',
  default: {bool:false},
});