import Component from '@glimmer/component';

export default class TablesImportRecordSetComponent extends Component {
  get allSelected () {
    return this.args.selectedRows.length === this.args.recordSet.records.length;
  }
}
