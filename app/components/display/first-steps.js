import Component from '@glimmer/component';

export default class DisplayFirstStepsComponent extends Component {
  get linkClass () {
    return `first-steps__card ${this.args.completed ? 'first-steps__card--completed' : ''}`;
  }
}
