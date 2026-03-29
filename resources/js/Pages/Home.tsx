import ProjectCard from '@/Components/ProjectCard';
import ScrollToTopButton from '@/Components/ScrollTopButton';
import MediaType from '@/enums/media-type';
import SettingsButton from '@/Layouts/components/shared/SettingsButton';
import { PageProps } from '@/types';
import { MediaItem, Project } from '@/types/project';
import BannerSection from '@/views/Home/BannerSection';
import { Head, Link } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export type HomePageProps = PageProps<{
    mediaItemsOnBanner: MediaItem[];
    highlightedProjects: Project[];
}>;

const HomePage = ({ highlightedProjects }: HomePageProps) => {
    const { t } = useTranslation();

    return (
        <Stack position="relative">
            <Head title={t('home')} />
            <BannerSection />
            <ScrollToTopButton />
            <SettingsButton />
            {/* <Paper square sx={{ position: 'sticky', top: 0, zIndex: 2, bgcolor: 'black', fontWeight: '' }}>
                <Stack direction="row" alignItems="center" gap={8} px={10} height={48}>
                    <MuiLink
                        component={Link}
                        href={route('home')}
                        underline="hover"
                        color="background.default"
                        fontWeight={route().current('home') ? 700 : 400}
                    >
                        {t('home')}
                    </MuiLink>
                    <MuiLink
                        component={Link}
                        href={route('photography')}
                        underline="hover"
                        color="background.default"
                        fontWeight={route().current('photography') ? 700 : 400}
                    >
                        {t('photography')}
                    </MuiLink>
                    <MuiLink
                        component={Link}
                        href={route('cinematography')}
                        underline="hover"
                        color="background.default"
                        fontWeight={route().current('cinematography') ? 700 : 400}
                    >
                        {t('cinematography')}
                    </MuiLink>
                    <MuiLink
                        component={Link}
                        href={route('about')}
                        underline="hover"
                        color="background.default"
                        fontWeight={route().current('about') ? 700 : 400}
                    >
                        {t('about')}
                    </MuiLink>
                </Stack>
            </Paper> */}
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
    );
};

export default HomePage;
