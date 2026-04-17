import { Project } from '@/types/project';
import { usePage } from '@inertiajs/react';
import Box from '@mui/material/Box';
import GoogleDriveImage from './GoogleDriveImage';
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
                        <GoogleDriveImage
                            fileName={project.thumbnail_file_name}
                            containerSx={{ aspectRatio: '4/5' }}
                            imageSx={{ aspectRatio: '4/5', width: 1 }}
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
