export const getInitials = (name: string): string =>
    name
        .split(' ')
        .map(name => name[0])
        .join('');

export const isActiveTab = (itemUrl: string) => {
    if (itemUrl === '/') {
        return location.pathname === '/';
    }
    return location.pathname.startsWith(itemUrl);
};
