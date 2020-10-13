module puremvc {
    export class View implements IView {
        static SINGLETON_MSG: string = "View singleton already constructed!";
        static instance: IView;
        static getInstance(): IView {
            if (!View.instance)
                View.instance = new View();

            return View.instance;
        }
        protected observerMap: { [key: string]: IObserver[] } = {};
        protected mediatorMap: { [key: string]: IMediator } = {};
        constructor() {
            if (View.instance) {
                throw Error(View.SINGLETON_MSG);
            }
            View.instance = this;
            this.observerMap = {};
            this.mediatorMap = {};
            this.initializeView();
        }

        initializeView(): void {

        }

        registerObserver(notificationName: string, observer: IObserver): void {
            let observers: IObserver[] = this.observerMap[notificationName];
            if (observer) {
                observers.push(observer);
            } else {
                this.observerMap[notificationName] = observer;
            }

        }

        removeObserver(notificationName: string, notifyContext: any): void {
            let observers: IObserver[] = this.observerMap[notificationName],
                i = observers.length;
            while (i--) {
                let observer: IObserver = observers[i];
                if (observer.compareNotifyContext(notifyContext)) {
                    observers.splice(i, 1);
                    break;
                }
            }

            if (observers.length === 0) {
                delete this.observerMap[notificationName];
            }
        }

        notifyObservers(notification: INotification): void {
            let notificationName: string = notification.getName();
        }

        registerMediator(mediator: IMediator): void {
            let name: string = mediator.getMediatorName();
            if (this.mediatorMap[name]) {
                return;
            }
            this.mediatorMap[name] = mediator;
            let interests: string[] = mediator.listNotificationInterests(), len: number = interests.length;
            if (len > 0) {
                let observer: IObserver = new Observer(mediator.handleNotification, mediator);
                for (let i = 0; i < len; i++) {
                    this.registerObserver(interests[i], observer);
                }
            }
            mediator.onRegister();

        }

        retrieveMediator(mediatorName: string): IMediator {
            return this.mediatorMap[mediatorName] || null;
        }

        removeMediator(mediatorName: string): IMediator | null {
            let mediator: IMediator = this.mediatorMap[mediatorName];
            if (!mediator) {
                return null;
            }
            let interests: string[] = mediator.listNotificationInterests(), i: number = interests.length;
            while (i--) {
                this.removeObserver(interests[i], mediator);
            }
            delete this.mediatorMap[mediatorName];
            mediator.onRemove();
            return mediator;
        }

        hasMediator(mediatorName: string): boolean {
            return this.mediatorMap[mediatorName] != null;
        }

    }
}