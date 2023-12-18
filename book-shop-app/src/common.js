export function formatVND(amount) {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace(/,/g, '.');
}