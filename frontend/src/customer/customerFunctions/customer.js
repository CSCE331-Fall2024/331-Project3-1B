// functions to get the number of entrees and sides based on the type of meal
export const getEntrees = (type) => {
    if (type == "Bowl") {
        return 1;
    } else if (type == "Plate") {
        return 2;
    } else if (type == "Bigger Plate") {
        return 3;
    } else if (type == "5 Person Meal") {
        return 3;
    } else return 0;
};

export const getSides = (type) => {
    if (type == "Bowl" || type == "Plate" || type == "Bigger Plate") {
        return 1;
    } else if (type == "5 Person Meal") {
        return 2;
    } else return 0;
};
