import { Link, usePage } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const SOCIAL_CONTACTS = [
    { logo: '/images/logos/linkedin.png', href: '' },
    { logo: '/images/logos/instagram.png', href: '' },
    { logo: '/images/logos/whatsapp.png', href: '' },
    { logo: '/images/logos/zalo.png', href: '' },
];

const Sidebar = () => {
    const { t } = useTranslation();
    const { websiteContentSetting } = usePage().props;

    return (
        <Box>
            <Stack component="nav" width={240} gap={5} divider={<Divider />} position="sticky" top={20} zIndex={1}>
                <Stack alignItems="end">
                    <Box component="img" src="/images/logos/light-logo.png" width={64} />
                </Stack>
                <Stack alignItems="end" gap={2}>
                    <MuiLink
                        component={Link}
                        href={route('home')}
                        underline="hover"
                        color="inherit"
                        fontWeight={route().current('home') ? 700 : 400}
                    >
                        {t('home')}
                    </MuiLink>
                    <MuiLink
                        component={Link}
                        href={route('photography')}
                        underline="hover"
                        color="inherit"
                        fontWeight={route().current('photography') ? 700 : 400}
                    >
                        {t('photography')}
                    </MuiLink>
                    <MuiLink
                        component={Link}
                        href={route('cinematography')}
                        underline="hover"
                        color="inherit"
                        fontWeight={route().current('cinematography') ? 700 : 400}
                    >
                        {t('cinematography')}
                    </MuiLink>
                    <MuiLink
                        component={Link}
                        href={route('about')}
                        underline="hover"
                        color="inherit"
                        fontWeight={route().current('about') ? 700 : 400}
                    >
                        {t('about')}
                    </MuiLink>
                </Stack>
                <Stack alignItems="end" gap={1}>
                    <Stack direction="row" alignItems="center" justifyContent="center" gap={2}>
                        {SOCIAL_CONTACTS.map((item, index) => (
                            <MuiLink key={index} href={item.href} target="_blank">
                                <Box component="img" src={item.logo} width={20} height={20} />
                            </MuiLink>
                        ))}
                    </Stack>
                    <Typography variant="body2" component="a" href={`mailto:${websiteContentSetting.email}`}>
                        {websiteContentSetting.email}
                    </Typography>
                    <Typography variant="body2" component="a" href={`tel:${websiteContentSetting.phone_number}`}>
                        {websiteContentSetting.phone_number}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Sidebar;
