type UUID = string;

export type User = {
    id: number;
    name: string;
    email: string;
    avatar: string;
    verified: boolean;
    brandId: number;
    role: string;
    createdAt: string;
    updatedAt: string;
};

export type Token = {
    token: string;
};

export type UserWithToken = User & Token;

export type SocialLink = {
    id: number;
    brandId: number;
    platform: string;
    url: string;
    displayName: string;
    createdAt: string;
    updatedAt: string;
};

export type WorkingHour = {
    id: number;
    brandId: number;
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
    createdAt: string;
    updatedAt: string;
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
    createdAt: string;
    updatedAt: string;
    socialLinks: SocialLink[];
    workingHours: WorkingHour[];
};

export type Event = {
    id: number;
    customerId: number;
    serviceId: UUID;
    userId: number;
    brandId: number;
    startTime: string;
    endTime: string;
    customerName: string;
    userName: string;
    serviceName: string;
    comment?: string;
    cost?: string;
    bufferTime?: number;
    createdAt: string;
    updatedAt: string;
};

export type Service = {
    id: string;
    title: string;
    description: string;
    duration: number;
    bufferTime: number;
    cost: string;
    isVisible: boolean;
    imageUrl: string;
    brandId: number;
    providers: number[];
    createdAt: string;
    updatedAt: string;
};

export type Customer = {
    id: number;
    name: string;
    email: string;
    brandId: number;
    phoneNumber: string;
    token: string;
    createdAt: string;
    updatedAt: string;
};
