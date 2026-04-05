import ProjectCard from '@/Components/ProjectCard';
import SocialContacts from '@/Components/SocialContacts';
import AppLayout from '@/Layouts/AppLayout';
import Sidebar from '@/Layouts/components/shared/Sidebar';
import { PageProps } from '@/types';
import { Category } from '@/types/category';
import { Head } from '@inertiajs/react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = PageProps<{
    categories: Category[];
}>;

const Cinematography = ({ categories, locale }: Props) => {
    const { t } = useTranslation();
    const isFromMdScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

    const projects = categories.find((category) => category.id === selectedCategory)?.projects ?? [];

    return (
        <AppLayout>
            <Stack
                minHeight="100vh"
                direction={{ xs: 'column', md: 'row' }}
                gap={{ md: 10, lg: 20 }}
                px={{ md: 10 }}
                py={5}
            >
                <Head title={t('cinematography')} />
                <Sidebar />
                <Stack spacing={5}>
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
                                <Grid key={project.id} size={{ xs: 12, md: 6, xl: 4 }}>
                                    <ProjectCard project={project} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Stack>
                {!isFromMdScreen && (
                    <Fragment>
                        <Divider sx={{ width: 0.5, mx: 'auto', my: 6 }} />
                        <SocialContacts align="center" />
                    </Fragment>
                )}
            </Stack>
        </AppLayout>
    );
};

export default Cinematography;
