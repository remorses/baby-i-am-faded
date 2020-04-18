
import { scale3d } from './utils';
import  { Animation } from './types';
import  { keyframes } from '@emotion/core';

const zoomIn: Animation = {
  from: {
    opacity: 0,
    transform: scale3d(0.3, 0.3, 0.3)
  },
  '50%': {
    opacity: 1
  }
};

export default keyframes`${zoomIn}`
