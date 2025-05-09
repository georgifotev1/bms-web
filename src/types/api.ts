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
