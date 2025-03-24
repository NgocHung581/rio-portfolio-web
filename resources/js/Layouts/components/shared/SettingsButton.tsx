import { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Stack from '@mui/material/Stack';
import { PaletteMode, useColorScheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { changeLanguage } from 'i18next';
import { Fragment, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SettingsButton = () => {
    const { t, i18n } = useTranslation();
    const { localeOptions } = usePage<PageProps>().props;
    const { mode, setMode } = useColorScheme();

    const localeContainerRef = useRef<HTMLButtonElement>(null);
    const themeContainerRef = useRef<HTMLButtonElement>(null);

    const [openSettingsMenu, setOpenSettingsMenu] = useState(false);
    const [openLocalesMenu, setOpenLocalesMenu] = useState(false);
    const [openThemeModesMenu, setOpenThemeModesMenu] = useState(false);

    const currentLocale = i18n.language;

    const handleOpenSettingsMenu: SpeedDialProps['onOpen'] = (_, reason) => {
        if (reason === 'toggle') {
            setOpenSettingsMenu(true);
        }
    };

    const handleCloseSettingsMenu: SpeedDialProps['onClose'] = (_, reason) => {
        if (reason === 'blur' || reason === 'toggle') {
            setOpenSettingsMenu(false);
        }
    };

    const handleOpenLocalesMenu = () => {
        setOpenLocalesMenu(true);
    };

    const handleCloseLocalesMenu = () => {
        setOpenLocalesMenu(false);
    };

    const handleOpenThemeModesMenu = () => {
        setOpenThemeModesMenu(true);
    };

    const handleCloseThemeModesMenu = () => {
        setOpenThemeModesMenu(false);
    };

    const handleSetLocale = (selectedLocale: string) => () => {
        if (selectedLocale !== currentLocale) {
            router.put(
                route('locale.set'),
                { locale: selectedLocale },
                { onSuccess: () => changeLanguage(selectedLocale), preserveScroll: true },
            );
        }

        handleCloseLocalesMenu();
    };

    const handleChangeMode = (selectedMode: PaletteMode) => () => {
        if (mode !== selectedMode) {
            setMode(selectedMode);
        }

        handleCloseThemeModesMenu();
    };

    return (
        <Fragment>
            <SpeedDial
                open={openSettingsMenu}
                onOpen={handleOpenSettingsMenu}
                onClose={handleCloseSettingsMenu}
                ariaLabel={t('setting')}
                sx={{ position: 'fixed', bottom: 80, right: 18 }}
                icon={<SpeedDialIcon icon={<SettingsOutlinedIcon />} />}
                FabProps={{ size: 'small', color: 'secondary' }}
            >
                <SpeedDialAction
                    ref={localeContainerRef}
                    icon={<LanguageOutlinedIcon />}
                    slotProps={{
                        fab: { sx: { backgroundImage: 'var(--mui-overlays-8)' } },
                        tooltip: { title: t('language') },
                    }}
                    onClick={handleOpenLocalesMenu}
                />
                <SpeedDialAction
                    ref={themeContainerRef}
                    icon={mode === 'light' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
                    slotProps={{
                        fab: { sx: { backgroundImage: 'var(--mui-overlays-8)' } },
                        tooltip: { title: t('mode') },
                    }}
                    onClick={handleOpenThemeModesMenu}
                />
            </SpeedDial>
            <Menu
                anchorEl={localeContainerRef.current}
                open={openLocalesMenu}
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
            <Menu
                anchorEl={themeContainerRef.current}
                open={openThemeModesMenu}
                onClose={handleCloseThemeModesMenu}
                disableScrollLock
                transformOrigin={{ horizontal: 170, vertical: 'center' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
                slotProps={{ paper: { sx: { mt: 0 } } }}
            >
                <MenuItem selected={mode === 'light'} onClick={handleChangeMode('light')}>
                    <Stack direction="row" alignItems="center" gap={3}>
                        <LightModeOutlinedIcon />
                        <Typography color="inherit">{t('light')}</Typography>
                    </Stack>
                </MenuItem>
                <MenuItem selected={mode === 'dark'} onClick={handleChangeMode('dark')}>
                    <Stack direction="row" alignItems="center" gap={3}>
                        <DarkModeOutlinedIcon />
                        <Typography color="inherit">{t('dark')}</Typography>
                    </Stack>
                </MenuItem>
            </Menu>
        </Fragment>
    );
};

export default SettingsButton;
