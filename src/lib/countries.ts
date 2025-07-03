import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './react-query';

type RestCountry = {
    name: {
        common: string;
        official: string;
        nativeName?: {
            [languageCode: string]: {
                official: string;
                common: string;
            };
        };
    };
    cca2: string;
    idd: {
        root: string;
        suffixes?: string[];
    };
};

export const getCountries = async (): Promise<RestCountry[]> => {
    try {
        const response = await fetch(
            'https://restcountries.com/v3.1/all?fields=name,cca2,idd'
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: RestCountry[] = await response.json();

        return data
            .filter(country => country.idd?.root)
            .sort((a, b) => a.name.common.localeCompare(b.name.common));
    } catch (error) {
        console.error('Failed to fetch countries:', error);
        return [];
    }
};

export const useCountries = () => {
    return useQuery({
        queryKey: [queryKeys.countries],
        queryFn: getCountries,
    });
};
