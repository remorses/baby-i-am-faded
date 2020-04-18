
import { compose, translateX, rotateY } from './utils';
import  { Keyframe, Animation } from './types';
import  { keyframes } from '@emotion/core';

const translateAndRotate = compose(translateX, rotateY);

const noShake: Keyframe = {
  transform: translateX(0)
};

const headShake: Animation = {
  '0%': noShake,
  '6.5%': {
    transform: translateAndRotate('-6px', '-9deg')
  },
  '18.5%': {
    transform: translateAndRotate('5px', '7deg')
  },
  '31.5%': {
    transform: translateAndRotate('-3px', '-5deg')
  },
  '43.5%': {
    transform: translateAndRotate('2px', '3deg')
  },
  '50%': noShake
};

export default keyframes`${headShake}`
