
import { translate3d } from './utils';
import  { Animation } from './types';
import  { keyframes } from '@emotion/core';

const bounceOutRight: Animation = {
  '20%': {
    opacity: 1,
    transform: translate3d('-20px', 0, 0)
  },
  to: {
    opacity: 1,
    transform: translate3d('2000px', 0, 0)
  }
};

export default keyframes`${bounceOutRight}`
