import { registerIcon } from '../Icon/library';

/**
 * Icons from feather icons licensed under MIT license.
 */
const icons = [
  {
    name: 'bui-chevron-down',
    icon: {
      tag: 'svg',
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      },
      children: [
        {
          tag: 'polyline',
          attrs: {
            points: '6 9 12 15 18 9'
          }
        }
      ]
    }
  },
  {
    name: 'bui-chevron-up',
    icon: {
      tag: 'svg',
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      },
      children: [
        {
          tag: 'polyline',
          attrs: {
            points: '18 15 12 9 6 15'
          }
        }
      ]
    }
  }
];

icons.forEach(registerIcon);
