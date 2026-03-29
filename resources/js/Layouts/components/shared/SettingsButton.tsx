import { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { changeLanguage } from 'i18next';
import { Fragment, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SettingsButton = () => {
    const { t, i18n } = useTranslation();
    const { localeOptions } = usePage<PageProps>().props;

    const localeContainerRef = useRef<HTMLButtonElement>(null);

    const [openSettingsMenu, setOpenSettingsMenu] = useState(false);
    const [openLocalesMenu, setOpenLocalesMenu] = useState(false);

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

    return (
        <Fragment>
            <SpeedDial
                open={openSettingsMenu}
                onOpen={handleOpenSettingsMenu}
                onClose={handleCloseSettingsMenu}
                ariaLabel={t('setting')}
                sx={{ position: 'fixed', bottom: 8, right: 8 }}
                icon={<SpeedDialIcon icon={<SettingsOutlinedIcon />} />}
                FabProps={{ size: 'small', color: 'primary' }}
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
        </Fragment>
    );
};

export default SettingsButton;
