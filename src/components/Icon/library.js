const icons = {};

export const registerIcon = ({ name, aliasses, icon }) => {
  if (icons[name]) {
    throw new BuiIconError(`Icon with name ${name} already registerd`);
  }

  icon.attrs = icon.attrs || {};

  icons[name] = { name, icon };

  if (Array.isArray(aliasses)) {
    aliasses.forEach(alias => {
      if (icons[alias]) {
        throw new BuiIconError(
          `Could not create alias: Icon with name ${name} already registerd`
        );
      }

      icons[alias] = icons[name];
    });
  }
};

export class BuiIconError extends Error {}

export default icons;
