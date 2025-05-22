import { BrandProfile } from '@/types/api';
import * as React from 'react';

export const BrandContext = React.createContext<BrandProfile>({
    id: 0,
    name: '',
    pageUrl: '',
    description: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    zipCode: '',
    city: '',
    address: '',
    logoUrl: '',
    bannerUrl: '',
    currency: '',
    createdAt: new Date(0),
    updatedAt: new Date(0),
    socialLinks: [],
    workingHours: [],
});

export const useBrandContext = () => {
    const context = React.useContext(BrandContext);
    if (context === undefined) {
        throw new Error('useBrandContext must be used within a BrandProvider');
    }
    return context;
};
