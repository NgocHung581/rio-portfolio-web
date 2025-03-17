import { PaginatedData } from '@/types';
import { Album } from '@/types/album';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AlbumCard from './AlbumCard';

type Props = {
    albums: PaginatedData<Album>;
    fetchMoreAlbumsRouteName: string;
};

const AlbumList = ({ albums: initAlbums, fetchMoreAlbumsRouteName }: Props) => {
    const { t } = useTranslation();

    const [albums, setAlbums] = useState(initAlbums);
    const [page, setPage] = useState(initAlbums.meta.current_page);
    const [isFetching, setIsFetching] = useState(false);

    const handleViewMore = async () => {
        setIsFetching(true);

        const newPage = page + 1;
        const res = await window.axios.get<PaginatedData<Album>>(
            route(fetchMoreAlbumsRouteName, { _query: { page: newPage } }),
        );

        setIsFetching(false);
        setAlbums((prev) => ({ ...prev, ...res.data, data: [...prev.data, ...res.data.data] }));
        setPage(newPage);
    };

    return (
        <Stack spacing={6}>
            <Grid container spacing={5.5}>
                {albums.data.map((album) => (
                    <Grid key={album.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <AlbumCard album={album} />
                    </Grid>
                ))}
            </Grid>
            {albums.meta.current_page !== albums.meta.last_page && (
                <Box textAlign="center">
                    <Button loading={isFetching} onClick={handleViewMore}>
                        {t('view_more')}
                    </Button>
                </Box>
            )}
        </Stack>
    );
};

export default AlbumList;
