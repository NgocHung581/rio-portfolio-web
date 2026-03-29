import ProjectCard from '@/Components/ProjectCard';
import SettingsButton from '@/Layouts/components/shared/SettingsButton';
import { PageProps } from '@/types';
import { Category } from '@/types/category';
import { Head, Link } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = PageProps<{
    categories: Category[];
}>;

const Cinematography = ({ categories, locale }: Props) => {
    const { t } = useTranslation();

    const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

    const projects = categories.find((category) => category.id === selectedCategory)?.projects ?? [];

    return (
        <Stack minHeight="100vh" direction="row" gap={20} px={10} py={5} position="relative">
            <Head title={t('cinematography')} />
            <SettingsButton />
            <Box>
                <Stack component="nav" width={240} gap={5} divider={<Divider />} position="sticky" top={20} zIndex={1}>
                    <Stack alignItems="end">
                        <Box component="img" src="/images/logos/light-logo.png" width={64} />
                    </Stack>
                    <Stack alignItems="end" gap={2}>
                        <MuiLink
                            component={Link}
                            href={route('home')}
                            underline="hover"
                            color="inherit"
                            fontWeight={route().current('home') ? 700 : 400}
                        >
                            {t('home')}
                        </MuiLink>
                        <MuiLink
                            component={Link}
                            href={route('photography')}
                            underline="hover"
                            color="inherit"
                            fontWeight={route().current('photography') ? 700 : 400}
                        >
                            {t('photography')}
                        </MuiLink>
                        <MuiLink
                            component={Link}
                            href={route('cinematography')}
                            underline="hover"
                            color="inherit"
                            fontWeight={route().current('cinematography') ? 700 : 400}
                        >
                            {t('cinematography')}
                        </MuiLink>
                        <MuiLink
                            component={Link}
                            href={route('about')}
                            underline="hover"
                            color="inherit"
                            fontWeight={route().current('about') ? 700 : 400}
                        >
                            {t('about')}
                        </MuiLink>
                    </Stack>
                    <Stack alignItems="end" gap={1}>
                        <Stack direction="row" alignItems="center" justifyContent="center" gap={2}>
                            <MuiLink href="" target="_blank">
                                <Box component="img" src="/images/logos/instagram.png" width={20} height={20} />
                            </MuiLink>
                            <MuiLink href="" target="_blank">
                                <Box component="img" src="/images/logos/whatsapp.png" width={20} height={20} />
                            </MuiLink>
                            <MuiLink href="" target="_blank">
                                <Box component="img" src="/images/logos/zalo.png" width={20} height={20} />
                            </MuiLink>
                        </Stack>
                        <Typography variant="body2">example@gmail.com</Typography>
                        <Typography variant="body2">0123456789</Typography>
                    </Stack>
                </Stack>
            </Box>
            <Stack component="main" flex={1} spacing={5}>
                <Tabs
                    textColor="inherit"
                    variant="fullWidth"
                    value={selectedCategory}
                    onChange={(_, value) => setSelectedCategory(value)}
                    slotProps={{ indicator: { sx: { backgroundColor: 'text.primary' } } }}
                >
                    {categories.map((category) => (
                        <Tab
                            key={category.id}
                            value={category.id}
                            label={category[`name_${locale}`]}
                            sx={{ '&.Mui-selected': { fontWeight: 700 } }}
                        />
                    ))}
                </Tabs>
                {!!projects.length && (
                    <Grid container spacing={2}>
                        {projects.map((project) => (
                            <Grid key={project.id} size={4}>
                                <ProjectCard project={project} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Stack>
        </Stack>
    );
};

export default Cinematography;
