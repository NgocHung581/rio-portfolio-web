import Image from '@/Components/Image';
import { HomePageProps } from '@/Pages/Home';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const BannerSection = () => {
    const { t } = useTranslation();
    const { albumMediaItemsOnBanner } = usePage<PageProps<HomePageProps>>().props;

    return (
        <Box component="section" borderBottom={4} borderColor="divider">
            <Box height="calc(100vh - 64px)" sx={{ '.swiper': { height: 1 } }}>
                <Swiper loop autoplay spaceBetween={16} slidesPerView={1} modules={[Autoplay]}>
                    {albumMediaItemsOnBanner.map((albumMediaItem) => (
                        <SwiperSlide key={albumMediaItem.id}>
                            <Box component={Link} href={route('albums.show', albumMediaItem.album)} height={1}>
                                <Image src={albumMediaItem.url} imageSx={{ width: 1, height: 1, objectFit: 'cover' }} />
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            <Stack
                px={10}
                height={64}
                direction="row"
                alignItems="center"
                gap={5}
                divider={<ArrowForwardIosIcon fontSize="small" />}
            >
                <MuiLink
                    component={Link}
                    href={route('albums.index')}
                    underline="none"
                    variant="h5"
                    color="textPrimary"
                    sx={{ ':hover': { color: 'primary.main' } }}
                >
                    {t('projects')}
                </MuiLink>
                <MuiLink
                    component={Link}
                    href={route('about')}
                    underline="none"
                    variant="h5"
                    color="textPrimary"
                    sx={{ ':hover': { color: 'primary.main' } }}
                >
                    {t('about')}
                </MuiLink>
            </Stack>
        </Box>
    );
};

export default BannerSection;
