module puremvc{
    export class Mediator extends Notifier implements IMediator{
        static NAME:string = 'Mediator';
        protected mediatorName:string ;
        protected viewComponent:any ;
        
        constructor(mediatorName:string = '',viewComponent:any = null){
            super();
            this.mediatorName = mediatorName || Mediator.NAME;
            if(viewComponent){
                this.setViewComponent(viewComponent);
            }
        }

        getMediatorName(): string {
            return this.mediatorName;
        }

        getViewComponent() {
            return this.viewComponent;
        }

        setViewComponent(viewComponent: any): void {
            this.viewComponent = viewComponent;
        }

        listNotificationInterests(): string[] {
            return [];
        }

        handleNotification(notification: INotification): void {
            
        }

        onRemove(): void {
            
        }

        onRegister(): void {
            
        }

    }
}