import GoogleDriveImage from '@/Components/GoogleDriveImage';
import Logo from '@/Components/Logo';
import { NAV_ITEMS } from '@/constants/nav-items';
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
                direction={{ xs: 'column-reverse', md: 'row' }}
                justifyContent={{ md: 'space-between' }}
                position="fixed"
                top={0}
                left={0}
                right={0}
                zIndex={3}
                pl={{ md: '10%' }}
                pr={{ xs: 0, md: 10, lg: 20, xl: 25 }}
                sx={{
                    background: trigger
                        ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0) ,rgba(0, 0, 0))'
                        : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) ,rgba(0, 0, 0, 0))',
                }}
            >
                <Box pl={{ xs: '10%', md: 0 }} py={trigger ? { xs: 0, md: 5 } : 10}>
                    {!trigger && (
                        <Box display="inline-block" height={{ xs: 80, md: 120, lg: 160 }}>
                            <Logo mode="dark" />
                        </Box>
                    )}
                </Box>
                <Stack
                    direction="row"
                    {...(trigger ? { alignItems: 'center', py: 2 } : { pt: 8 })}
                    justifyContent={{ xs: 'center', md: 'end' }}
                    gap={{ xs: 4, md: 8 }}
                    color="white"
                    height={1}
                >
                    {NAV_ITEMS.map((item) => (
                        <MuiLink
                            key={item.routeName}
                            component={Link}
                            href={route(item.routeName)}
                            underline="hover"
                            color="background.default"
                            fontSize={{ xs: 12, md: 14, lg: 16 }}
                            fontWeight={route().current(item.routeName) ? 700 : 400}
                            preserveScroll={false}
                        >
                            {t(item.labelKey)}
                        </MuiLink>
                    ))}
                </Stack>
            </Stack>
            <Box height={{ xs: '55vh', md: '100vh' }} position="relative" sx={{ '.swiper': { height: 1 } }}>
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
                    <Stack width={{ xs: 0.7, xl: 0.5 }} height={1} justifyContent="center" pl="10%">
                        <Typography
                            fontSize={{ xs: 12, md: 24, lg: 30, xl: 32 }}
                            color="background.default"
                            whiteSpace="pre-wrap"
                            mb={{ xs: -10, md: 40, lg: 0 }}
                            sx={{ wordSpacing: 1 }}
                        >
                            {websiteContentSetting[`banner_text_${locale}`]}
                        </Typography>
                    </Stack>
                </Box>

                <Swiper loop autoplay slidesPerView={1} modules={[Autoplay]}>
                    {mediaItemsOnBanner.map((mediaItem) => (
                        <SwiperSlide key={mediaItem.id}>
                            <GoogleDriveImage
                                fileName={mediaItem.file_name}
                                containerSx={{ height: 1, width: 1 }}
                                imageSx={{ height: 1, width: 1 }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    );
};

export default BannerSection;
