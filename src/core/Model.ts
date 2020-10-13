module puremvc {
    export class Model implements IModel {
        static SINGLETON_MSG: string = "Model singleton already constructed!";
        static instance: IModel;
        static getInstance(): IModel {
            if (!Model.instance)
                Model.instance = new Model();

            return Model.instance;
        }

        protected proxyMap: { [key: string]: IProxy } = {};
        constructor() {
            if (Model.instance)
                throw Error(Model.SINGLETON_MSG);

            Model.instance = this;
            this.proxyMap = {};
            this.initializeModel();
        }

        initializeModel(): void {

        }

        registerProxy(proxy: IProxy): void {
            this.proxyMap[proxy.getProxyName()] = proxy;
            proxy.onRegister();
        }

        removeProxy(proxyName: string): IProxy {
            let proxy: IProxy = this.proxyMap[proxyName];
            if (proxy) {
                delete this.proxyMap[proxyName];
                proxy.onRemove();
            }
            return proxy;
        }

        retrieveProxy(proxyName: string): IProxy {
            return this.proxyMap[proxyName] || null;
        }

        hasProxy(proxyName: string): boolean {
            return this.proxyMap[proxyName] != null
        }

    }
}