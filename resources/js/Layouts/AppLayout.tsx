import LanguageSwitcher from '@/Components/LanguageSwitcher';
import ScrollToTopButton from '@/Components/ScrollTopButton';
import Box from '@mui/material/Box';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
    return (
        <Box component="main" minHeight="100vh">
            <ScrollToTopButton />
            <LanguageSwitcher />
            {children}
        </Box>
    );
};

export default AppLayout;
