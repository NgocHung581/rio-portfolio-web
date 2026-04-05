import { Link } from '@inertiajs/react';
import Box from '@mui/material/Box';

type Props = {
    mode: 'light' | 'dark';
};

const Logo = ({ mode }: Props) => {
    return (
        <Box display="inline-block" height={1} component={Link} href={route('home')}>
            <Box
                component="img"
                src={mode === 'light' ? '/images/logos/light-logo.png' : '/images/logos/dark-logo.png'}
                height={1}
            />
        </Box>
    );
};

export default Logo;
