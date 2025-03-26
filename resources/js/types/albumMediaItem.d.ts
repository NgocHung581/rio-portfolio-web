import { Album } from './album';

export type AlbumMediaItem = {
    id: number;
    album?: Album;
    album_id?: number;
    type: number;
    url: string;
    column_span: number;
    video_thumbnail_url?: string;
};
