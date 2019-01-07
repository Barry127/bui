import GettingStarted from './GettingStarted/GettingStarted';

import Affix from './components/Affix/AffixDocs';
import Alert from './components/Alert/AlertDocs';

import withTitle from './withTitle';

export default {
  Affix: withTitle('Affix', Affix),
  Alert: withTitle('Alert', Alert),
  GettingStarted: withTitle('Getting Started', GettingStarted)
};
