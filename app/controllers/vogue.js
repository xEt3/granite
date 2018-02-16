import Controller from '@ember/controller';

const ipsum = 'Bacon ipsum dolor amet pig id ut ea velit chicken incididunt brisket. Mollit deserunt tri-tip ut commodo. Commodo culpa brisket pork belly. Mollit voluptate ribeye, in in dolor est aliqua sunt t-bone quis salami pancetta ham hock.';

export default Controller.extend({
  ipsum,
  queryParams: [ 'focus' ],
  focus: null,

  typeSizes: [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900'
  ],

  colors: [
    'black',
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
    'black',
    'primaryColor',
    'secondaryColor',
    'gray-darker',
    'gray-dark',
    'gray',
    'gray-light',
    'gray-lighter'
  ],

  btnColors: [
    '',
    'primary',
    'secondary',
    'red',
    'orange',
    'blue',
    'pink',
    'grey',
    'black'
  ],

  btnSizes: [
    'mini',
    'tiny',
    'small',
    'medium',
    '',
    'large',
    'big',
    'huge',
    'massive'
  ],

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    }
  }
});
