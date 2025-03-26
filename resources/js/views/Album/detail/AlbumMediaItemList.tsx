import Image from '@/Components/Image';
import { AlbumDetailPageProps } from '@/Pages/Album/Detail';
import { PageProps } from '@/types';
import { AlbumMediaItem } from '@/types/albumMediaItem';
import { usePage } from '@inertiajs/react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import styled from '@mui/material/styles/styled';
import { Fragment, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import { EffectFade, Navigation, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const StyledIconButton = styled(IconButton)({
    backgroundColor: '#343434',
    color: 'white',
    ':hover': {
        backgroundColor: 'dimgray',
    },
});

const AlbumMediaItemList = () => {
    const { album } = usePage<PageProps<AlbumDetailPageProps>>().props;

    const [openCarousel, setOpenCarousel] = useState(false);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const handleOpenCarousel = (albumMediaItem: AlbumMediaItem) => {
        const index = album.media_items!.findIndex((item) => item.id === albumMediaItem.id);

        setOpenCarousel(true);
        setActiveSlideIndex(index);
    };

    const handleCloseCarousel = () => {
        setOpenCarousel(false);
        setActiveSlideIndex(0);
    };

    return (
        <Fragment>
            <Grid container spacing={2}>
                {album.media_items?.map((albumMediaItem) => (
                    <Grid key={albumMediaItem.id} size={albumMediaItem.column_span}>
                        <Image
                            src={albumMediaItem.url}
                            alt={album.name}
                            imageSx={{ width: 1, height: 1, objectFit: 'cover' }}
                            isVideo={!!albumMediaItem.video_thumbnail_url}
                            videoThumbnailUrl={albumMediaItem.video_thumbnail_url}
                            onClick={() => handleOpenCarousel(albumMediaItem)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Dialog
                open={openCarousel}
                fullScreen
                slotProps={{ paper: { sx: { backgroundColor: 'black', position: 'relative' } } }}
            >
                <StyledIconButton
                    size="large"
                    sx={{ position: 'absolute', top: 20, right: 20, zIndex: 2 }}
                    onClick={handleCloseCarousel}
                >
                    <ClearIcon fontSize="small" />
                </StyledIconButton>
                <Box
                    maxHeight={1}
                    height={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={10}
                    mx={{ sm: 5 }}
                    sx={{ '.swiper': { width: 1, height: 1 } }}
                >
                    <StyledIconButton
                        id="swiper-button-prev"
                        size="large"
                        sx={{
                            display: { xs: 'none', sm: 'inline-flex' },
                            '&.swiper-button-disabled': { opacity: 0, pointerEvents: 'none' },
                        }}
                    >
                        <ArrowBackIosNewIcon fontSize="small" />
                    </StyledIconButton>
                    <Swiper
                        spaceBetween={16}
                        effect="fade"
                        navigation={{ nextEl: '#swiper-button-next', prevEl: '#swiper-button-prev' }}
                        grabCursor
                        centeredSlides
                        zoom
                        modules={[Zoom, EffectFade, Navigation]}
                        fadeEffect={{ crossFade: true }}
                        onInit={(swiper) => swiper.slideTo(activeSlideIndex, 0)}
                    >
                        {album.media_items?.map((albumMediaItem) => (
                            <SwiperSlide key={albumMediaItem.id}>
                                <Image
                                    src={albumMediaItem.url}
                                    alt={album.name}
                                    isVideo={!!albumMediaItem.video_thumbnail_url}
                                    videoThumbnailUrl={albumMediaItem.video_thumbnail_url}
                                    containerSx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    containerClassName="swiper-zoom-container"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <StyledIconButton
                        id="swiper-button-next"
                        size="large"
                        sx={{
                            display: { xs: 'none', sm: 'inline-flex' },
                            '&.swiper-button-disabled': { opacity: 0, pointerEvents: 'none' },
                        }}
                    >
                        <ArrowForwardIosIcon fontSize="small" />
                    </StyledIconButton>
                </Box>
            </Dialog>
        </Fragment>
    );
};

export default AlbumMediaItemList;
