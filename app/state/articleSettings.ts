// atoms/articleSettings.ts
import { atom } from 'recoil';

export const articleSettingsState = atom({
  key: 'articleSettingsState',
  default: {
    structure: '',      // 構成（見出しなど）
    audience: '',       // 読者像（例：初心者向け、20代女性など）
  },
});
