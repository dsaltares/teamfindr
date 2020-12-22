import authModel from './auth';

export interface StoreModel {
  auth: typeof authModel;
}

const model: StoreModel = {
  auth: authModel,
};

export default model;
