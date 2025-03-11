import FixedSidebarLayout from '@/Layouts/FixedSidebarLayout';
import { PaginatedData } from '@/types';
import { Album } from '@/types/album';
import { AlbumMediaItem } from '@/types/albumMediaItem';
import BannerSection from '@/views/Home/BannerSection';
import HighlightAlbumsSection from '@/views/Home/HighlightAlbumsSection';
import { useTranslation } from 'react-i18next';

export type HomePageProps = {
    highlightAlbums: PaginatedData<Album>;
    albumMediaItems: AlbumMediaItem[];
};

const HomePage = () => {
    const { t } = useTranslation();

    return (
        <FixedSidebarLayout header={<BannerSection />} title={t('home')}>
            <HighlightAlbumsSection />
        </FixedSidebarLayout>
    );
};

export default HomePage;
