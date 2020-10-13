interface INotification {
    getName(): string;
    setBody(body: any): void;
    getBody(): any;
    setType(type: string): void;
    getType(): string;
    toString(): string;
}

interface IObserver {
    setNotifyMethod(notifyMethod: any): void;
    setNotifyContext(notifyContext: any): void;
    notifyObserver(notification: INotification): void;
    compareNotifyContext(object: any): boolean
}

interface INotifier {
    sendNotification(name: string, body?: any, type?: string): void
}

interface IProxy extends INotifier {
    getProxyName(): string;
    setData(date: any): void;
    getData(): any;
    onRegister(): void;
    onRemove(): void;
}

interface ICommand extends INotifier {
    execute(notification: INotification): void;
}

interface IMediator extends INotifier {
    getMediatorName(): string;
    getViewComponent(): any;
    setViewComponent(viewComponent: any): void;
    listNotificationInterests(): string[];
    handleNotification(notification: INotification): void;
    onRegister(): void;
    onRemove(): void;
}

interface IFacade extends INotifier {
    registerCommand(notificationName: string, commandClassRef: ICommand): void;
    removeCommand(notificationName: string): void;
    hasCommand(notificationName: string): boolean;
    registerProxy(proxy: IProxy): void;
    retrieveProxy(proxyName: string): IProxy;
    removeProxy(proxyName: string): IProxy|undefined;
    hasProxy(proxyName: string): boolean;
    registerMediator(mediator: IMediator): void;
    retrieveMediator(mediatorName: string): IMediator;
    removeMediator(mediatorName: string): IMediator|null;
    hasMediator(mediatorName: string): boolean;
    notifyObservers(notification: INotification): void;
}

interface IView {
    registerObserver(notificationName: string, observer: IObserver): void;
    removeObserver(notificationName: string, notifyContext: any): void;
    notifyObservers(notification: INotification): void;
    registerMediator(mediator: IMediator): void;
    retrieveMediator(mediatorName: string): IMediator;
    removeMediator(mediatorName: string): IMediator | null;
    hasMediator(mediatorName: string): boolean;
}

interface IController {
    executeCommand(notification: INotification): void;
    registerCommand(notificationName: string, commandClassRef: ICommand): void;
    hasCommand(notificationName: string): boolean;
    removeCommand(notificationName: string): void;
}

interface IModel {
    registerProxy(proxy: IProxy): void;
    removeProxy(proxyName: string): IProxy;
    retrieveProxy(proxyName: string): IProxy;
    hasProxy(proxyName: string): boolean;
}