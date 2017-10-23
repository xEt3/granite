const chai    = require('chai'),
      expect  = chai.expect,
      Model   = require('.'),
      mongoose = require('mongoose'),
      Company = require('../company'),
      PaymentMethod = require('../payment-method'),
      timeout = require('timeout-then'),
      btcleanup = require('../../test-support/braintree-cleanup');

require('../../../')();

describe('Unit :: Employee Model', () => {
  afterEach(function*() {
    this.timeout(30000);
    yield btcleanup();
    yield mongoose.connection.dropDatabase();
  });

  describe('Braintree Operations', () => {
    it('it adds, updates, and removes addons to/from the company\'s subscription', function*() {
      this.timeout(25000);

      const gateway = require('../../../lib/load/braintree');
      // Make company
      let company = yield (new Company({
        name: 'Test Company, Inc.',
        email: 'someemail@example.com',
        contact: {
          name: {
            first: 'Broseph',
            last: 'Dude'
          },
          phone: '1112223334'
        }
      })).save();
      // Make payment method to kickstart subscription
      yield (new PaymentMethod({
        company,
        nonce: 'fake-valid-nonce'
      })).save();
      // Find the customer record
      let customer = yield gateway.customer.find(company._id.toString());

      expect(customer.company).to.equal(company.name);
      expect(customer.paymentMethods).to.have.lengthOf(1);
      // Create 6 employees
      for (let i = 0; i < 6; i++) {
        yield (new Model({
          company,
          name: {
            first: 'Bob',
            last: `Rossells${i}`
          },
          email: `prettiesttrees${i}@hotnet.co.uk.net.com`
        })).save();
      }
      // Normally this would introduce a race condition to not wait for post middleware to resolve
      // In this case, the braintree & mongo adapters queue calls, so we are guaranteed to have a call
      // after the place in line where we edited the subscription

      // Get company again to update subscription id kicked off by payment method save
      company = yield Company.findById(company._id);
      // Find subscription to check if the addon was created and if the quantity is 2
      let subscription = yield gateway.subscription.find(company.subscriptionId);
      expect(subscription).to.exist;
      expect(subscription.addOns).to.have.lengthOf(1);
      expect(subscription.addOns[0].quantity).to.equal(2);
      // Make employee terminated
      let employee = yield Model.findOne({ company }).exec();
      employee.terminatedOn = new Date();
      yield employee.save();
      // Check that the termination recalculated the quantity
      subscription = yield gateway.subscription.find(company.subscriptionId);
      expect(subscription).to.exist;
      expect(subscription.addOns).to.have.lengthOf(1);
      expect(subscription.addOns[0].quantity).to.equal(1);
      // Remove an employee
      yield (yield Model.findOne({ company, terminatedOn: { $exists: false } }).exec()).remove();
      // Check that the removal removed the employee subscription addon
      subscription = yield gateway.subscription.find(company.subscriptionId);
      expect(subscription).to.exist;
      expect(subscription.addOns).to.have.lengthOf(0);
    });
  });
});
