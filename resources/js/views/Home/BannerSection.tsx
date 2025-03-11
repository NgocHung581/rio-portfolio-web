import Image from '@/Components/Image';
import { HomePageProps } from '@/Pages/Home';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const BannerSection = () => {
    const { t } = useTranslation();
    const { albumMediaItems } = usePage<PageProps<HomePageProps>>().props;

    return (
        <Box component="section" borderBottom={4} borderColor="divider">
            <Box height="calc(100vh - 64px)" sx={{ '.swiper': { height: 1 } }}>
                <Swiper loop autoplay spaceBetween={16} slidesPerView={1} modules={[Autoplay]}>
                    {albumMediaItems.map((albumMediaItem) => (
                        <SwiperSlide key={albumMediaItem.id}>
                            <Box
                                component={Link}
                                href={route('albums.show', { album: albumMediaItem.album_id })}
                                height={1}
                                sx={{ img: { width: 1, height: 1, objectFit: 'cover' } }}
                            >
                                <Image src={albumMediaItem.url} />
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
                <Typography
                    component={Link}
                    href={route('albums.index')}
                    variant="h5"
                    sx={{ ':hover': { color: 'primary.main' } }}
                >
                    {t('projects')}
                </Typography>
                <Typography
                    component={Link}
                    href={route('about')}
                    variant="h5"
                    sx={{ ':hover': { color: 'primary.main' } }}
                >
                    {t('about')}
                </Typography>
            </Stack>
        </Box>
    );
};

export default BannerSection;
