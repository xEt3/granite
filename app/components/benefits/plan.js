import Component from '@glimmer/component';

const az = 'abcdefghijklmnopqrstuvwxyz',
      typeColors = {
        M: [ 25, 75 ],
        D: [ 20, 5 ],
        V: [ 105, 25 ],
        L: [ 205, 150 ],
        O: [ 205, 100 ]
      };

export default class BenefitsPlanComponent extends Component {
  get rgbColorway () {
    const { name, type } = this.args.plan;

    if (!name) {
      return 'rgb(0,0,0)';
    }

    let loPlanName      = name.toLowerCase().replace(/[^a-z]*/g, '').substr(0, 9),
        checksum        = loPlanName.split('').reduce((tot, char) => tot + az.indexOf(char), 0),
        clampedChecksum = Math.min(Math.abs(checksum), 255),
        [ g, b ]        = typeColors[type];

    return `rgb(${clampedChecksum},${g},${b})`;
  }

  get cardStyle () {
    return `box-shadow: 0 12px 11px -9px ${this.rgbColorway} inset, 2px 2px 6px rgba(153, 153, 153, 0.8)`;
  }
}
