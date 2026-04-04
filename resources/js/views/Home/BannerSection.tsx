import { HomePageProps } from '@/Pages/Home';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useTranslation } from 'react-i18next';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const BannerSection = () => {
    const { t } = useTranslation();
    const { mediaItemsOnBanner, websiteContentSetting, locale } = usePage<PageProps<HomePageProps>>().props;

    const trigger = useScrollTrigger({
        target: window,
        disableHysteresis: true,
        threshold: 0,
    });

    return (
        <Box component="section" position="relative">
            <Stack
                direction="row"
                justifyContent="space-between"
                position="fixed"
                top={0}
                left={0}
                right={0}
                zIndex={3}
                pl="10%"
                pr={25}
                sx={{
                    background: trigger
                        ? 'linear-gradient(to right, rgba(0, 0, 0, 0) ,rgba(0, 0, 0))'
                        : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) ,rgba(0, 0, 0, 0))',
                }}
            >
                <Box py={trigger ? 5 : 8}>
                    {!trigger && <Box component="img" src="/images/logos/dark-logo.png" height={160} />}
                </Box>
                <Stack direction="row" {...(trigger ? { alignItems: 'center' } : { pt: 8 })} gap={8} color="white">
                    <MuiLink
                        component={Link}
                        href={route('home')}
                        underline="hover"
                        color="background.default"
                        fontWeight={route().current('home') ? 700 : 400}
                    >
                        {t('home')}
                    </MuiLink>
                    <MuiLink
                        component={Link}
                        href={route('photography')}
                        underline="hover"
                        color="background.default"
                        fontWeight={route().current('photography') ? 700 : 400}
                    >
                        {t('photography')}
                    </MuiLink>
                    <MuiLink
                        component={Link}
                        href={route('cinematography')}
                        underline="hover"
                        color="background.default"
                        fontWeight={route().current('cinematography') ? 700 : 400}
                    >
                        {t('cinematography')}
                    </MuiLink>
                    <MuiLink
                        component={Link}
                        href={route('about')}
                        underline="hover"
                        color="background.default"
                        fontWeight={route().current('about') ? 700 : 400}
                    >
                        {t('about')}
                    </MuiLink>
                </Stack>
            </Stack>
            <Box height="100vh" position="relative" sx={{ '.swiper': { height: 1 } }}>
                <Box
                    position="absolute"
                    sx={{
                        inset: 0,
                        zIndex: 2,
                        pointerEvents: 'none',
                        background:
                            'linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 75%)',
                    }}
                >
                    <Stack width={0.5} height={1} justifyContent="center" pl="10%">
                        <Typography fontSize="2rem" color="background.default" whiteSpace="pre-wrap">
                            {websiteContentSetting[`banner_text_${locale}`]}
                        </Typography>
                    </Stack>
                </Box>

                <Swiper loop autoplay slidesPerView={1} modules={[Autoplay]}>
                    {mediaItemsOnBanner.map((mediaItem) => (
                        <SwiperSlide key={mediaItem.id}>
                            <Box component="img" src={mediaItem.file_url} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    );
};

export default BannerSection;
