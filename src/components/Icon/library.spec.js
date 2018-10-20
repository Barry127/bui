import icons, { registerIcon, BuiIconError } from './library';

const circleIcon = {
  tag: 'svg',
  attrs: { viewBox: '0 0 24 24' },
  children: [
    {
      tag: 'circle',
      attrs: {
        cx: 12,
        cy: 12,
        r: 10
      }
    }
  ]
};

it('Registers an icon', () => {
  registerIcon({
    name: 'circle',
    icon: circleIcon
  });

  expect(icons.circle).toEqual({
    name: 'circle',
    icon: circleIcon
  });
});

it('Throws an BuiIconError if icon name is already registerd', () => {
  expect(() => registerIcon({ name: 'circle' })).toThrow(BuiIconError);
});

it('Registers aliasses', () => {
  registerIcon({
    name: 'myCircle',
    aliasses: ['myCircleAlias', 'alias'],
    icon: circleIcon
  });

  expect(icons.myCircle).toEqual({
    name: 'myCircle',
    icon: circleIcon
  });

  expect(icons.myCircleAlias).toBe(icons.myCircle);
  expect(icons.alias).toBe(icons.myCircle);
});

it('Throws an BuiIconError if icon alias is already registerd as name', () => {
  expect(() =>
    registerIcon({ name: 'someIcon', aliasses: ['alias'], icon: circleIcon })
  ).toThrow(BuiIconError);
});
