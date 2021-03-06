
import { rotate3d } from './utils';
import  { Animation } from './types';
import  { keyframes } from '@emotion/react';

const rotateInUpLeft: Animation = {
  from: {
    transformOrigin: 'left bottom',
    transform: rotate3d(0, 0, 1, 45),
    opacity: 0
  },
  to: {
    transformOrigin: 'left bottom',
    transform: 'none',
    opacity: 1
  }
};

export default keyframes`${rotateInUpLeft}`
