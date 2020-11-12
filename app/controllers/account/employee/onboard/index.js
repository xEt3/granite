import Controller from 'granite/core/controller';
import { states, bankAccountTypes, filingStatuses } from 'granite/config/statics';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AccountEmployeeOnboardIndex extends Controller {
  @service data
  states = states
  bankAccountTypes = bankAccountTypes
  filingStatuses = filingStatuses

  @tracked pendingBankAccount
  @tracked pendingBankTypeSelection

  get stateIsMontana () {
    return this.model.addressState === 'MT';
  }

  @action
  addPendingBankAccount () {
    this.pendingBankAccount = this.store.createRecord('bank-account');
    this.pendingBankTypeSelection = undefined;
  }

  @action
  deletePendingBankAccount () {
    this.pendingBankAccount.destroyRecord();
    this.pendingBankAccount = undefined;
    this.pendingBankTypeSelection = undefined;
  }

  @action
  removeBankAccount (bankAccount) {
    const model = this.model;
    model.get('bankAccounts').removeObject(bankAccount);
    bankAccount.destroy();
  }

  @action
  addBankAccount () {
    this.model.bankAccounts.addObject(this.pendingBankAccount);
    this.pendingBankAccount = undefined;
  }
}
