
import { rotate3d } from './utils';
import  { Animation } from './types';
import  { keyframes } from '@emotion/core';

const swing: Animation = {
  '20%': {
    transform: rotate3d(0, 0, 1, 15)
  },
  '40%': {
    transform: rotate3d(0, 0, 1, -10)
  },
  '60%': {
    transform: rotate3d(0, 0, 1, 5)
  },
  '80%': {
    transform: rotate3d(0, 0, 1, -5)
  },
  to: {
    transform: rotate3d(0, 0, 1, 15)
  }
};

export const styles = {
  transformOrigin: 'top center'
};

export default keyframes`${swing}`
