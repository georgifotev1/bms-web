export type User = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    verified: boolean;
    brandId: number;
    role: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Token = {
    token: string;
};
export type SocialLink = {
    id: number;
    brandId: number;
    platform: string;
    url: string;
    displayName: string;
    createdAt: Date;
    updatedAt: Date;
};

export type WorkingHour = {
    id: number;
    brandId: number;
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type BrandProfile = {
    id: number;
    name: string;
    pageUrl: string;
    description: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    zipCode: string;
    city: string;
    address: string;
    logoUrl: string;
    bannerUrl: string;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
    socialLinks: SocialLink[];
    workingHours: WorkingHour[];
};
