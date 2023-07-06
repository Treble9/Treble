const errorHandler = (error) => {
    let errorObject = {};
    console.log('we got here');
    if (error.message.includes('User validation failed')) {
        const errorValues = Object.values(error.errors);
        errorValues.forEach(element => {
            errorObject[element.path] = element.message;
        });
    }
    if (error.code == '11000') {
        errorObject.email = `User with email "${error.keyValue.email}" already exist!`;
    }

    console.log(errorObject)

    return errorObject;
}

export default errorHandler;