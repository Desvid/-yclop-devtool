import { port } from './port';
import { NEW_SUBSCRIPTION, FIRST_SUBSCRIPTIONS } from './mocks';

class AgentHandler {

  constructor(flux) {
    this.flux = flux;
  
    this.handlers = {
      connected: () => this.flux.actions.didConnect(),
  
      didGetFirstSubscriptions: (data) => this.flux.actions.initSubscriptions.didGetFirstSubscriptions(data),
      didGetNewSubscription: (data) => this.flux.actions.newSubscriptions.didGetNewSubscription(data),
    };

    if (process.env.NODE_ENV === 'development') {
      this.flux.actions.initSubscriptions.didGetFirstSubscriptions(FIRST_SUBSCRIPTIONS);

      setInterval(() => {
        this.flux.actions.newSubscriptions.didGetNewSubscription(NEW_SUBSCRIPTION);
      }, 3000);
    } else {
      
      port.onMessage.addListener((message) => {
        console.log(message)
        this.handleMessage(message); 
      });
    }
  }

  handleMessage(message) {
    const handler = this.handlers[message.name];
    if (!handler) {
      console.warn('No handler found for event ' + message.name);
      return;
    }
    handler(message.data);
  };
};

export default AgentHandler;