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
import { useTranslation } from 'react-i18next';

export type HomePageProps = PageProps<{
    mediaItemsOnBanner: MediaItem[];
    highlightedProjects: Project[];
}>;

const HomePage = ({ highlightedProjects }: HomePageProps) => {
    const { t } = useTranslation();

    return (
        <AppLayout>
            <Stack position="relative">
                <Head title={t('home')} />
                <BannerSection />
                <Divider sx={{ height: 48 }} />
                <Stack alignItems="center" px={10} pt={5} pb={10} spacing={10} minHeight="100vh" bgcolor="black">
                    <Typography
                        width={1}
                        color="background.default"
                        textTransform="uppercase"
                        fontWeight={900}
                        fontSize={64}
                    >
                        Photography
                    </Typography>
                    <Grid container spacing={2} sx={{ flex: 1 }}>
                        {highlightedProjects
                            .filter((project) => project.category.media_type === MediaType.Image)
                            .map((project) => (
                                <Grid key={project.id} size={4}>
                                    <ProjectCard project={project} />
                                </Grid>
                            ))}
                        {highlightedProjects
                            .filter((project) => project.category.media_type === MediaType.Image)
                            .map((project) => (
                                <Grid key={project.id} size={4}>
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
                <Divider sx={{ height: 48 }} />
                <Stack px={10} pt={5} pb={10} spacing={10} minHeight="100vh" bgcolor="black">
                    <Typography
                        width={1}
                        color="background.default"
                        textTransform="uppercase"
                        fontWeight={900}
                        fontSize={64}
                    >
                        Cinematography
                    </Typography>
                    <Grid container spacing={2} sx={{ flex: 1 }}>
                        {highlightedProjects
                            .filter((project) => project.category.media_type === MediaType.Video)
                            .map((project) => (
                                <Grid key={project.id} size={4}>
                                    <ProjectCard project={project} />
                                </Grid>
                            ))}
                        {highlightedProjects
                            .filter((project) => project.category.media_type === MediaType.Video)
                            .map((project) => (
                                <Grid key={project.id} size={4}>
                                    <ProjectCard project={project} />
                                </Grid>
                            ))}
                        {highlightedProjects
                            .filter((project) => project.category.media_type === MediaType.Video)
                            .map((project) => (
                                <Grid key={project.id} size={4}>
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
