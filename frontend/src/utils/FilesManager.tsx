export function getPreviousFolder(path: string, count?: number) {
    const parts = path.split('/');
    if (count !== undefined) {
        for (let i = 0; i < count; i++) {
            parts.splice(0, 1);
        }
    }
    else {
        parts.pop();
    }

    if (parts.length > 0) {
        return parts.join('/');
    }

    return '';
}