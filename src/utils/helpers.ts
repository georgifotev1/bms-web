export const getInitials = (name: string): string =>
    name
        .split(' ')
        .map((name) => name[0])
        .join('');
