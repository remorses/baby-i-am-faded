
import { translate3d } from './utils';
import  { Animation } from './types';
import  { keyframes } from '@emotion/core';

const bounceOutDown: Animation = {
  '20%': {
    transform: translate3d(0, '10px', 0)
  },
  '40%': {
    transform: translate3d(0, '-20px', 0)
  },
  '45%': {
    transform: translate3d(0, '-20px', 0)
  },
  to: {
    opacity: 0,
    transform: translate3d(0, '2000px', 0)
  }
};

export default keyframes`${bounceOutDown}`
