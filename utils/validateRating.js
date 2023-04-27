module.exports = (rating) => {
    if (typeof rating === 'number') {
        return rating >= 1 && rating <= 5;
    } else if (typeof rating === 'string') {
        return /^[1-5]$|^([1-4]\.\d|5\.0)$/.test(rating);
    } else {
        return false; // Invalid type
    }
}
