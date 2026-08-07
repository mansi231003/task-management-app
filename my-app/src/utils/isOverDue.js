export const isOverdue = (date) => {
    if (!date) return false;
    return new Date(date) < new Date();
};