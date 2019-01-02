import components from '../../../config/componentData';

export default name =>
  components.filter(({ displayName }) => displayName === name)[0];
