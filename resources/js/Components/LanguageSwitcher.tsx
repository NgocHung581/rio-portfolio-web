import { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { Fragment, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();
    const { localeOptions } = usePage<PageProps>().props;

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const currentLocale = i18n.language;

    const handleOpenLocalesMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseLocalesMenu = () => {
        setAnchorEl(null);
    };

    const handleSetLocale = (selectedLocale: string) => () => {
        if (selectedLocale !== currentLocale) {
            router.put(
                route('locale.set'),
                { locale: selectedLocale },
                {
                    onSuccess: () => i18n.changeLanguage(selectedLocale),
                    preserveScroll: true,
                    preserveState: true,
                    preserveUrl: true,
                },
            );
        }

        handleCloseLocalesMenu();
    };

    return (
        <Fragment>
            <Tooltip title={t('language')} placement="left">
                <Box sx={{ position: 'fixed', bottom: 10, right: 10, zIndex: 5 }}>
                    <Fab
                        size="small"
                        sx={{
                            bgcolor: 'rgba(var(--mui-palette-background-defaultChannel) / 0.8)',
                            ':hover': {
                                bgcolor: 'background.default',
                            },
                        }}
                        onClick={handleOpenLocalesMenu}
                    >
                        <LanguageOutlinedIcon />
                    </Fab>
                </Box>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleCloseLocalesMenu}
                disableScrollLock
                transformOrigin={{ horizontal: 170, vertical: 'center' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
                slotProps={{ paper: { sx: { mt: 0 } } }}
            >
                {localeOptions.map((option) => (
                    <MenuItem
                        key={option.value}
                        selected={option.value === currentLocale}
                        onClick={handleSetLocale(option.value)}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </Fragment>
    );
};

export default LanguageSwitcher;
