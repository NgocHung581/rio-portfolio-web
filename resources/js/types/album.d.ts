import { AlbumMediaItem } from './albumMediaItem';
import { MediaFile } from './mediaFile';

export type Album = {
    id: number;
    title: string;
    name: string;
    description: string;
    summary: string;
    slug: string;
    is_highlight: boolean;
    thumbnail: MediaFile;
    media_items?: AlbumMediaItem[];
    created_at: string;
    updated_at: string;
};
