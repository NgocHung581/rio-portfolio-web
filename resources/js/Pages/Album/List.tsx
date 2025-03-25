import FixedSidebarLayout from '@/Layouts/FixedSidebarLayout';
import { PageProps, PaginatedData } from '@/types';
import { Album } from '@/types/album';
import PaginatedAlbums from '@/views/Album/list/PaginatedAlbums';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

export type AlbumListPageProps = {
    albums: PaginatedData<Album>;
};

const AlbumListPage = ({ albums }: PageProps<AlbumListPageProps>) => {
    const { t } = useTranslation();

    return (
        <FixedSidebarLayout title={t('projects')}>
            <Stack spacing={6}>
                <Typography variant="h1" textAlign="center" className="title-border-bottom">
                    {t('projects')}
                </Typography>
                <PaginatedAlbums albums={albums} fetchMoreAlbumsRouteName="api.listAlbums" />
            </Stack>
        </FixedSidebarLayout>
    );
};

export default AlbumListPage;
