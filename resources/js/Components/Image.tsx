import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

type Props = {
    src: string;
    alt?: string;
    imageSx?: SxProps<Theme>;
    containerSx?: SxProps<Theme>;
    isVideo?: boolean;
    videoThumbnailUrl?: string;
    onClick?: () => void;
    containerClassName?: string;
};

const Image = ({ src, alt, containerSx, imageSx, isVideo, videoThumbnailUrl, onClick, containerClassName }: Props) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const [openMenu, setOpenMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [showVideoThumbnail, setShowVideoThumbnail] = useState(isVideo);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!imgRef.current?.contains(e.target as Node) && !menuRef.current?.contains(e.target as Node)) {
                setOpenMenu(false);
            } else {
                e.preventDefault();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('contextmenu', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('contextmenu', handleClickOutside);
        };
    }, []);

    const handleOpenContextMenu = (e: ReactMouseEvent<HTMLImageElement>) => {
        e.preventDefault();

        const rect = e.currentTarget.getBoundingClientRect();
        const top = e.clientY - rect.top;
        const left = e.clientX - rect.left;

        setOpenMenu(true);
        setMenuPosition({ top, left });
    };

    const handleCloseContextMenu = () => {
        setOpenMenu(false);
        setMenuPosition({ top: 0, left: 0 });
    };

    const handlePlayVideo = () => {
        setShowVideoThumbnail(false);
    };

    return (
        <Box className={containerClassName} height={1} position="relative" sx={containerSx}>
            {isVideo ? (
                <Box
                    ref={imgRef}
                    height={1}
                    width={1}
                    onContextMenu={handleOpenContextMenu}
                    sx={{
                        ...(showVideoThumbnail && {
                            backgroundImage: `url(${videoThumbnailUrl})`,
                            backgroundSize: 'cover',
                        }),
                    }}
                >
                    <ReactPlayer
                        url={src}
                        stopOnUnmount
                        controls
                        loop
                        width="100%"
                        height="100%"
                        light
                        playIcon={
                            <Fab color="primary" sx={{ zIndex: 0 }}>
                                <PlayArrowIcon fontSize="large" />
                            </Fab>
                        }
                        onClickPreview={handlePlayVideo}
                    />
                </Box>
            ) : (
                <Box
                    component="img"
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    onContextMenu={handleOpenContextMenu}
                    sx={imageSx}
                    onClick={onClick}
                />
            )}

            {openMenu && (
                <ClickAwayListener onClickAway={handleCloseContextMenu}>
                    <Paper
                        ref={menuRef}
                        sx={{
                            position: 'absolute',
                            top: menuPosition.top,
                            left: menuPosition.left,
                            zIndex: 1,
                            px: 4,
                            py: 2,
                        }}
                    >
                        <Typography fontWeight={500} noWrap>
                            © Copyright
                        </Typography>
                    </Paper>
                </ClickAwayListener>
            )}
        </Box>
    );
};

export default Image;
