
function padNumber(num: number | string, width: number, pad?: string): string {
    pad = pad || '0';
    num = num + '';
    return num.length >= width ? num.substr(num.length - width, width) : new Array(width - num.length + 1).join(pad) + num;
}

function getDatePart(): string {
    const date = new Date();
    return padNumber(date.getDate(), 2) + padNumber(date.getMonth() + 1, 2) + padNumber(date.getFullYear(), 2);
}


function generateOrderId(): string {
    const date = new Date();
    const miliseconds = date.getTime() - date.setHours(0, 0, 0, 0);
    return padNumber(date.getDate(), 2) + padNumber(date.getMonth() + 1, 2) + padNumber(date.getFullYear(), 2) + '-' + miliseconds.toString().slice(0, -2);
}


export { padNumber, getDatePart, generateOrderId };