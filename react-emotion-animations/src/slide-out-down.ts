
import { translate3d } from './utils';
import  { Animation } from './types';
import  { keyframes } from '@emotion/react';

const slideOutDown: Animation = {
  from: {
    transform: translate3d(0, 0, 0)
  },
  to: {
    visibility: 'hidden',
    transform: translate3d(0, '100%', 0)
  }
};

export default keyframes`${slideOutDown}`
