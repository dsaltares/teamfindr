import 'typeface-roboto';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ThemeProvider from '../src/providers/ThemeProvider';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
export const decorators = [
  (Story) => (
    <ThemeProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Story />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  ),
];
