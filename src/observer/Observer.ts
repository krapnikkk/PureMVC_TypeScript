module puremvc {
    export class Observer implements IObserver {
        notify: Function;
        context: any;
        constructor(notifyMethod: Function, notifyContext: any) {
            this.notify = notifyMethod;
            this.context = notifyContext;
        }

        setNotifyMethod(notifyMethod: any): void {
            this.notify = notifyMethod;
        }

        private getNotifyMethod(): Function {
            return this.notify;
        }

        setNotifyContext(notifyContext: any): void {
            this.context = notifyContext;
        }

        private getNotifyContext(): any {
            return this.context;
        }

        notifyObserver(notification: INotification): void {
            this.getNotifyMethod().call(this.getNotifyContext(), notification)
        }

        compareNotifyContext(object: any): boolean {
            return object === this.context;
        }

    }
}