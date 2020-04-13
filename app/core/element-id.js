export default function elementId (constructor) {
  return class ElementIdObject extends constructor {
    constructor () {
      super(...arguments);
      this.elementId = Math.round(Math.random() * Math.pow(10, 10));
    }
  };
}
