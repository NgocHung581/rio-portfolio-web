import { PropsWithChildren } from '@/types';
import { Head } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';
import Sidebar from './components/fixed-sidebar/Sidebar';
import SettingsButton from './components/shared/SettingsButton';

type Props = {
    header?: ReactNode;
    title?: string;
    footer?: ReactNode;
};

const FixedSidebarLayout = ({ header, children, title, footer }: PropsWithChildren<Props>) => {
    return (
        <Stack minHeight="100vh">
            <Head title={title} />
            {header}
            <Box flex={1} px={6} py={10}>
                <Grid container spacing={10}>
                    <Grid size={{ md: 2 }}>
                        <Sidebar />
                    </Grid>
                    <Grid size={{ md: 10 }}>
                        <Box component="main" height={1}>
                            {children}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {footer}
            <SettingsButton />
        </Stack>
    );
};

export default FixedSidebarLayout;
