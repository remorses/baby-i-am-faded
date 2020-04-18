
import {
  compose,
  perspective,
  rotate3d
} from './utils';
import  { Animation } from './types';
import  { keyframes } from '@emotion/core';

const perspectiveAndRotate = compose(
  perspective,
  rotate3d
);

const flipOutX: Animation = {
  from: {
    transform: perspective('400px')
  },
  '30%': {
    transform: perspectiveAndRotate('400px', [1, 0, 0, -20]),
    opacity: 1
  },
  to: {
    transform: perspectiveAndRotate('400px', [1, 0, 0, 90]),
    opacity: 0
  }
};

export default keyframes`${flipOutX}`
