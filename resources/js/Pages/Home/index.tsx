import ProjectCard from '@/Components/ProjectCard';
import AppLayout from '@/Layouts/AppLayout';
import BannerSection from '@/Pages/Home/components/BannerSection';
import { PageProps } from '@/types';
import { MediaItem, Project } from '@/types/project';
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
    photographyHighlights: Project[];
    cinematographyHighlights: Project[];
}>;

const HomePage = ({ photographyHighlights, cinematographyHighlights }: HomePageProps) => {
    const { t } = useTranslation();
    const isFromLgScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));

    const [isEnding, setIsEnding] = useState(false);
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
                onEnded={() => {
                    setIsEnding(true);
                    setTimeout(() => setFinishIntro(true), 1500);
                }}
                sx={(theme) => ({
                    opacity: isEnding ? 0 : 1,
                    transition: theme.transitions.create('opacity', { duration: 1500 }),
                })}
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
                <Stack px={{ md: 10 }} pt={{ xs: 10, md: 5 }} pb={10} spacing={10} bgcolor="black">
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
                        {t('photography')}
                    </Typography>
                    <Grid container spacing={2} sx={{ flex: 1 }}>
                        {photographyHighlights.map((project) => (
                            <Grid key={project.id} size={{ xs: 12, md: 6, lg: 4 }} sx={{ height: 'fit-content' }}>
                                <ProjectCard project={project} mode="dark" />
                            </Grid>
                        ))}
                    </Grid>
                    <Box textAlign="center" color="background.default">
                        <Button variant="outlined" color="inherit" LinkComponent={Link} href={route('photography')}>
                            {t('view_more')}
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
                        {t('cinematography')}
                    </Typography>
                    <Grid container spacing={2} sx={{ flex: 1 }}>
                        {cinematographyHighlights.map((project) => (
                            <Grid key={project.id} size={{ xs: 12, md: 6, lg: 4 }} sx={{ height: 'fit-content' }}>
                                <ProjectCard project={project} mode="dark" />
                            </Grid>
                        ))}
                    </Grid>
                    <Box textAlign="center" color="background.default">
                        <Button variant="outlined" color="inherit" LinkComponent={Link} href={route('cinematography')}>
                            {t('view_more')}
                        </Button>
                    </Box>
                </Stack>
            </Stack>
        </AppLayout>
    );
};

export default HomePage;
