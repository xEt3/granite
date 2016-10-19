import Ember from 'ember';

const { Component, Logger: { debug }, inject, computed, run, merge } = Ember;

export default Component.extend({
  store: inject.service(),

  atOptions: {},

  _atOptions: computed(function () {
    return this.get('store').query('employee', { select: 'name' })
    .then(employees => {
      let opts = this.get('atOptions');
      return [
        merge(opts, {
          at: '@',
          data: employees.map(employee => {
            return { id: employee.get('id'), name: employee.get('fullName') };
          })
        })
      ];
    });
  }),

  didInsertElement () {
    this._super(...arguments);
    this.get('_atOptions')
    .then(options => {
      run.scheduleOnce('afterRender', () => {
        let $textarea = this.$('textarea');
        debug('Attaching at.js to textarea:', $textarea[0]);
        options.forEach(optionSet => {
          debug('Initializing at.js option set', optionSet);
          $textarea.atwho(optionSet);
        });
      });
    });
  },

  willDestroyElement () {
    this.$('textarea').atwho('destroy');
  }
});
