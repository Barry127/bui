import { registerIcon } from './Icon/library';

const createIcon = (name, points) => ({
  name,
  icon: {
    tag: 'svg',
    attrs: {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'currentColor'
    },
    children: [
      {
        tag: 'polygon',
        attrs: {
          points
        }
      }
    ]
  }
});

const icons = [
  createIcon('@bui-caret-up', '12 6 24 24 0 24'),
  createIcon('@bui-caret-down', '0 0 24 0 12 18'),
  createIcon('@bui-caret-left', '24 0 24 24 6 12'),
  createIcon('@bui-caret-right', '0 0 0 24 18 12')
];

/**
 * Icons from feather icons licensed under MIT license.
 */
const featherIcons = [
  {
    name: 'bui-success',
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
          tag: 'path',
          attrs: {
            d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14'
          }
        },
        {
          tag: 'polyline',
          attrs: {
            points: '22 4 12 14.01 9 11.01'
          }
        }
      ]
    }
  },
  {
    name: 'bui-info',
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
          tag: 'circle',
          attrs: {
            cx: 12,
            cy: 12,
            r: 10
          }
        },
        {
          tag: 'line',
          attrs: {
            x1: 12,
            y1: 16,
            x2: 12,
            y2: 12
          }
        },
        {
          tag: 'line',
          attrs: {
            x1: 12,
            y1: 8,
            x2: 12,
            y2: 8
          }
        }
      ]
    }
  },
  {
    name: 'bui-warning',
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
          tag: 'path',
          attrs: {
            d:
              'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'
          }
        },
        {
          tag: 'line',
          attrs: {
            x1: 12,
            y1: 8,
            x2: 12,
            y2: 12
          }
        },
        {
          tag: 'line',
          attrs: {
            x1: 12,
            y1: 16,
            x2: 12,
            y2: 16
          }
        }
      ]
    }
  },
  {
    name: 'bui-error',
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
          tag: 'circle',
          attrs: {
            cx: 12,
            cy: 12,
            r: 10
          }
        },
        {
          tag: 'line',
          attrs: {
            x1: 15,
            y1: 9,
            x2: 9,
            y2: 15
          }
        },
        {
          tag: 'line',
          attrs: {
            x1: 9,
            y1: 9,
            x2: 15,
            y2: 15
          }
        }
      ]
    }
  },
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
  },
  {
    name: 'bui-eye',
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
          tag: 'path',
          attrs: {
            d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'
          }
        },
        {
          tag: 'circle',
          attrs: {
            cx: 12,
            cy: 12,
            r: 3
          }
        }
      ]
    }
  },
  {
    name: 'bui-eye-slash',
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
          tag: 'path',
          attrs: {
            d:
              'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'
          }
        },
        {
          tag: 'line',
          attrs: {
            x1: 1,
            y1: 1,
            x2: 23,
            y2: 23
          }
        }
      ]
    }
  },
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
  },
  {
    name: 'bui-close',
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
          tag: 'circle',
          attrs: {
            cx: 12,
            cy: 12,
            r: 10
          }
        },
        {
          tag: 'line',
          attrs: {
            x1: 15,
            y1: 9,
            x2: 9,
            y2: 15
          }
        },
        {
          tag: 'line',
          attrs: {
            x1: 9,
            y1: 9,
            x2: 15,
            y2: 15
          }
        }
      ]
    }
  }
];

icons.forEach(registerIcon);
featherIcons.forEach(registerIcon);
