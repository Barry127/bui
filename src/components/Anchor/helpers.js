import sortBy from 'lodash/sortBy';

import Link from './Link';

export function childReducer(list, child) {
  if (child.type !== Link) return list;

  let subList = [child.props.to];

  if (child.props.children) {
    const children = Array.isArray(child.props.children)
      ? child.props.children
      : [child.props.children];

    subList = children.reduce(childReducer, subList);
  }

  return [...list, ...subList];
}

export function makeList(children) {
  const childrenArray = Array.isArray(children) ? children : [children];

  let list = sortBy(
    childrenArray
      .reduce(childReducer, [])
      .map(item => {
        const target = document.getElementById(item.substr(1));
        if (!target) return null;

        return {
          top: target.offsetTop,
          to: item
        };
      })
      .filter(item => item !== null),
    'top'
  );

  return list;
}

export function getActive(list, offsetTop) {
  const windowTop = window.scrollY + offsetTop;
  const active = list.reduce(
    (active, item) => (windowTop >= item.top ? item.to : active),
    null
  );

  return active;
}
