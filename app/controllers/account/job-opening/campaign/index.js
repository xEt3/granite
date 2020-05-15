import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ThreadController extends Controller {
  summaryOpts = { legend: { position: 'bottom' } };
  @tracked jobOpening
}
