import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react';

type Props = {
    src: string;
    alt?: string;
};

const Image = ({ src, alt }: Props) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const [openMenu, setOpenMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!imgRef.current?.contains(e.target as Node) && !menuRef.current?.contains(e.target as Node)) {
                setOpenMenu(false);
            }

            if (menuRef.current?.contains(e.target as Node)) {
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

    return (
        <Box height={1} position="relative">
            <Box component="img" ref={imgRef} src={src} alt={alt} onContextMenu={handleOpenContextMenu} />
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
