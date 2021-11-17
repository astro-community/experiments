export const toHyphen = (name: any) => String(name).replace(/(?<=.)[A-Z]/g, '-$&').toLowerCase();
