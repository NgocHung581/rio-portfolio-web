import ProseWrapper from '@/Components/ProseWrapper';
import { AlbumDetailPageProps } from '@/Pages/Album/Detail';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const AlbumInfoSection = () => {
    const { album } = usePage<PageProps<AlbumDetailPageProps>>().props;

    return (
        <Stack bgcolor="background.paper" py={5}>
            <Container>
                <Typography variant="h1" color="primary" textAlign="center" mb={2}>
                    {album.title}
                </Typography>
                <ProseWrapper>
                    <Box dangerouslySetInnerHTML={{ __html: album.description }} color="primary.main" />
                </ProseWrapper>
            </Container>
        </Stack>
    );
};

export default AlbumInfoSection;
