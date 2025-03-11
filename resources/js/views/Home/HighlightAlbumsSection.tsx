import Image from '@/Components/Image';
import { HomePageProps } from '@/Pages/Home';
import { PageProps, PaginatedData } from '@/types';
import { Album } from '@/types/album';
import { Link, usePage } from '@inertiajs/react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Backdrop from '@mui/material/Backdrop';
import backdropClasses from '@mui/material/Backdrop/backdropClasses';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const HighlightAlbumsSection = () => {
    const { t } = useTranslation();
    const pageProps = usePage<PageProps<HomePageProps>>().props;

    const [highlightAlbums, setHighlightAlbums] = useState<PaginatedData<Album>>(pageProps.highlightAlbums);
    const [page, setPage] = useState(pageProps.highlightAlbums.meta.current_page);
    const [isFetching, setIsFetching] = useState(false);

    const handleViewMore = async () => {
        setIsFetching(true);

        const newPage = page + 1;
        const res = await window.axios.get<PaginatedData<Album>>(
            route('api.listHighlightAlbums', { _query: { page: newPage } }),
        );

        setIsFetching(false);
        setHighlightAlbums((prev) => ({ ...prev, ...res.data, data: [...prev.data, ...res.data.data] }));
        setPage(newPage);
    };

    return (
        <Stack component="section" spacing={6}>
            <Typography
                variant="h2"
                textAlign="center"
                sx={{
                    '::after': {
                        content: '""',
                        display: 'block',
                        width: 50,
                        height: 4,
                        bgcolor: 'primary.main',
                        mt: 1,
                        mx: 'auto',
                        borderRadius: 99,
                    },
                }}
            >
                {t('projects')}
            </Typography>
            <Grid container spacing={2}>
                {highlightAlbums.data.map((album) => (
                    <Grid key={album.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box
                            position={'relative'}
                            sx={{
                                img: { aspectRatio: 4 / 5, width: 1, objectFit: 'cover' },
                                [`:hover .${backdropClasses.root}`]: {
                                    zIndex: 1,
                                },
                            }}
                        >
                            <Image src={album.thumbnail.url} />
                            <Backdrop open sx={{ position: 'absolute', zIndex: -1 }}>
                                <Button
                                    LinkComponent={Link}
                                    href={route('albums.show', album)}
                                    startIcon={<VisibilityOutlinedIcon />}
                                >
                                    {t('view_project')}
                                </Button>
                            </Backdrop>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            {highlightAlbums.meta.current_page !== highlightAlbums.meta.last_page && (
                <Box textAlign="center">
                    <Button loading={isFetching} onClick={handleViewMore}>
                        {t('view_more')}
                    </Button>
                </Box>
            )}
        </Stack>
    );
};

export default HighlightAlbumsSection;
