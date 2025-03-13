import Image from '@/Components/Image';
import ProseWrapper from '@/Components/ProseWrapper';
import FixedSidebarLayout from '@/Layouts/FixedSidebarLayout';
import { PaginatedData } from '@/types';
import { Album } from '@/types/album';
import { AlbumMediaItem } from '@/types/albumMediaItem';
import AlbumInfoSection from '@/views/Album/detail/AlbumInfoSection';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

export type AlbumDetailPageProps = {
    album: Album;
    albumMediaItems: PaginatedData<AlbumMediaItem>;
};

const AlbumDetailPage = ({ album, albumMediaItems }: AlbumDetailPageProps) => {
    const { t } = useTranslation();

    return (
        <FixedSidebarLayout
            title={album.name}
            header={<AlbumInfoSection />}
            footer={
                <Box bgcolor="background.paper" py={5}>
                    <Container>
                        <ProseWrapper>
                            <Box dangerouslySetInnerHTML={{ __html: album.summary }} color="primary.main" />
                        </ProseWrapper>
                    </Container>
                </Box>
            }
        >
            <Stack spacing={6}>
                <Typography variant="h2" textAlign="center" className="title-border-bottom">
                    {t('project')}: {album.name}
                </Typography>
                <Grid container spacing={2}>
                    {albumMediaItems.data.map((albumMediaItem) => (
                        <Grid key={albumMediaItem.id} size={albumMediaItem.column_span}>
                            <Image
                                src={albumMediaItem.url}
                                alt={album.name}
                                imageSx={{ width: 1, height: 1, objectFit: 'cover' }}
                                isVideo={!!albumMediaItem.video_thumbnail_url}
                                videoThumbnailUrl={albumMediaItem.video_thumbnail_url}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </FixedSidebarLayout>
    );
};

export default AlbumDetailPage;
