import Ember from 'ember';

const { Helper: { helper } } = Ember;

export function formatPhone([phone]) {
  return phone ? phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : phone;
}

export default helper(formatPhone);
