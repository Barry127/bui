import GettingStarted from './GettingStarted/GettingStarted';

import Affix from './components/Affix/AffixDocs';
import Alert from './components/Alert/AlertDocs';
import Anchor from './components/Anchor/AnchorDocs';
import Badge from './components/Badge/BadgeDocs';

import withTitle from './withTitle';

export default {
  Affix: withTitle('Affix', Affix),
  Alert: withTitle('Alert', Alert),
  Anchor: withTitle('Anchor', Anchor),
  Badge: withTitle('Badge', Badge),
  GettingStarted: withTitle('Getting Started', GettingStarted)
};
