import theme from '@/@core/theme';
import { PropsWithChildren } from '@/types';
import CssBaseline from '@mui/material/CssBaseline';
import MuiThemeProvider from '@mui/material/styles/ThemeProvider';

const ThemeProvider = ({ children }: PropsWithChildren) => {
    return (
        <MuiThemeProvider theme={theme} defaultMode="light">
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};

export default ThemeProvider;
