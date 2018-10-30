import uniqueId from './uniqueId';

it('first id is bui-0', () => {
  expect(uniqueId()).toBe('bui-0');
});

it('keeps incrementing id number', () => {
  for (let i = 1; i < 10; i++) {
    expect(uniqueId()).toBe(`bui-${i}`);
  }
});
