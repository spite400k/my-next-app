// states/chatLogState.ts
// OpenAiAPIのレスポンスが帰ってくるまでのローディング状態を保持
import { atom } from 'recoil';

export interface isLoading{
  bool: boolean,
};

export const loadingState = atom<isLoading>({
  key: 'loadingState',
  default: {bool:false},
});