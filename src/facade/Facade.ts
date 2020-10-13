module puremvc {
    export class Facade implements IFacade {
        static SINGLETON_MSG: string = "Facade singleton already constructed!";
        static instance: IFacade;
        static getInstance(): IFacade {
            if (!Facade.instance)
                Facade.instance = new Facade();

            return Facade.instance;
        }

        model!: IModel;
        view!: IView;
        controller!: IController;
        constructor() {
            if (Facade.instance) {
                throw Error(Facade.SINGLETON_MSG);
            }
            Facade.instance = this;
            this.initializeFacade();
        }

        initializeFacade() {
            this.initializeModel();
            this.initializeController();
            this.initializeView();
        }

        initializeModel() {
            if (!this.model) {
                this.model = Model.getInstance();
            }
        }

        initializeController() {
            if (!this.controller) {
                this.controller = Controller.getInstance();
            }
        }

        initializeView() {
            if (!this.view) {
                this.view = View.getInstance();
            }
        }

        registerCommand(notificationName: string, commandClassRef: ICommand): void {
            this.controller.registerCommand(notificationName, commandClassRef);
        }

        removeCommand(notificationName: string): void {
            this.controller.removeCommand(notificationName);
        }

        hasCommand(notificationName: string): boolean {
            return this.controller.hasCommand(notificationName);
        }

        registerProxy(proxy: IProxy): void {
            this.model.registerProxy(proxy);
        }

        retrieveProxy(proxyName: string): IProxy {
            return this.model.retrieveProxy(proxyName);
        }

        removeProxy(proxyName: string): IProxy | undefined {
            if (this.model) {
                return this.model.removeProxy(proxyName);
            }
        }

        hasProxy(proxyName: string): boolean {
            return this.model.hasProxy(proxyName);
        }

        registerMediator(mediator: IMediator): void {
            if (this.view) {
                this.view.registerMediator(mediator);
            }
        }

        retrieveMediator(mediatorName: string): IMediator {
            return this.view.retrieveMediator(mediatorName);
        }

        removeMediator(mediatorName: string): IMediator | null {
            return this.view.removeMediator(mediatorName);
        }

        hasMediator(mediatorName: string): boolean {
            return this.view.hasMediator(mediatorName);
        }

        notifyObservers(notification: INotification): void {
            if (this.view) {
                this.view.notifyObservers(notification);
            }
        }

        sendNotification(name: string, body?: any, type?: string): void {
            this.notifyObservers(new Notification(name, body, type));
        }

    }
}

// export default puremvc