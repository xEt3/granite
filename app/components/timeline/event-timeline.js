import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
class EventTimelineComponent extends Component {}

EventTimelineComponent.reopenClass({ positionalParams: [ 'events' ] });

export default EventTimelineComponent;
