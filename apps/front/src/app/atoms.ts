import { atom } from 'recoil';

import { Step } from './types';

export const stepState = atom({
  key: 'stepState',
  default: Step.AsianOrNonAsian,
});
