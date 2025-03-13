import { PropsWithChildren } from '@/types';
import { Head } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';
import Sidebar from './components/fixed-sidebar/Sidebar';

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
            <Box flex={1} p={10}>
                <Grid container spacing={6}>
                    <Grid size={{ md: 3 }}>
                        <Sidebar />
                    </Grid>
                    <Grid size={{ md: 9 }}>
                        <Box component="main" height={1}>
                            <Container sx={{ height: 1 }}>{children}</Container>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {footer}
        </Stack>
    );
};

export default FixedSidebarLayout;
