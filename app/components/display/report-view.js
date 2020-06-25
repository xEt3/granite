import Component from '@glimmer/component';

export default class DisplayReportViewComponent extends Component {
  get headers () {
    return this.args.data[0];
  }

  get bodyData () {
    return this.args.data.slice(1);
  }
}
