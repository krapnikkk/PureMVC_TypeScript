///<reference path='../observer/Notifier.ts'/>
module puremvc {
    export class MacroCommand extends Notifier implements ICommand {
        protected subCommands: Function[];

        constructor() {
            super();
            this.subCommands = [];
            this.initializeMacroCommand();
        }

        initializeMacroCommand() {

        }

        addSubCommand(commandClassRef: Function): void {
            this.subCommands.push(commandClassRef);
        }

        execute(notification: INotification): void {
            this.subCommands.forEach((Command:any)=>{
                let commandInstance:ICommand = <ICommand>new Command();
                commandInstance.execute(notification);
            })
            this.subCommands = [];
        }
    }
}