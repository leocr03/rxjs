var Rx = require('rxjs/Rx');

(function showSimpleObservableSubscribe() {
    console.log('=> showSimpleObservableSubscribeExample');

    var observable = Rx.Observable.create(function(observer) {
        observer.next('Hello!');
        observer.next('How are you?');
        observer.next('Are you ok?');

        setTimeout(function() {
            observer.next('Maybe!');
        }, 500);

        setTimeout(function() {
            observer.next('Yes, I\'m fine!');
            observer.complete();
        }, 1000);
    });

    observable.subscribe({
        next: x => console.log(x),
        complete: () => console.log("Completed!"),
        error: x => console.log('Oh ou')
    });
})();

(function showSubscribeCalledTwice() {
    console.log('=> showSubscribeCalledTwice');

    var observable = Rx.Observable.create(function(observer) {
        console.log('A simple observable call.');
    });

    observable.subscribe(function(x) {});
    observable.subscribe(function(x) {});
    observable.subscribe(function(x) {});
    observable.subscribe(function(x) {});
    observable.subscribe(function(x) {});
    observable.subscribe(function(x) {});
    observable.subscribe(function(x) {});
    observable.subscribe(function(x) {});
    observable.subscribe(function(x) {});
    observable.subscribe(function(x) {});
    observable.subscribe(function(x) {});
    observable.subscribe(function(x) {});
    observable.subscribe(function(x) {});
    observable.subscribe(function(x) {});
    observable.subscribe(function(x) {});
    observable.subscribe(function(x) {});
    observable.subscribe(function(x) {});

    console.log('after!');
    console.log('<= subscribeCalledTwice - end');
})();

(function showDisposableObservableExecution() {
    var observable = Rx.Observable.interval(400);
    var subscription = observable.subscribe(x => console.log(`observable ${x}`));
    setTimeout(() => {subscription.unsubscribe()}, 2000);
})();

(function showChildSubscription(){
    var observable1 = Rx.Observable.interval(400);
    var observable2 = Rx.Observable.interval(300);
    var subscription1 = observable1.subscribe((x) => console.log(`observable1 is: ${x}`));
    var subscription2 = observable2.subscribe((x) => console.log(`observable2 is: ${x}`));
    subscription1.add(subscription2);

    setTimeout(() => {
        subscription1.unsubscribe();
    }, 1000);
})();