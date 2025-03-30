import { PropsWithChildren } from '@/types';
import { Head } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Fragment, ReactNode } from 'react';
import Sidebar, { SidebarProps } from './components/fixed-sidebar/Sidebar';
import SettingsButton from './components/shared/SettingsButton';

type Props = {
    header?: ReactNode;
    title?: string;
    footer?: ReactNode;
    withContainer?: boolean;
    sidebarProps?: SidebarProps;
};

const FixedSidebarLayout = ({
    header,
    children,
    title,
    footer,
    withContainer,
    sidebarProps,
}: PropsWithChildren<Props>) => {
    const Wrapper = withContainer ? Container : Fragment;

    return (
        <Stack minHeight="100vh">
            <Head title={title} />
            {header}
            <Box flex={1} px={6} py={10}>
                <Wrapper {...(withContainer && { sx: { height: 1 } })}>
                    <Stack height={1} direction="row" gap={10}>
                        <Sidebar {...sidebarProps} />
                        <Box component="main" flex={1} height={1}>
                            {children}
                        </Box>
                    </Stack>
                </Wrapper>
            </Box>
            {footer}
            <SettingsButton />
        </Stack>
    );
};

export default FixedSidebarLayout;
