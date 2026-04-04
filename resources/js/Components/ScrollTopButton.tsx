import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useTranslation } from 'react-i18next';

const ScrollToTopButton = () => {
    const { t } = useTranslation();

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <Fade in={trigger} unmountOnExit>
            <Tooltip title={t('scroll_to_top')} placement="left">
                <Box onClick={handleClick} sx={{ position: 'fixed', bottom: 60, right: 10, zIndex: 5 }}>
                    <Fab
                        size="small"
                        sx={{
                            bgcolor: 'rgba(var(--mui-palette-background-defaultChannel) / 0.8)',
                            ':hover': {
                                bgcolor: 'background.default',
                            },
                        }}
                    >
                        <KeyboardArrowUpIcon />
                    </Fab>
                </Box>
            </Tooltip>
        </Fade>
    );
};

export default ScrollToTopButton;
