import ProjectCard from '@/Components/ProjectCard';
import AppLayout from '@/Layouts/AppLayout';
import Sidebar from '@/Layouts/components/shared/Sidebar';
import { PageProps } from '@/types';
import { Category } from '@/types/category';
import { Head } from '@inertiajs/react';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = PageProps<{
    categories: Category[];
}>;

const Photography = ({ categories, locale }: Props) => {
    const { t } = useTranslation();

    const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

    const projects = categories.find((category) => category.id === selectedCategory)?.projects ?? [];

    return (
        <AppLayout>
            <Stack direction="row" gap={20} px={10} py={5}>
                <Head title={t('photography')} />
                <Sidebar />
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
        </AppLayout>
    );
};

export default Photography;
