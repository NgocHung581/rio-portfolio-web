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
            <Stack py={5}>
                <Head title={t('about')} />
                <Container>
                    <Stack gap={12}>
                        <Stack direction="row" gap={20}>
                            <Sidebar />
                            <Stack>
                                <Box display="flex" alignItems="center" justifyContent="center">
                                    <Box
                                        component="img"
                                        src={websiteContentSetting.avatar.url}
                                        width={1}
                                        sx={{ aspectRatio: '3/2' }}
                                    />
                                </Box>
                                <Box bgcolor="black" color="background.default" p={10}>
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
                        <Stack alignItems="center" gap={10}>
                            <Typography textTransform="uppercase" fontWeight={900} fontSize={40}>
                                Partners
                            </Typography>
                            <Marquee autoFill gradient gradientColor="var(--mui-palette-background-default)">
                                {websiteContentSetting.partner_logos.map((file) => (
                                    <Box
                                        key={file.url}
                                        component="img"
                                        src={file.url}
                                        mx={2}
                                        width={100}
                                        sx={{ aspectRatio: 1, objectFit: 'cover' }}
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
