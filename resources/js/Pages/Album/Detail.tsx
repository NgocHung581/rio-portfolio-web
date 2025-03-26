import ProseWrapper from '@/Components/ProseWrapper';
import FixedSidebarLayout from '@/Layouts/FixedSidebarLayout';
import { Album } from '@/types/album';
import AlbumMediaItemList from '@/views/Album/detail/AlbumMediaItemList';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export type AlbumDetailPageProps = {
    album: Album;
};

const AlbumDetailPage = ({ album }: AlbumDetailPageProps) => {
    return (
        <FixedSidebarLayout
            title={album.name}
            header={
                <Box py={5}>
                    <Container>
                        <Stack spacing={10}>
                            <Typography variant="h1" color="primary" textAlign="center">
                                {album.title}
                            </Typography>
                            <ProseWrapper>
                                <Box dangerouslySetInnerHTML={{ __html: album.description }} color="primary.main" />
                            </ProseWrapper>
                            <Typography variant="h2" color="primary" textAlign="center">
                                {album.name}
                            </Typography>
                        </Stack>
                    </Container>
                </Box>
            }
            footer={
                <Box py={5}>
                    <Container>
                        <ProseWrapper>
                            <Box dangerouslySetInnerHTML={{ __html: album.summary }} color="primary.main" />
                        </ProseWrapper>
                    </Container>
                </Box>
            }
        >
            {album.media_items?.length ? <AlbumMediaItemList /> : <Typography>No data available.</Typography>}
        </FixedSidebarLayout>
    );
};

export default AlbumDetailPage;
