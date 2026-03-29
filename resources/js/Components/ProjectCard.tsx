import { Project } from '@/types/project';
import { usePage } from '@inertiajs/react';
import Box from '@mui/material/Box';
import ProjectViewModal from './ProjectViewModal';

type Props = {
    project: Project;
};

const ProjectCard = ({ project }: Props) => {
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
                    pointerEvents: 'none',
                    transition: theme.transitions.create('background-color'),
                },
                ':hover::before': { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
            })}
        >
            <ProjectViewModal
                renderTrigger={({ openModal }) => (
                    <Box
                        component="img"
                        src={project.thumbnail_url}
                        sx={{ aspectRatio: project.thumbnail_frame, cursor: 'pointer' }}
                        onClick={openModal}
                    />
                )}
                locale={locale}
                projectInfo={{ ...project, mediaType: project.category.media_type }}
            />
        </Box>
    );
};

export default ProjectCard;
