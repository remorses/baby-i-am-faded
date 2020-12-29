
import { translate3d } from './utils';
import  { Animation } from './types';
import  { keyframes } from '@emotion/react';

const fadeInUpBig: Animation = {
  from: {
    opacity: 0,
    transform: translate3d(0, '2000px', 0)
  },
  to: {
    opacity: 1,
    transform: 'none'
  }
};

export default keyframes`${fadeInUpBig}`
