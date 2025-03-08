import theme from '@/@core/theme';
import ScrollToTopButton from '@/Components/ScrollTopButton';
import { PropsWithChildren } from '@/types';
import CssBaseline from '@mui/material/CssBaseline';
import MuiThemeProvider from '@mui/material/styles/ThemeProvider';

const ThemeProvider = ({ children }: PropsWithChildren) => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <ScrollToTopButton />
            {children}
        </MuiThemeProvider>
    );
};

export default ThemeProvider;
