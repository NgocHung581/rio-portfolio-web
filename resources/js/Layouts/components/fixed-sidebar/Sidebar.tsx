import { Link } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import MuiLink from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import listItemIconClasses from '@mui/material/ListItemIcon/listItemIconClasses';
import ListItemText from '@mui/material/ListItemText';
import listItemTextClasses from '@mui/material/ListItemText/listItemTextClasses';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const NAVIGATION = [
    { label_key: 'home', route_name: 'home' },
    { label_key: 'projects', route_name: 'albums.index' },
    { label_key: 'about', route_name: 'about' },
];

const STICKY_TOP = 40;

const Sidebar = () => {
    const { t } = useTranslation();

    const sidebarRef = useRef<HTMLDivElement>(null);

    const [showLogo, setShowLogo] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const rect = sidebarRef.current!.getBoundingClientRect();

            if (showLogo !== rect.top <= STICKY_TOP) {
                setShowLogo(rect.top <= STICKY_TOP);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [showLogo]);

    return (
        <Stack ref={sidebarRef} spacing={6} position="sticky" top={STICKY_TOP} divider={<Divider />}>
            <Stack spacing={4}>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Zoom in={showLogo} unmountOnExit timeout={{ enter: 300, exit: 0 }}>
                        <Box component="img" src="/storage/images/logos/fake-app.png" />
                    </Zoom>
                    <Zoom in={!showLogo} unmountOnExit timeout={{ enter: 300, exit: 0 }}>
                        <Box
                            component="img"
                            src="/storage/images/avatars/me.jpg"
                            sx={{ aspectRatio: 3 / 4, objectFit: 'cover' }}
                        />
                    </Zoom>
                </Box>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                    <MuiLink href="" target="_blank">
                        <Box component="img" src="/storage/images/logos/instagram.png" width={28} height={28} />
                    </MuiLink>
                    <MuiLink href="" target="_blank">
                        <Box component="img" src="/storage/images/logos/behance.png" width={28} height={28} />
                    </MuiLink>
                </Stack>
                {!showLogo && (
                    <Typography variant="body2" textAlign="center">
                        {'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit veritatis nisi minus ut laborum quisquam nobis, exercitationem dicta! Aspernatur obcaecati, ducimus tempore asperiores dolores at doloribus ab earum sit nobis.'.substring(
                            0,
                            100,
                        )}
                        ...{' '}
                        <MuiLink component={Link} href={route('about')} fontWeight={500} underline="hover">
                            {t('read_more')}
                        </MuiLink>
                    </Typography>
                )}
            </Stack>
            <List disablePadding>
                {NAVIGATION.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            LinkComponent={Link}
                            href={route(item.route_name)}
                            selected={route().current(item.route_name)}
                            disableGutters
                            disableRipple
                            disableTouchRipple
                            sx={{
                                display: 'inline-flex',
                                flex: 'unset',
                                ':hover': {
                                    bgcolor: 'transparent',
                                    [`.${listItemIconClasses.root}, .${listItemTextClasses.primary}`]: {
                                        color: 'text.primary',
                                    },
                                },
                                '&.Mui-selected': {
                                    bgcolor: 'transparent',
                                    ':hover': { bgcolor: 'transparent' },
                                    [`.${listItemIconClasses.root}, .${listItemTextClasses.primary}`]: {
                                        color: 'primary.main',
                                        fontWeight: 500,
                                    },
                                },
                            }}
                        >
                            <ListItemText
                                primary={t(item.label_key)}
                                sx={{ flex: 'unset' }}
                                slotProps={{ primary: { color: 'textSecondary' } }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {showLogo && (
                <Stack spacing={4}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid size={{ xs: 12, xl: 3 }}>
                            <Typography fontWeight={500}>{t('name')}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, xl: 9 }}>
                            <Typography>Lê Tấn Thông</Typography>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid size={{ xs: 12, xl: 3 }}>
                            <Typography fontWeight={500}>{t('phone')}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, xl: 9 }}>
                            <Typography>0123456789</Typography>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid size={{ xs: 12, xl: 3 }}>
                            <Typography fontWeight={500}>{t('email')}</Typography>
                        </Grid>
                        <Grid size={{ xs: 12, xl: 9 }}>
                            <Typography>example@gmail.com</Typography>
                        </Grid>
                    </Grid>
                </Stack>
            )}
        </Stack>
    );
};

export default Sidebar;
