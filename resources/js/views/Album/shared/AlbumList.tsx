import { Album } from '@/types/album';
import Grid from '@mui/material/Grid2';
import AlbumCard from './AlbumCard';

type Props = {
    albums: Album[];
};

const AlbumList = ({ albums }: Props) => {
    return (
        <Grid container spacing={5.5}>
            {albums.map((album) => (
                <Grid key={album.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <AlbumCard album={album} />
                </Grid>
            ))}
        </Grid>
    );
};

export default AlbumList;
