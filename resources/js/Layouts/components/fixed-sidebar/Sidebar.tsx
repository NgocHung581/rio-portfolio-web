import LocaleSwitcher from '@/Components/LocaleSwitcher';
import ThemeModeSwitcher from '@/Components/ThemeModeSwitcher';
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
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
    const { t } = useTranslation();

    return (
        <Stack spacing={6} position="sticky" top={40}>
            <Stack spacing={4}>
                <Box height={200} display="flex" alignItems="center" justifyContent="center">
                    <Box
                        component="img"
                        src="storage/images/avatars/me.jpg"
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
                                <Box component="img" src="storage/images/logos/instagram.png" width={28} height={28} />
                            </MuiLink>
                            <MuiLink href="" target="_blank">
                                <Box component="img" src="storage/images/logos/behance.png" width={28} height={28} />
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
                    <ListItem disablePadding>
                        <ListItemButton
                            disableGutters
                            disableRipple
                            disableTouchRipple
                            sx={{ display: 'inline-flex', flex: 'unset', ':hover': { bgcolor: 'transparent' } }}
                        >
                            <ListItemIcon sx={{ mr: 2 }}>
                                <HomeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('home')} sx={{ flex: 'unset' }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            disableGutters
                            disableRipple
                            disableTouchRipple
                            sx={{ display: 'inline-flex', flex: 'unset', ':hover': { bgcolor: 'transparent' } }}
                        >
                            <ListItemIcon sx={{ mr: 2 }}>
                                <PhotoAlbumOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('projects')} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            disableGutters
                            disableRipple
                            disableTouchRipple
                            sx={{ display: 'inline-flex', flex: 'unset', ':hover': { bgcolor: 'transparent' } }}
                        >
                            <ListItemIcon sx={{ mr: 2 }}>
                                <ContactPageOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('about')} />
                        </ListItemButton>
                    </ListItem>
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
