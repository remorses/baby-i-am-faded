
import { translate3d } from './utils';
import  { Animation } from './types';
import  { keyframes } from '@emotion/react';

const fadeOutLeftBig: Animation = {
  from: {
    opacity: 1
  },
  to: {
    opacity: 0,
    transform: translate3d('-2000px', 0, 0)
  }
};

export default keyframes`${fadeOutLeftBig}`
