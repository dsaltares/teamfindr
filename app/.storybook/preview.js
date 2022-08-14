import '@fontsource/poppins';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { HashRouter } from 'react-router-dom';
import ThemeProvider from '@components/providers/ThemeProvider';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
export const decorators = [
  (Story) => (
    <ThemeProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <HashRouter>
          <Story />
        </HashRouter>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  ),
];
