export const generateUUID = (): string => {
    return (+new Date()).toString(36);
};
