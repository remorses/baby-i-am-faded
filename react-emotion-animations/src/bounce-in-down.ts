
import { cubicBezier, translate3d } from './utils';
import  { Keyframe, Animation } from './types';
import  { keyframes } from '@emotion/core';

const timing: Keyframe = {
  animationTimingFunction: cubicBezier(
    0.215,
    0.610,
    0.355,
    1.000
  )
};

const bounceInDown: Animation = {
  from: timing,
  '0%': {
    opacity: 0,
    transform: translate3d(0, '-3000px', 0)
  },
  '60%': {
    ...timing,
    opacity: 1,
    transform: translate3d(0, '25px', 0)
  },
  '75%': {
    ...timing,
    transform: translate3d(0, '-10px', 0)
  },
  '90%': {
    ...timing,
    transform: translate3d(0, '5px', 0)
  },
  to: {
    ...timing,
    transform: 'none'
  }
};

export default keyframes`${bounceInDown}`
