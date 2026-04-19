import ProjectCard from '@/Components/ProjectCard';
import SocialContacts from '@/Components/SocialContacts';
import AppLayout from '@/Layouts/AppLayout';
import Sidebar from '@/Layouts/components/shared/Sidebar';
import { CursorPaginatedData, PageProps } from '@/types';
import { Category } from '@/types/category';
import { Project } from '@/types/project';
import { Head, router } from '@inertiajs/react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = PageProps<{
    categories: Category[];
    projects: CursorPaginatedData<Project>;
}>;

const Cinematography = ({ categories, projects: paginatedProjects, locale }: Props) => {
    const { t } = useTranslation();
    const isFromMdScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id ?? '');
    const [projects, setProjects] = useState(paginatedProjects.data);
    const [nextCursor, setNextCursor] = useState(paginatedProjects.next_cursor);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && nextCursor && !isLoadingMore) {
                    router.get(
                        route('cinematography'),
                        { category_id: selectedCategory, cursor: nextCursor },
                        {
                            only: ['projects'],
                            preserveScroll: true,
                            preserveState: true,
                            preserveUrl: true,
                            showProgress: false,
                            onStart: () => setIsLoadingMore(true),
                            onFinish: () => setIsLoadingMore(false),
                            onSuccess: (page) => {
                                const newData = page.props['projects'] as CursorPaginatedData<Project>;

                                setProjects((prev) => [...prev, ...newData.data]);
                                setNextCursor(newData.next_cursor);
                            },
                        },
                    );
                }
            },
            { rootMargin: '300px 0px' },
        );

        observer.observe(loadMoreRef.current);

        return () => observer.disconnect();
    }, [nextCursor, isLoadingMore, selectedCategory]);

    const handleChangeCategory = (newSelectedCategory: number) => {
        router.get(
            route('cinematography'),
            { category_id: newSelectedCategory },
            {
                only: ['projects'],
                preserveState: true,
                preserveUrl: true,
                onSuccess: (page) => {
                    const newData = page.props['projects'] as CursorPaginatedData<Project>;

                    setSelectedCategory(newSelectedCategory);
                    setProjects(newData.data);
                    setNextCursor(newData.next_cursor);
                },
            },
        );
    };

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
                <Stack flex={1} spacing={5}>
                    <Tabs
                        textColor="inherit"
                        variant="fullWidth"
                        value={selectedCategory}
                        onChange={(_, value) => handleChangeCategory(value)}
                        slotProps={{
                            indicator: { sx: { backgroundColor: 'text.primary' } },
                            list: { sx: { flexWrap: 'wrap' } },
                        }}
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
                        <Box>
                            <Grid container spacing={2}>
                                {projects.map((project) => (
                                    <Grid key={project.id} size={{ xs: 12, md: 6, xl: 4 }}>
                                        <ProjectCard project={project} />
                                    </Grid>
                                ))}
                                {isLoadingMore && (
                                    <Grid size={12}>
                                        <Box textAlign="center">
                                            <CircularProgress color="inherit" size={24} />
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                            <div ref={loadMoreRef} />
                        </Box>
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
