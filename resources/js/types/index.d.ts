import { ReactNode } from 'react';
import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    localeOptions: Option<string>[];
    aboutPageInfo: AboutPageInfo;
    locale: 'en' | 'vi';
};

export type PropsWithChildren<T = unknown> = T & { children: ReactNode };

export type Options<TValue = number> = {
    label: string;
    value: TValue;
};

type PaginatedDataLinks = {
    first: string;
    last: string;
};

type PaginatedDataMeta = {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
};

export type PaginatedData<TData> = {
    data: TData[];
    links: PaginatedDataLinks;
    meta: PaginatedDataMeta;
};

type PartnerLogoImage = {
    url: string;
    file_path: string;
    file_name: string;
    file_size: number;
};

type AboutPageInfo = {
    introduction: string;
    short_introduction: string;
    partner_logo_images: PartnerLogoImage[];
};
