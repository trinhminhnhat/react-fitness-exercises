import { Stack } from '@mui/material';
import { Hearts } from 'react-loader-spinner';

const Loader = () => (
    <Stack direction="row" justifyContent="center" alignItems="center" width="100%">
        <Hearts color="#FF2625" />
    </Stack>
);

export default Loader;
