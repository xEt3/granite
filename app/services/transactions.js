import Service from '@ember/service';
import { A } from '@ember/array';

export default class TransactionsService extends Service {
  intents = A()

  /**
   * createIntent
   * @public
   * Creates a transaction intent, returning an idempotency key
   * @param {*} data Any value to be stored with the intent 
   * @returns {String} Idempotency key for the intent
   * @memberof TransactionsService
   */
  createIntent (data) {
    const idempotencyKey = this.__generateIdempotencyKey();

    this.intents.addObject({
      idempotencyKey,
      data
    });

    return idempotencyKey;
  }

  /**
   * __generateIdempotencyKey
   * @private
   * Makes an idempotency key
   * @param {Number} [len=8] Length of key
   * @returns {String} New idempotency key
   * @memberof TransactionsService
   */
  __generateIdempotencyKey (len = 8) {
    return `${Math.floor(Math.random() * Math.pow(10, len))}`;
  }

  /**
   * getIntent
   * @public
   * Gets a transaction intent from the service
   * @param {String} idempotencyKey idempotency key of the intent
   * @returns {Undefined|Object} intent object
   * @memberof TransactionsService
   */
  getIntent (idempotencyKey) {
    return this.intents.findBy('idempotencyKey', idempotencyKey);
  }

  /**
   * removeIntent
   * @public
   * Removes an intent from the service
   * @param {String} idempotencyKey idempotency key of the intent
   * @returns {void}
   * @memberof TransactionsService
   */
  removeIntent (idempotencyKey) {
    this.intents.removeObject(this.getIntent(idempotencyKey));
  }
}
