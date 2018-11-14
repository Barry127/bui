import forwardRef from '../../lib/forwardRef';

import FormLabel from './FormLabel';
import FormRadioGroup from './FormRadioGroup';
import FormRow from './FormRow';
import FPasswordInput from './FormPasswordInput';
import FTextArea from './FormTextArea';
import FTextInput from './FormTextInput';
import FTypeAheadInput from './FormTypeAheadInput';

const FormPasswordInput = forwardRef(FPasswordInput);
const FormTextArea = forwardRef(FTextArea);
const FormTextInput = forwardRef(FTextInput);
const FormTypeAheadInput = forwardRef(FTypeAheadInput);

export { default } from './Form';
export {
  FormLabel,
  FormPasswordInput,
  FormRadioGroup,
  FormRow,
  FormTextArea,
  FormTextInput,
  FormTypeAheadInput
};
