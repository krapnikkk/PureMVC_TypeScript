module puremvc {
    export class Proxy extends Notifier implements IProxy {
        static NAME: string = 'PROXY';
        protected proxyName: string;
        protected data: any;
        constructor(proxyName: string, data: any) {
            super();
            this.proxyName = proxyName || Proxy.NAME;
            if (data) {
                this.setData(data);
            }
        }

        getProxyName(): string {
            return this.proxyName;
        }

        setData(data: any): void {
            this.data = data;
        }

        getData() {
            return this.data;
        }

        onRegister(): void {
            
        }

        onRemove(): void {

        }

    }
}