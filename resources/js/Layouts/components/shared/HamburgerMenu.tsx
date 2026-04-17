import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MuiLink from '@mui/material/Link';
import { NAV_ITEMS } from '@/constants/nav-items';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

const HamburgerMenu = () => {
    const { t } = useTranslation();

    const [openMobileNav, setOpenMobileNav] = useState(false);

    return (
        <ClickAwayListener onClickAway={() => setOpenMobileNav(false)}>
            <Stack
                position="fixed"
                top={0}
                left={0}
                zIndex={10}
                sx={(theme) => ({
                    width: openMobileNav ? 1 : 40,
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) ,rgba(0, 0, 0))',
                    transition: theme.transitions.create('width', { easing: 'linear' }),
                })}
            >
                {openMobileNav ? (
                    <Stack height={40} direction="row" alignItems="center" justifyContent="center" gap={4}>
                        {NAV_ITEMS.map((item) => (
                            <MuiLink
                                key={item.routeName}
                                component={Link}
                                href={route(item.routeName)}
                                underline="hover"
                                color="background.default"
                                fontSize={{ xs: 12, xl: 14 }}
                                fontWeight={route().current(item.routeName) ? 700 : 400}
                                preserveScroll={false}
                            >
                                {t(item.labelKey)}
                            </MuiLink>
                        ))}
                    </Stack>
                ) : (
                    <IconButton onClick={() => setOpenMobileNav(true)}>
                        <MenuIcon />
                    </IconButton>
                )}
            </Stack>
        </ClickAwayListener>
    );
};

export default HamburgerMenu;
