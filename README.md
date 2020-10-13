## PureMVC模式中的观察者模式
    注册-通知-撤销注册

## 观察者模式-事件消息类
观察者模式中的事件消息类，规定透传事件消息中的结构体，类似AppEvent,用作统一数据结构
```
Notifiaction
    name
    body
    type
```

## 观察者模式-事件观察者
观察者模式中的事件观察者，设置监听指定事件通知消息类型后便执行指定方法
```
Observer
    setNotifyMethod(notifyMethod:any):void;//设置观察者收到通知时的执行方法
    setNotifyContext(notifyContext:any):void;//设置观察者收到通知时执行上下文
    notifyObserver(notification:INotification):void;//指定监听的事件通知信息类型
    compareNotifyContext(object:any):boolean
```

## 观察者模式-事件通知者
观察者模式中的事件通知者，调度中介器发送事件，监听事件，销毁事件的事件发送者，类似EventEmitter,用作管理广播事件，一般被做基类继承
```
sendNotification(name,body,type);//发送事件消息
```

## Command指令
继承事件通知者的消息指令,实现事件通知者接口
```
simpleCommand
execute()//子类继承时重写执行命令方法

macroCommand
initializeMacroCommand()//子类继承时重写启动命令类
addSubCommand()//添加执行命令
execute()//遍历执行命令

```

## 中介者 Mediator
中介者负责调度管理视图组件，Command指令和Proxy数据的桥梁，由Facade管理，继承事件通知者
```
    getMediatorName(): string;
    getViewComponent(): any;
    setViewComponent(viewComponent: any): void;
    listNotificationInterests(): string[];//显示关心的事件消息
    handleNotification(notification: INotification): void;//处理关心的事件消息
    onRegister():void;//类初始化操作
    onRemove(): void;//从Facade中销毁自身
```

## 数据代理 Proxy
管理数据模型，继承事件通知者
```
    getProxyName(): string;
    setData(date: any): void;//存储数据
    getData(): any;//获取数据
    onRegister(): void;//类初始化操作
    onRemove(): void;//从Facade中销毁自身
```

## 视图 View
保存mediator中介者的所有引用
```
    registerObserver(notificationName:string,observer:IObserver):void;//注册观察者对象
    removeObserver(notificationName:string,notifyContext:any):void;//移除观察者对象
    notifyObservers(notification:INotification):void;//通知观察者对象
    registermediator(mediator:IMediator):void;//注册中介者
    retrieveMediator(mediatorName:string):IMediator;//检索中介者
    removeMediator(mediatorName:string):IMediator|null;//移除中介者
    hasMediator(mediatorName:string):boolean;
```

## 控制器 Controller
保存所有的Command指令，且绑定一个View单例，注册Command命令时，让View去注册对应的Observer
```
    executeCommand(notification:INotification):void;//执行command指令
    registerCommand(notificationName:string,commandClassRef:ICommand):void;//注册command指令
    hasCommand(notificationName:string):boolean;
    removeCommand(notificationName:string):void;
```

## 数据模型 Model
保存所有Proxy代理数据的所有引用
```
    registerProxy(proxy: IProxy): void;//注册Proxy
    removeProxy(proxyName: string): IProxy;//移除Proxy
    retrieveProxy(proxyName: string): IProxy;//检索Proxy
    hasProxy(proxyName: string): boolean;
```

## Facade模式 - Fadace

```
    registerCommand(notificationName: string, commandClassRef: ICommand): void;
    removeCommand(notificationName: string): void;
    hasCommand(notificationName: string): boolean;
    registerProxy(proxy: IProxy): void;
    retriesveProxy(proxyName: string): IProxy;
    removeProxy(proxyName: string): IProxy|undefined;
    hasProxy(proxyName: string): boolean;
    registerMediator(mediator: IMediator): void;
    retrieveMediator(mediatorName: string): IMediator;
    removeMediator(mediatorName: string): IMediator|null;
    hasMediator(mediatorName: string): boolean;
    notifyObservers(notification: INotification): void;
```

## PureMVC总结
pureMVC框架的目标很明确，即把程序分为低耦合的三层：Model、View和Controller。

在PureMVC实现的经典MVC设计模式中，这三部分由三个单例模式类管理，分别是Model、View和Controller，三者合称为核心层或核心角色。

PureMVC中还有另外一个单例模式类-Facade，Facade提供了与核心层（即Model,View和Controller)通信的唯一接口，以简化开发复杂度。
 
Model与Proxy
Model保存了对Proxy对象的引用，Proxy负责操作数据模型，与服务器端进行通信存取数据
 
View与Mediator
View保存了对Mediator对象的引用。由Mediator对象来操作具体的视图组件（View Component）,包括：添加事件监听器，发送或接收Notification，直接改变视图组件（View Component）的状态。
这样做实现了把视图和控制它的逻辑分离开来。
 
Controller与Command
Controller保存所有Command的映射。Command类是无状态的，只在需要时才被创建。
 
Facede与Core
Facade类应用单例模式，它负责初始化核心层（Model\View\Controller),并能访问他们的Public方法。
 
在实际的应用中，你只需要继承Facade类创建一个具体的Facade类就可以实现整个MVC模式，并不需要在代码中导入编写Model\View\Controller类。
 
Proxy\Mediator\Command就可以通过创建的Facade类来相互访问通信。
 
Notification可以被用来触发Command的执行
Facade保存了Command与Notification之间的映射。当Notification被发出时，对应的Command就会自动地由Controller执行。
 
Mediator发送、声明、接收Notification
当用View注册Mediator时，Mediator的listNotifications方法会被调用，以数组形式返回该Mediator对象所关心的所有Notification之后，当系统其它角色发出同名的Notification时，关心这个Notification的Mediator都会调用handleNotification方法将Notification以参数传递到方法。
 
Proxy发送，但不接收Notification
在很多场合下，Proxy需要发送Notification，比如：Proxy从远程服务器接收到数据时，发送Notification告诉系统；或当Proxy的数据被更新时，发送Notification告诉系统。
 
Facade
MVC设计模式的核心元素在PureMVC中体现为Model类、View类和Controller类。为了简化程序开发，PureMVC应用了Facade模式。
Facade是Model\View\Controller三者的"经纪人"。实际编写代码时你并不用导入这三者的类文件，也不用直接使用它们。Facade类已经在构造方法中包含了对核心MVC三者单例的构造。
一般地，实际的应用程序都有一个Facade子类，这个Facade类对象负责初始化Controller，建立Command与Notification之间的映射，并执行一个Command注册所有的Model和View。
 
Command
Command对象是无状态的；只有在需要的时候（Controller收到相应的Notification）才会被创建，并且被执行（调用execute方法）之后就会不给删除。
SimpleCommand只有一个execute方法，execute方法接收一个nofitication实例作为参数，实际应用中，你只需要重写这个方法就行。
MacroCommand让你可以顺序执行多个Command，每个执行都会创建一个Command对象并传参一个对原Notification的引用。
MacroCommand在构造方法调用自身的initalizeMacroCommand方法，实际应用中，你需重写这个方法，调用addSubCommand添加子Command.你可以任意组合SimpleCommand和MacroCommand成为一个新的Command