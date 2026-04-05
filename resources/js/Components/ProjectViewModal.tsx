import ProseWrapper from '@/Components/ProseWrapper';
import MediaType, { MediaTypeValue } from '@/enums/media-type';
import { PageProps } from '@/types';
import { Gallery, MediaItem, Project } from '@/types/project';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Fragment, MutableRefObject, ReactNode, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InnerImageZoom from 'react-inner-image-zoom';
import { useScroll } from 'react-use';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type RenderTriggerProps = {
    openModal: () => void;
};

type ProjectInfo = Pick<
    Project,
    'title_en' | 'title_vi' | 'description_en' | 'description_vi' | 'summary_en' | 'summary_vi'
> & {
    galleries: (Pick<Gallery, 'caption'> & { media_items: Pick<MediaItem, 'file_url' | 'frame'>[] })[];
    mediaType: MediaTypeValue;
};

type Props = {
    renderTrigger: (props: RenderTriggerProps) => ReactNode;
    projectInfo: ProjectInfo;
    locale: PageProps['locale'];
};

const ProjectViewModal = ({ renderTrigger, projectInfo, locale }: Props) => {
    const { t } = useTranslation();

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [openModal, setOpenModal] = useState(false);
    const [openSubModal, setOpenSubModal] = useState(false);
    const [activeSlide, setActiveSlide] = useState<number | undefined>(undefined);

    const mediaItems = projectInfo.galleries.map((gallery) => gallery.media_items).flat();

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenSubModal = (fileUrl: string) => {
        const index = mediaItems.findIndex((mediaItem) => mediaItem.file_url === fileUrl);

        setOpenSubModal(true);
        setActiveSlide(index);
    };

    const handleCloseSubModal = () => {
        setOpenSubModal(false);
        setActiveSlide(undefined);
    };

    return (
        <Fragment>
            {renderTrigger({ openModal: handleOpenModal })}
            <Dialog
                scroll="body"
                open={openModal}
                onClose={handleCloseModal}
                maxWidth="xl"
                fullWidth
                slotProps={{
                    backdrop: { sx: { backdropFilter: 'blur(4px)' } },
                    container: { ref: scrollContainerRef },
                    paper: {
                        sx: {
                            backgroundColor: 'background.default',
                            py: 15,
                            m: { xs: 0, md: 8 },
                            [`&.${dialogClasses.paperScrollBody}`]: {
                                width: { xs: 1, md: 'calc(100% - 64px)' },
                                maxWidth: { xs: 1, md: 'calc(100% - 64px)' },
                            },
                        },
                    },
                }}
            >
                <Stack alignItems="center" spacing={{ xs: 5, md: 10, lg: 15 }}>
                    <Typography textAlign="center" fontSize={{ xs: 16, md: 18, lg: 20 }} fontWeight={900}>
                        {projectInfo[`title_${locale}`]}
                    </Typography>
                    <Box fontSize={14}>
                        <ProseWrapper>
                            <Box
                                dangerouslySetInnerHTML={{ __html: projectInfo[`description_${locale}`] }}
                                width={0.75}
                                mx="auto"
                            />
                        </ProseWrapper>
                    </Box>
                    {projectInfo.galleries.map((gallery, galleryIndex) => (
                        <Stack key={galleryIndex} alignItems="center" gap={{ xs: 5, md: 15 }} width={1}>
                            <Grid container spacing={1} sx={{ width: 1 }}>
                                {gallery.media_items.map((mediaItem, mediaItemIndex) => (
                                    <Grid
                                        key={mediaItemIndex}
                                        size={12 / gallery.media_items.length}
                                        onClick={() => handleOpenSubModal(mediaItem.file_url)}
                                    >
                                        {projectInfo.mediaType === MediaType.Video ? (
                                            <Box
                                                component="video"
                                                controls
                                                width={1}
                                                sx={{ aspectRatio: mediaItem.frame }}
                                            >
                                                <source src={mediaItem.file_url} />
                                            </Box>
                                        ) : (
                                            <Box
                                                component="img"
                                                src={mediaItem.file_url}
                                                sx={{ aspectRatio: mediaItem.frame }}
                                            />
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                            {!!gallery.caption && (
                                <Typography
                                    variant="caption"
                                    fontSize={{ xs: 9, md: 10 }}
                                    fontWeight={700}
                                    width={0.75}
                                    mx="auto"
                                    textAlign="center"
                                >
                                    {gallery.caption}
                                </Typography>
                            )}
                        </Stack>
                    ))}
                    <ProseWrapper>
                        <Box
                            fontSize={14}
                            dangerouslySetInnerHTML={{ __html: projectInfo[`summary_${locale}`] }}
                            width={0.75}
                            mx="auto"
                        />
                    </ProseWrapper>
                    <Typography textTransform="uppercase" fontWeight={700} fontSize={14}>
                        {t('the_end')}
                    </Typography>
                </Stack>
                <IconButton
                    disableRipple
                    sx={{
                        position: 'fixed',
                        top: 10,
                        right: { xs: 10, md: 20 },
                        backgroundColor: alpha('#000', 0.2),
                        color: 'white',
                        ':hover': {
                            backgroundColor:
                                'rgb(var(--mui-palette-action-activeChannel) / var(--mui-palette-action-disabledOpacity))',
                        },
                    }}
                    onClick={handleCloseModal}
                >
                    <ClearIcon fontSize="small" />
                </IconButton>
                <ScrollTopButton containerRef={scrollContainerRef} />
            </Dialog>
            <Dialog
                open={openSubModal}
                onClose={(_, reason) => {
                    if (reason === 'backdropClick') return;

                    handleCloseSubModal();
                }}
                maxWidth="xl"
                fullWidth
                slotProps={{
                    backdrop: { sx: { bgcolor: 'rgba(0, 0, 0, 0.9)' } },
                    paper: { square: true, sx: { my: 0, height: 1, maxHeight: 1, bgcolor: 'transparent' } },
                }}
            >
                <Box height={1} maxHeight={1} sx={{ '> .swiper': { height: 1, maxHeight: 1 } }}>
                    <Swiper
                        navigation={{ nextEl: '#swiper-button-next', prevEl: '#swiper-button-prev' }}
                        modules={[Navigation]}
                        initialSlide={activeSlide}
                    >
                        {mediaItems.map((mediaItem) => (
                            <SwiperSlide key={mediaItem.file_url} style={{ textAlign: 'center', userSelect: 'none' }}>
                                {projectInfo.mediaType === MediaType.Video ? (
                                    <Box component="video" controls width={1} sx={{ aspectRatio: mediaItem.frame }}>
                                        <source src={mediaItem.file_url} />
                                    </Box>
                                ) : (
                                    <Box
                                        component={InnerImageZoom}
                                        src={mediaItem.file_url}
                                        zoomSrc={mediaItem.file_url}
                                        fullscreenOnMobile
                                        hideHint
                                        sx={{
                                            aspectRatio: mediaItem.frame,
                                            height: 1,
                                            maxHeight: 1,
                                            width: 'auto',
                                            maxWidth: 1,
                                            mx: 'auto',
                                        }}
                                    />
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
                <Box sx={{ position: 'fixed', bottom: 0, left: 28, py: 4 }}>
                    <Box component="img" src="/images/logos/dark-logo.png" width={50} />
                </Box>
                <IconButton
                    disableRipple
                    sx={{
                        position: 'fixed',
                        top: 10,
                        right: 20,
                        backgroundColor: grey[600],
                        color: 'white',
                        ':hover': { backgroundColor: grey[500] },
                    }}
                    onClick={handleCloseSubModal}
                >
                    <ClearIcon fontSize="small" />
                </IconButton>
                <IconButton
                    disableRipple
                    id="swiper-button-prev"
                    sx={{
                        position: 'fixed',
                        left: 20,
                        top: '50%',
                        zIndex: 1,
                        transform: 'translateY(-50%)',
                        backgroundColor: grey[600],
                        color: 'white',
                        ':hover': { bgcolor: grey[500] },
                        '&.swiper-button-disabled': { display: 'none' },
                    }}
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton
                    disableRipple
                    id="swiper-button-next"
                    sx={{
                        position: 'fixed',
                        right: 20,
                        top: '50%',
                        zIndex: 1,
                        transform: 'translateY(-50%)',
                        backgroundColor: grey[600],
                        color: 'white',
                        ':hover': { backgroundColor: grey[500] },
                        '&.swiper-button-disabled': { display: 'none' },
                    }}
                >
                    <KeyboardArrowRightIcon />
                </IconButton>
            </Dialog>
        </Fragment>
    );
};

export default ProjectViewModal;

type ScrollTopButtonProps = {
    containerRef: MutableRefObject<HTMLDivElement | null>;
};

function ScrollTopButton({ containerRef }: ScrollTopButtonProps) {
    const { t } = useTranslation();
    const { y } = useScroll(containerRef);

    return (
        <Fade in={y > 0} unmountOnExit>
            <Tooltip title={t('scroll_to_top')} placement="left">
                <Box
                    onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                    sx={{ position: 'fixed', bottom: 10, right: 10, zIndex: 5 }}
                >
                    <Fab
                        size="small"
                        sx={{
                            width: 36,
                            height: 36,
                            bgcolor: 'rgba(var(--mui-palette-background-defaultChannel) / 0.5)',
                            ':hover': { bgcolor: 'background.default' },
                        }}
                    >
                        <KeyboardArrowUpIcon fontSize="small" />
                    </Fab>
                </Box>
            </Tooltip>
        </Fade>
    );
}
