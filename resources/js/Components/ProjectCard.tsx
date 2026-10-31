import { Project } from '@/types/project';
import { usePage } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Image from './Image';
import ProjectViewModal from './ProjectViewModal';

type Props = {
    project: Project;
    mode?: 'light' | 'dark';
};

const ProjectCard = ({ project, mode }: Props) => {
    const { locale } = usePage().props;

    return (
        <Box
            sx={(theme) => ({
                position: 'relative',
                '::before': {
                    content: '""',
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    pointerEvents: 'none',
                    transition: theme.transitions.create('background-color'),
                },
                ':hover::before': { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
            })}
        >
            <ProjectViewModal
                renderTrigger={({ openModal }) => (
                    <Box onClick={openModal} sx={{ cursor: 'pointer' }}>
                        <Image
                            src={project.thumbnail_file_url}
                            containerSx={{ aspectRatio: project.thumbnail_frame }}
                            imageSx={{ aspectRatio: project.thumbnail_frame, width: 1, objectFit: 'cover' }}
                            skeletonSx={{ ...(mode === 'dark' && { backgroundColor: 'rgba(255, 255, 255, 0.13)' }) }}
                        />
                    </Box>
                )}
                locale={locale}
                projectInfo={{ ...project, mediaType: project.category.media_type }}
            />
        </Box>
    );
};

export default ProjectCard;
