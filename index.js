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
