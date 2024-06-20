
//Second object is original, First one we are changing and recieve only fields which are changed

function compareObjects<T extends Record<string, any>>(obj1: T, obj2: T): Partial<T> {
    const diff: Partial<T> = {};

    (Object.keys(obj1) as (keyof T)[]).forEach((key) => {
        if (obj1[key] !== obj2[key]) {
            diff[key] = obj1[key];
        }
    });

    return diff;
}

export default compareObjects;