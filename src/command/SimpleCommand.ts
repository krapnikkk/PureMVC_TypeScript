module puremvc{
    export class SimpleCommand extends Notifier implements ICommand{
        execute(notification: INotification): void {
            throw new Error("Method not implemented.");
        }
        
    }
}