import { atom } from 'recoil';

export interface User {
  email: string;
  name: string;
}

export const userState = atom<User | null>({
  key: 'userState',
  default: null, // 未ログイン状態のデフォルト
});
