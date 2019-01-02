import React from 'react';
import { navigate, Location } from '@reach/router';

import { SideNav } from '../components';

import components from '../../config/componentData';

const navTo = ev => {
  ev.preventDefault();
  navigate(ev.target.href);
};

const Nav = () => (
  <Location>
    {({ location }) => (
      <SideNav width={250} className="docs-nav" resizable={false}>
        <SideNav.Item onClick={navTo} to="/" active={location.pathname === '/'}>
          BUI
        </SideNav.Item>
        <SideNav.Item
          onClick={navTo}
          to="/getting-started"
          active={location.pathname === '/getting-started'}
        >
          Getting Started
        </SideNav.Item>
        <SideNav.Group title="Principles">
          <SideNav.Item
            onClick={navTo}
            to="/principles/colors"
            active={location.pathname === '/principles/colors'}
          >
            Colors
          </SideNav.Item>
          <SideNav.Item
            onClick={navTo}
            to="/principles/typography"
            active={location.pathname === '/principles/typography'}
          >
            Typography
          </SideNav.Item>
        </SideNav.Group>
        <SideNav.Group title="Icons" />
        <SideNav.Group title="Components">
          {components.map(({ description, displayName }) => (
            <SideNav.Item
              key={displayName || description}
              onClick={navTo}
              to={`/components/${displayName}`}
              active={location.pathname === `/components/${displayName}`}
            >
              {displayName}
            </SideNav.Item>
          ))}
        </SideNav.Group>
        <SideNav.Item
          onClick={navTo}
          to="/app"
          active={location.pathname === '/app'}
        >
          App
        </SideNav.Item>
      </SideNav>
    )}
  </Location>
);

export default Nav;
