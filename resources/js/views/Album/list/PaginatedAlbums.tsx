import { PaginatedData } from '@/types';
import { Album } from '@/types/album';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AlbumList from '../shared/AlbumList';

type Props = {
    albums: PaginatedData<Album>;
    fetchMoreAlbumsRouteName: string;
};

const PaginatedAlbums = ({ albums: initAlbums, fetchMoreAlbumsRouteName }: Props) => {
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
            <AlbumList albums={albums.data} />
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

export default PaginatedAlbums;
