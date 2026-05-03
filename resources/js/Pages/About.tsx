import Image from '@/Components/Image';
import ProseWrapper from '@/Components/ProseWrapper';
import AppLayout from '@/Layouts/AppLayout';
import Sidebar from '@/Layouts/components/shared/Sidebar';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';

const AboutPage = ({ websiteContentSetting, locale }: PageProps) => {
    const { t } = useTranslation();

    return (
        <AppLayout>
            <Stack pt={{ xs: 5, md: 0 }} pb={5}>
                <Head title={t('about')} />
                <Container sx={{ px: { xs: 0, md: 10 } }}>
                    <Stack gap={{ xs: 6, md: 12 }}>
                        <Stack direction={{ xs: 'column', md: 'row' }} gap={{ md: 10, lg: 20 }}>
                            <Sidebar />
                            <Stack flex={1}>
                                <Image
                                    src={websiteContentSetting.avatar.file_url}
                                    containerSx={{ aspectRatio: '3/2' }}
                                    imageSx={{ width: 1, height: 1 }}
                                />
                                <Box bgcolor="black" color="background.default" p={10} fontSize={{ xs: 15, md: 16 }}>
                                    <ProseWrapper>
                                        <Box
                                            dangerouslySetInnerHTML={{
                                                __html: websiteContentSetting[`introduction_${locale}`],
                                            }}
                                        />
                                    </ProseWrapper>
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack alignItems="center" spacing={10}>
                            <Typography textTransform="uppercase" fontWeight={900} fontSize={40}>
                                {t('partners')}
                            </Typography>
                            <Marquee autoFill gradient gradientColor="var(--mui-palette-background-default)">
                                {websiteContentSetting.partner_logos.map((partnerLogo) => (
                                    <Image
                                        key={partnerLogo.id}
                                        src={partnerLogo.file_url}
                                        containerSx={{ aspectRatio: 1, width: { xs: 80, md: 100 }, mx: 2 }}
                                        imageSx={{ width: 1, height: 1, objectFit: 'cover' }}
                                    />
                                ))}
                            </Marquee>
                        </Stack>
                    </Stack>
                </Container>
            </Stack>
        </AppLayout>
    );
};

export default AboutPage;
