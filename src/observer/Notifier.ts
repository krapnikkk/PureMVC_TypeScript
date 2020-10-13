module puremvc {
    export class Notifier implements INotifier {
        facade: IFacade;
        constructor() {
            this.facade = Facade.getInstance();
        }

        sendNotification(name: string, body?: any, type?: string): void {
            this.facade.sendNotification(name, body, type);
        }

    }
}