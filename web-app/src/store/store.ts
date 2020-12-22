import { createStore } from 'easy-peasy';
import model from './models';
import services from './services';

const store = createStore(model, {
  injections: services,
});

export default store;
