module puremvc {
    export class Controller implements IController {
        static instance: IController;
        static SINGLETON_MSG: string = "Controller singleton already constructed!";
        static getInstance(): IController {
            if (!Controller.instance)
                Controller.instance = new Controller();

            return Controller.instance;
        }

        protected view!: IView;
        protected commandMap: { [key: string]: ICommand };

        constructor() {
            if (Controller.instance) {
                throw Error(Controller.SINGLETON_MSG);
            }
            Controller.instance = this;
            this.commandMap = {};
            this.initializeController();
        }

        initializeController(): void {
            this.view = View.getInstance();
        }

        executeCommand(notification: INotification): void {
            let commandClassRef: any = this.commandMap[notification.getName()];
            if (commandClassRef) {
                let command: ICommand = <ICommand>new commandClassRef();
                command.execute(notification);
            }
        }

        registerCommand(notificationName: string, commandClassRef: ICommand): void {
            if (!this.commandMap[notificationName]) {
                this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
            }
            this.commandMap[notificationName] = commandClassRef;
        }

        hasCommand(notificationName: string): boolean {
            return this.commandMap[notificationName] != null;
        }

        removeCommand(notificationName: string): void {
            if (this.hasCommand(notificationName)) {
                this.view.removeObserver(notificationName, this);
                delete this.commandMap[notificationName];
            }
        }

    }
}