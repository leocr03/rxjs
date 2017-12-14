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
    console.log('=> showDisposableObservableExecution');
    var observable = Rx.Observable.interval(400);
    var subscription = observable.subscribe(x => console.log(`observable ${x}`));
    setTimeout(() => {subscription.unsubscribe()}, 2000);
})();

(function showChildSubscription(){
    console.log('=> showChildSubscription');
    var observable1 = Rx.Observable.interval(400);
    var observable2 = Rx.Observable.interval(300);
    var subscription1 = observable1.subscribe((x) => console.log(`observable1 is: ${x}`));
    var subscription2 = observable2.subscribe((x) => console.log(`observable2 is: ${x}`));
    subscription1.add(subscription2);

    setTimeout(() => {
        subscription1.unsubscribe();
    }, 1000);
})();

(function showSubject(){
    console.log('=> showSubject');
    var subject = new Rx.Subject();
    subject.subscribe({
        next: (x) => console.log(`Do something A with ${x}`)
    });
    subject.subscribe({
        next: (x) => console.log(`Do something B with ${x}`)
    });

    var observable = Rx.Observable.from([3,56,7]);
    observable.subscribe(subject);
})();

(function showMulticastedObservable(){
    console.log('=> showMulticastedObservable');
    var source = Rx.Observable.from([1, 2, 3]);
    var subject = new Rx.Subject();
    var multicasted = source.multicast(subject);

    multicasted.subscribe({
        next: (x) => console.log(`Multicast A with ${x}`)
    });
    multicasted.subscribe({
        next: (x) => console.log(`Multicast B with ${x}`)
    });

    multicasted.connect();
})();

(function showReferenceCounting(){
    console.log('=> showReferenceCounting');

    var source = Rx.Observable.interval(100);
    var subject = new Rx.Subject();
    var multicasted = source.multicast(subject);
    var subscription1, subscription2, subscriptionConnect;

    subscription1 = multicasted.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });

    subscriptionConnect = multicasted.connect();

    setTimeout(() => {
        subscription2 = multicasted.subscribe({
            next: (v) => console.log('observerB:' + v)
        });
    }, 600);

    setTimeout(() => {
        subscription1.unsubscribe();
    }, 1200);

    setTimeout(() => {
        subscription2.unsubscribe();
        subscriptionConnect.unsubscribe();
    }, 2000);
})();

(function showReferenceCountingWithRefCount(){
    console.log('=> showReferenceCountingWithRefCount');

    var source = Rx.Observable.interval(500);
    var subject = new Rx.Subject();
    var refCounted = source.multicast(subject).refCount();
    var subscription1, subscription2, subscriptionConnect;
    
    console.log('observerA subscribed');
    subscription1 = refCounted.subscribe({
      next: (v) => console.log('observerA count: ' + v)
    });
    
    setTimeout(() => {
      console.log('observerB subscribed');
      subscription2 = refCounted.subscribe({
        next: (v) => console.log('observerB count: ' + v)
      });
    }, 600);
    
    setTimeout(() => {
      console.log('observerA unsubscribed');
      subscription1.unsubscribe();
    }, 1200);
    
    setTimeout(() => {
      console.log('observerB unsubscribed');
      subscription2.unsubscribe();
    }, 2000);
})();

(function showConcatExample() {
    console.log('=> showConcatAllExample');
    var timer = Rx.Observable.interval(1000).take(4);
    var sequence = Rx.Observable.range(1, 10);
    var result = timer.concat(sequence);
    result.subscribe(x => console.log(x));

    var timer1 = Rx.Observable.interval(1000).take(10);
    var timer2 = Rx.Observable.interval(2000).take(6);
    var timer3 = Rx.Observable.interval(500).take(10);
    var result = timer1.concat(timer2, timer3);
    result.subscribe(x => console.log(x));

})();
