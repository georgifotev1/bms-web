export const getInitials = (name: string): string =>
    name
        .split(' ')
        .map(name => name[0])
        .join('');

export function getImagePreviewUrl(url: string, file: File) {
    if (file) {
        return URL.createObjectURL(file);
    }
    if (url) {
        return url;
    }

    return '';
}
