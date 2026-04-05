import ProjectCard from '@/Components/ProjectCard';
import MediaType from '@/enums/media-type';
import AppLayout from '@/Layouts/AppLayout';
import { PageProps } from '@/types';
import { MediaItem, Project } from '@/types/project';
import BannerSection from '@/views/Home/BannerSection';
import { Head, Link } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type HomePageProps = PageProps<{
    mediaItemsOnBanner: MediaItem[];
    highlightedProjects: Project[];
}>;

const HomePage = ({ highlightedProjects }: HomePageProps) => {
    const { t } = useTranslation();
    const isFromLgScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));

    const [finishIntro, setFinishIntro] = useState(false);

    if (!finishIntro) {
        return (
            <Box
                component="video"
                width="100vw"
                height="100vh"
                autoPlay
                muted
                playsInline
                onEnded={() => setFinishIntro(true)}
            >
                <source src={isFromLgScreen ? '/videos/intro-horizontal.mov' : '/videos/intro-vertical.mp4'} />
            </Box>
        );
    }

    return (
        <AppLayout>
            <Stack position="relative">
                <Head title={t('home')} />
                <BannerSection />
                <Divider sx={{ height: { xs: 24, md: 48 } }} />
                <Stack alignItems="center" px={{ md: 10 }} pt={{ xs: 10, md: 5 }} pb={10} spacing={10} bgcolor="black">
                    <Typography
                        width={1}
                        color="background.default"
                        textTransform="uppercase"
                        fontWeight={900}
                        fontSize={{ xs: 24, md: 60, lg: 64 }}
                        textAlign={{ xs: 'center', md: 'start' }}
                        component={Link}
                        href={route('photography')}
                    >
                        Photography
                    </Typography>
                    <Grid container spacing={2} sx={{ flex: 1 }}>
                        {highlightedProjects
                            .filter((project) => project.category.media_type === MediaType.Image)
                            .map((project) => (
                                <Grid key={project.id} size={{ xs: 12, md: 6, lg: 4 }} sx={{ height: 'fit-content' }}>
                                    <ProjectCard project={project} />
                                </Grid>
                            ))}
                    </Grid>
                    <Box color="background.default">
                        <Button variant="outlined" color="inherit" LinkComponent={Link} href={route('photography')}>
                            View more
                        </Button>
                    </Box>
                </Stack>
                <Divider sx={{ height: { xs: 24, md: 48 } }} />
                <Stack px={{ md: 10 }} pt={{ xs: 10, md: 5 }} pb={10} spacing={10} bgcolor="black">
                    <Typography
                        width={1}
                        color="background.default"
                        textTransform="uppercase"
                        fontWeight={900}
                        fontSize={{ xs: 24, md: 60, lg: 64 }}
                        textAlign={{ xs: 'center', md: 'start' }}
                        component={Link}
                        href={route('cinematography')}
                    >
                        Cinematography
                    </Typography>
                    <Grid container spacing={2} sx={{ flex: 1 }}>
                        {highlightedProjects
                            .filter((project) => project.category.media_type === MediaType.Video)
                            .map((project) => (
                                <Grid key={project.id} size={{ xs: 12, md: 6, lg: 4 }} sx={{ height: 'fit-content' }}>
                                    <ProjectCard project={project} />
                                </Grid>
                            ))}
                    </Grid>
                    <Box textAlign="center" color="background.default">
                        <Button variant="outlined" color="inherit" LinkComponent={Link} href={route('cinematography')}>
                            View more
                        </Button>
                    </Box>
                </Stack>
            </Stack>
        </AppLayout>
    );
};

export default HomePage;
