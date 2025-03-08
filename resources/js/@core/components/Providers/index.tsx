import { PropsWithChildren } from '@/types';
import ThemeProvider from './ThemeProvider';

const Providers = ({ children }: PropsWithChildren) => {
    return <ThemeProvider>{children}</ThemeProvider>;
};

export default Providers;
