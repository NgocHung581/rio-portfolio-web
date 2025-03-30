import ProseWrapper from '@/Components/ProseWrapper';
import FixedSidebarLayout from '@/Layouts/FixedSidebarLayout';
import { PageProps } from '@/types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';

const AboutPage = ({ aboutPageInfo }: PageProps) => {
    const { t } = useTranslation();

    return (
        <FixedSidebarLayout
            title={t('about')}
            withContainer
            sidebarProps={{ hideShortIntroduction: true, layout: 'simple' }}
            footer={
                <Container sx={{ py: 10 }}>
                    <Stack alignItems="center" gap={6}>
                        <Typography variant="h2">{t('my_partners')}</Typography>
                        <Marquee autoFill gradient gradientColor="var(--mui-palette-background-default)">
                            {aboutPageInfo.partner_logo_images.map((image) => (
                                <Box
                                    key={image.url}
                                    component="img"
                                    src={image.url}
                                    mx={2}
                                    width={100}
                                    sx={{ aspectRatio: 1, objectFit: 'cover' }}
                                />
                            ))}
                        </Marquee>
                    </Stack>
                </Container>
            }
        >
            <Box component="img" src="/images/avatars/fake_me_2.jpg" width={1} />
            <Box bgcolor="action.hover" p={10}>
                <ProseWrapper>
                    <Box dangerouslySetInnerHTML={{ __html: aboutPageInfo.introduction }} />
                </ProseWrapper>
            </Box>
        </FixedSidebarLayout>
    );
};

export default AboutPage;
