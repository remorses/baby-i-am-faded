
import { scale3d } from './utils';
import  { Animation } from './types';
import  { keyframes } from '@emotion/core';

const pulse: Animation = {
  from: {
    transform: scale3d(1, 1, 1)
  },
  '50%': {
    transform: scale3d(1.05, 1.05, 1.05)
  },
  to: {
    transform: scale3d(1, 1, 1)
  }
};

export default keyframes`${pulse}`
