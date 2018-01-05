var Rx = require('rxjs/Rx');

(function showConcatMap() {
    console.log('=> showConcatMap');

    function sumAndMultiply(x, y) {
        let result;
        Rx.Observable.of(sum(x, y))
        .concatMap(result => Rx.Observable.of(multiply(result, y)))
        .subscribe({
            next: x => result = x,
            error: x => console.log('Oh ou: ' + x)
        });
        return result;
    }

    function sum(x, y) {
        return x + y
    }

    function multiply (x, y) {
        return x * y
    }

    console.log("The result of sum and multiply is: " + sumAndMultiply(1, 2));
    console.log("The result of sum and multiply is: " + sumAndMultiply(3, 2));
})();


(function showTimer() {
    console.log('=> showTimer');

    Rx.Observable.timer(1000, 300)
        .take(10)
        .subscribe({
            next: x => console.log(x),
            error: x => console.log("error:" + x)
        });
})();

(function showRace() {
    console.log('=> showRace');

    Rx.Observable.race(
            Rx.Observable.interval(1500),
            Rx.Observable.interval(1000).mapTo('1s won!'),
            Rx.Observable.interval(2000).mapTo('2 won!'),
            Rx.Observable.interval(2500)
        )
        .subscribe({
            next: x => console.log(x),
            error: x => console.log("error:" + x)
        });
})();

(function showStartWith() {
    console.log('=> showStartWith');

    var source = Rx.Observable.range(0, 3);
    var result = source.startWith(-3, -2, -1);
    result.subscribe(
    x => console.log("next startWith:" + x),
    () => console.log("Completed"));
   
})();

(function showThrottle(){
    console.log('=> showThrottle');
    const source = Rx.Observable.interval(500);
    const example = source.throttle(val => Rx.Observable.interval(2000));
    const subscribe = example.subscribe(val => console.log("throttle: " + val));
})();