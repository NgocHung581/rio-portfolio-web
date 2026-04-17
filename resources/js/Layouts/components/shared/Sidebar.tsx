import Logo from '@/Components/Logo';
import SocialContacts from '@/Components/SocialContacts';
import { NAV_ITEMS } from '@/constants/nav-items';
import { Link } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import HamburgerMenu from './HamburgerMenu';

const Sidebar = () => {
    const { t } = useTranslation();
    const isFromMdScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

    if (!isFromMdScreen) {
        if (trigger) return <HamburgerMenu />;

        return (
            <Fragment>
                <Stack alignItems="center" gap={6} position="sticky" top={0} zIndex={1}>
                    <Box width={{ xs: 48, xl: 64 }}>
                        <Logo mode="light" />
                    </Box>
                    <Stack direction="row" alignItems="center" justifyContent="center" gap={4}>
                        {NAV_ITEMS.map((item) => (
                            <MuiLink
                                key={item.routeName}
                                component={Link}
                                href={route(item.routeName)}
                                underline="hover"
                                color="inherit"
                                fontSize={{ xs: 12, xl: 14 }}
                                fontWeight={route().current(item.routeName) ? 700 : 400}
                                preserveScroll={false}
                            >
                                {t(item.labelKey)}
                            </MuiLink>
                        ))}
                    </Stack>
                </Stack>
                <Divider sx={{ width: 0.5, mx: 'auto', my: 6 }} />
            </Fragment>
        );
    }

    return (
        <Box>
            <Stack
                component="nav"
                width={{ xs: 80, md: 140, xl: 240 }}
                gap={5}
                divider={<Divider />}
                position="sticky"
                top={trigger ? '50%' : 20}
                zIndex={1}
                sx={(theme) => ({
                    transform: trigger ? 'translateY(-50%)' : 'translateY(0)',
                    transition: theme.transitions.create(['top', 'transform'], { easing: 'linear' }),
                })}
            >
                <Stack alignItems="end">
                    <Box component="img" src="/images/logos/light-logo.png" width={{ xs: 48, xl: 64 }} />
                </Stack>
                <Stack alignItems="end" gap={2}>
                    {NAV_ITEMS.map((item) => (
                        <MuiLink
                            key={item.routeName}
                            component={Link}
                            href={route(item.routeName)}
                            underline="hover"
                            color="inherit"
                            fontSize={{ xs: 12, xl: 14 }}
                            fontWeight={route().current(item.routeName) ? 700 : 400}
                        >
                            {t(item.labelKey)}
                        </MuiLink>
                    ))}
                </Stack>
                <SocialContacts align="end" />
            </Stack>
        </Box>
    );
};

export default Sidebar;
