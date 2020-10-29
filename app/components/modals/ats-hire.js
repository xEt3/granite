import Component from '@ember/component';
import $ from 'jquery';
import { action } from '@ember/object';

export default class AtsHireComponent extends Component {
  employeeFields = [
    { 'Date of birth': 'dateOfBirth' },
    { 'Address Line 1': 'address.line1' },
    { 'Address Line 2': 'address.line2' },
    { 'City': 'address.city' },
    { 'State': 'address.state' },
    { 'Zip': 'address.zip' },
    { 'Custom Fields': 'customFields' },
    { 'Emergency Contact First Name': 'emergencyContact.name.first' },
    { 'Emergency Contact Last Name': 'emergencyContact.name.last' },
    { 'Emergency Contact Phone Number': 'emergencyContact.phone' }
  ]

  closeModal () {
    $('#' + this.modalId).modal('hide');
  }

  @action
  respond (response) {
    this.onResponse(response);
    this.closeModal();
  }
  @action
  interimAddForm (form) {
    this.args.model.onboardingForms.addObject(form);
  }
}
