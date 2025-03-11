import FixedSidebarLayout from '@/Layouts/FixedSidebarLayout';
import { PageProps, PaginatedData } from '@/types';
import { Album } from '@/types/album';
import AlbumList from '@/views/Album/shared/AlbumList';
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
                <Typography
                    variant="h1"
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
                <AlbumList albums={albums} fetchMoreAlbumsRouteName="api.listAlbums" />
            </Stack>
        </FixedSidebarLayout>
    );
};

export default AlbumListPage;
