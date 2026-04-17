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
    websiteContentSetting: WebsiteContentSetting;
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

type UploadedFile = {
    url: string;
};

type WebsiteContentSetting = {
    phone_number: string;
    email: string;
    introduction_en: string;
    introduction_vi: string;
    avatar: UploadedFile;
    partner_logos: UploadedFile[];
    banner_text_en: string;
    banner_text_vi: string;
};

export type CursorPaginatedData<TData> = {
    data: TData[];
    next_cursor: string | null;
};
