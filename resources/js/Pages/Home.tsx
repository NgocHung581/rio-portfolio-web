import FixedSidebarLayout from '@/Layouts/FixedSidebarLayout';
import { PageProps } from '@/types';
import { Album } from '@/types/album';
import { AlbumMediaItem } from '@/types/albumMediaItem';
import AlbumList from '@/views/Album/shared/AlbumList';
import BannerSection from '@/views/Home/BannerSection';
import { Link } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

export type HomePageProps = {
    highlightAlbums: Album[];
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
                <AlbumList albums={highlightAlbums} />
                <Box textAlign="center">
                    <Button LinkComponent={Link} href={route('albums.index')}>
                        {t('view_more')}
                    </Button>
                </Box>
            </Stack>
        </FixedSidebarLayout>
    );
};

export default HomePage;
