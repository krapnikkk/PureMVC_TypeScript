module puremvc{
    export class Notification implements INotification{
        protected name:string;
        protected body:any;
        protected type:string;

        constructor(name:string,body:any,type:string = ""){
            this.name = name;
            this.body = body;
            this.type = type;
        }

        getName(): string {
            return this.name
        }

        setBody(body: any): void {
            this.body = body;
        }

        getBody():any {
            return this.body;
        }

        setType(type: string): void {
            this.type = type;
        }

        getType(): string {
            return this.type;
        }

        toString(): string {
            return `Notification Name:${this.getName}\n
                    Body:${this.getBody()==null?'null':this.body.toString}\n
                    Type:${this.getType()==null?'null':this.getType()}`;
        }
        
    }
}