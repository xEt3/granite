import { GraniteResourceController } from 'granite/core/controller';

export default class CounselingIssueIndexController extends GraniteResourceController {
  get intros () {
    return [{
      element:  '.ui.segment.container',
      intro:    'This page displays overarching categories of disciplinary issues for this employee.',
      position: 'top'
    }, {
      element:  '#add-issue',
      intro:    'To start an issue file on this employee\'s record, press the plus button. Adding an issue will allow you to file corrective actions for the issue.',
      position: 'top'
    }];
  }
}
