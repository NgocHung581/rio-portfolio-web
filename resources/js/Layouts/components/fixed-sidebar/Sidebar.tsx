import LocaleSwitcher from '@/Components/LocaleSwitcher';
import ThemeModeSwitcher from '@/Components/ThemeModeSwitcher';
import { Link } from '@inertiajs/react';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import MuiLink from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import listItemIconClasses from '@mui/material/ListItemIcon/listItemIconClasses';
import ListItemText from '@mui/material/ListItemText';
import listItemTextClasses from '@mui/material/ListItemText/listItemTextClasses';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const NAVIGATION = [
    { label_key: 'home', icon: <HomeOutlinedIcon />, route_name: 'home' },
    { label_key: 'projects', icon: <PhotoAlbumOutlinedIcon />, route_name: 'albums.index' },
    { label_key: 'about', icon: <ContactPageOutlinedIcon />, route_name: 'about' },
];

const Sidebar = () => {
    const { t } = useTranslation();

    return (
        <Stack spacing={6} position="sticky" top={40}>
            <Stack spacing={4}>
                <Box height={200} display="flex" alignItems="center" justifyContent="center">
                    <Box
                        component="img"
                        src="/storage/images/avatars/me.jpg"
                        height={1}
                        sx={{ aspectRatio: 3 / 4, objectFit: 'cover' }}
                    />
                </Box>
                <Grid container alignItems="center" spacing={2}>
                    <Grid size={{ lg: 3 }}>
                        <Typography fontWeight={500}>{t('name')}</Typography>
                    </Grid>
                    <Grid size={{ lg: 9 }}>
                        <Typography>Lê Tấn Thông</Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={2}>
                    <Grid size={{ lg: 3 }}>
                        <Typography fontWeight={500}>{t('phone')}</Typography>
                    </Grid>
                    <Grid size={{ lg: 9 }}>
                        <Typography>0123456789</Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={2}>
                    <Grid size={{ lg: 3 }}>
                        <Typography fontWeight={500}>{t('email')}</Typography>
                    </Grid>
                    <Grid size={{ lg: 9 }}>
                        <Typography>example@gmail.com</Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={2}>
                    <Grid size={{ lg: 3 }}>
                        <Typography fontWeight={500}>{t('social')}</Typography>
                    </Grid>
                    <Grid size={{ lg: 9 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <MuiLink href="" target="_blank">
                                <Box component="img" src="/storage/images/logos/instagram.png" width={28} height={28} />
                            </MuiLink>
                            <MuiLink href="" target="_blank">
                                <Box component="img" src="/storage/images/logos/behance.png" width={28} height={28} />
                            </MuiLink>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
            <Box>
                <Divider sx={{ mb: 2 }}>
                    <Typography fontWeight={500} color="textSecondary">
                        {t('pages')}
                    </Typography>
                </Divider>
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
                                <ListItemIcon sx={{ mr: 2 }}>{item.icon}</ListItemIcon>
                                <ListItemText
                                    primary={t(item.label_key)}
                                    sx={{ flex: 'unset' }}
                                    slotProps={{ primary: { color: 'textSecondary' } }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box>
                <Divider sx={{ mb: 2 }}>
                    <Typography fontWeight={500} color="textSecondary">
                        {t('settings')}
                    </Typography>
                </Divider>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <LocaleSwitcher />
                    <ThemeModeSwitcher />
                </Stack>
            </Box>
        </Stack>
    );
};

export default Sidebar;
