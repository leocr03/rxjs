var Rx = require('rxjs/Rx');

const asyncFunc = async num => {
    return await getDouble(num);
};

const getDouble = (num) => {
    if(num > 5) {
        return Promise.reject(`The number is bigger then 5.`)
    }

    return Promise.resolve(num + num);
}

Rx.Observable.from([1,2,3,4,5,6])
    .map(asyncFunc)
    .concatMap(p => p)
    .subscribe({
        next: console.log,
        error: console.error
    });