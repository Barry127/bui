import { registerIcon } from '../Icon/library';

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

icons.forEach(registerIcon);
