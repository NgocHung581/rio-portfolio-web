import FixedSidebarLayout from '@/Layouts/FixedSidebarLayout';
import { PageProps, PaginatedData } from '@/types';
import { Album } from '@/types/album';
import { AlbumMediaItem } from '@/types/albumMediaItem';
import AlbumList from '@/views/Album/shared/AlbumList';
import BannerSection from '@/views/Home/BannerSection';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

export type HomePageProps = {
    highlightAlbums: PaginatedData<Album>;
    albumMediaItemsOnBanner: AlbumMediaItem[];
};

const HomePage = ({ highlightAlbums }: PageProps<HomePageProps>) => {
    const { t } = useTranslation();

    return (
        <FixedSidebarLayout header={<BannerSection />} title={t('home')}>
            <Stack component="section" spacing={6}>
                <Typography variant="h2" textAlign="center" className="title-border-bottom">
                    {t('projects')}
                </Typography>
                <AlbumList albums={highlightAlbums} fetchMoreAlbumsRouteName="api.listHighlightAlbums" />
            </Stack>
        </FixedSidebarLayout>
    );
};

export default HomePage;
