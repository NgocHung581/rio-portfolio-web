import { SOCIAL_CONTACTS } from '@/constants/social-contacts';
import { usePage } from '@inertiajs/react';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type Props = {
    align: 'center' | 'end';
};

const SocialContacts = ({ align }: Props) => {
    const { websiteContentSetting } = usePage().props;

    return (
        <Stack alignItems={align} gap={2}>
            <Stack direction="row" gap={2}>
                {SOCIAL_CONTACTS.map((item, index) => (
                    <MuiLink key={index} href={item.href} target="_blank">
                        <Box component="img" src={item.logo} width={20} height={20} />
                    </MuiLink>
                ))}
            </Stack>
            <Stack alignItems={align} gap={1}>
                <Typography fontSize={12} component="a" href={`mailto:${websiteContentSetting.email}`}>
                    {websiteContentSetting.email}
                </Typography>
                <Typography fontSize={12} component="a" href={`tel:${websiteContentSetting.phone_number}`}>
                    {websiteContentSetting.phone_number}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default SocialContacts;
