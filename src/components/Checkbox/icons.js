import { registerIcon } from '../Icon/library';

/**
 * Icons from feather icons licensed under MIT license.
 */
const icons = [
  {
    name: 'bui-check',
    icon: {
      tag: 'svg',
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 3,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      },
      children: [
        {
          tag: 'polyline',
          attrs: {
            points: '20 6 9 17 4 12'
          }
        }
      ]
    }
  },
  {
    name: 'bui-minus',
    icon: {
      tag: 'svg',
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 3,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      },
      children: [
        {
          tag: 'line',
          attrs: {
            x1: 5,
            y1: 12,
            x2: 19,
            y2: 12
          }
        }
      ]
    }
  }
];

icons.forEach(registerIcon);
