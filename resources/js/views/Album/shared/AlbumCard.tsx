import Image from '@/Components/Image';
import { Album } from '@/types/album';
import { Link } from '@inertiajs/react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    album: Album;
};

const AlbumCard = ({ album }: Props) => {
    const { t } = useTranslation();

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <Box
            position="relative"
            sx={{ img: { aspectRatio: 4 / 5, width: 1, objectFit: 'cover' } }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Image src={album.thumbnail.url} />
            <Backdrop open={isHovering} mountOnEnter unmountOnExit sx={{ position: 'absolute' }}>
                <Button LinkComponent={Link} href={route('albums.show', album)} startIcon={<VisibilityOutlinedIcon />}>
                    {t('view_project')}
                </Button>
            </Backdrop>
        </Box>
    );
};

export default AlbumCard;
