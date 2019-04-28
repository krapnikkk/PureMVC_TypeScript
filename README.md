# puremvc-typescript-standard-framework 源码解析


* pureMVC框架的目标很明确，即把程序分为低耦合的三层：Model、View和Controller。

* 在PureMVC实现的经典MVC设计模式中，这三部分由三个单例模式类管理，分别是Model、View和Controller，三者合称为核心层或核心角色。


## Facade类

  Facade模式要求一个子系统的外部与其内部的通信必须通过一个统一的Facade对象进行。Facade模式提供一个高层次的接口，使得子系统更易于使用。  

  Facade是一个单例模式类，Facade提供了与核心层（Model,View和Controller）通信的接口，它在构造函数初始化initializeFacade核心层（Model\View\Controller),并能访问他们的Public方法。

  在该类中，它也提供了访问MVC三个单例模式类的访问属性以及绑定了Proxy\Mediator\Command的相关管理操作
;实现IFacade接口的以下抽象方法：
* 【Command（命令）】:registerCommand，removeCommand，hasCommand
* 【Proxy（代理）】:registerProxy，retrieveProxy，removeProxy，hasProxy
* 【Mediator(中介者)】:registerMediator，retrieveMediator，removeMediator，hasMediator
* 【通知观察者】:notifyObservers 

-----

### Model与Proxy
Model保存了对Proxy对象的引用，Proxy负责操作数据模型，与服务器端进行通信存取数据
* registerProxy 【通过ProxyName作为键值对在Model的proxyMap对象(object)存储Proxy】
* removeProxy   【通过ProxyName作为键值对在Model的proxyMap对象(object)移除Proxy】
* retrieveProxy 【通过ProxyName作为键值对获取在Model的proxyMap对象(object)中的Proxy】
* hasProxy      【通过ProxyName作为键值对判断在Model的proxyMap对象(object)中的Proxy是否存在】 


### View与Mediator
View保存了对Mediator对象的引用。由Mediator对象来操作具体的视图组件（View Component）,包括：添加事件监听器，发送或接收Notification，直接改变视图组件（View Component）的状态。
这样做实现了把视图和控制它的逻辑分离开来。

### Mediator
* registerMediator 【通过MediatorName作为键值对在View的mediatorMap对象(object)存储Mediator,并将mediator感兴趣的消息（listNotificationInterests）通过构建一个Observer（观察者）[mediator.handleNotification,mediator]，再通过notificationName(消息名)作为键值对储存在View的observerMap对象(object)中】
* removeMediator   【通过mediatorName查询在View的mediatorMap对象(object)上存储的mediator;将Mediator存储起来的感兴趣的消息通过removeObserver移除掉】
* retrieveMediator 【通过mediatorName作为键值对获取在View的mediatorMap对象(object)中的Mediator】
* hasMediator      【通过mediatorName作为键值对判断在View的mediatorMap对象(object)中的Mediator是否存在】 

#### observer
* registerObserver 【通过notificationName作为键值对在View的observerMap对象(object)存储observer】
* removeObserver   【通过对比observer的notifyContext将observer从observerMap】
* notifyObservers  【通过notificationName作为键值对遍历observerMap对象(object)存储observer引用,通知(notifyObserver)observer】

### Controller与Command
Controller保存所有Command的映射。Command类是无状态的，只在需要时才被创建。

#### Command

* registerCommand
* executeCommand
* hasCommand
* removeCommand

------
### Proxy

### Mediator

### observer

### Command
