import React from 'react';

export default (Component, propName = 'innerRef') =>
  React.forwardRef((props, ref) =>
    React.createElement(Component, { [propName]: ref, ...props })
  );
