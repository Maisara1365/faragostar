export function formatCurrency(value: number) {
    return new Intl.NumberFormat().format(value);
}

export function truncate(text: string, length = 120) {

    if (text.length <= length) {
        return text;
    }

    return text.substring(0, length) + "...";
}