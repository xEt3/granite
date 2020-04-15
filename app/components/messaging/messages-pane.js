import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { observes } from '@ember-decorators/object';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { scheduleOnce, debounce } from '@ember/runloop';

@classic
@classNames('messaging-thread__messages-pane')
class MessagesPaneComponent extends Component {
  topOffsetFudgePX = 20;
  @tracked messageThreshold = 49;
  isBottomStuck = true;

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.$()[0].addEventListener('scroll', this.onScroll.bind(this));
    this.contentChanged();
  }

  willDestroyElement() {
    this.$()[0].removeEventListener('scroll', this.onScroll.bind(this));
    super.willDestroyElement(...arguments);
  }

  /* eslint-disable-next-line */
  @observes('messages.[]')
  contentChanged() {
    const bottomStuck = this.isBottomStuck,
          topStuck = this.isTopStuck;

    if (!bottomStuck && !topStuck) {
      return;
    }

    scheduleOnce('afterRender', () => {
      let $this = this.$(),
          lastScroll = this.lastScrollHeight;

      this.set('isLoading', false);

      if (bottomStuck) {
        return $this.scrollTop($this[0].scrollHeight);
      }

      $this.scrollTop(lastScroll ? $this[0].scrollHeight - lastScroll : 0);
    });
  }

  @computed('messages.length', 'messageThreshold')
  get isFetchable() {
    return this.get('messages.length') > this.messageThreshold;
  }

  onScroll(e) {
    debounce(this, this.__handleScroll, e, 1000);
  }

  triggerTopScrollEvent() {
    this.set('isLoading', true);
    this.onScrolledToTop();
  }

  __handleScroll(e) {
    const t = e.target,
          isFetchable = this.isFetchable;

    if (isFetchable && t.scrollTop <= this.topOffsetFudgePX) {
      this.setProperties({
        isTopStuck:       true,
        lastScrollHeight: t.scrollHeight
      });

      if (t.scrollHeight > t.clientHeight) {
        this.set('isBottomStuck', false);
      }

      if (this.retrievalMax) {
        return;
      }

      return this.triggerTopScrollEvent();
    } else {
      this.set('isTopStuck', false);
    }

    if (t.scrollHeight === t.scrollTop + t.clientHeight) {
      this.setProperties({
        isTopStuck:    false,
        isBottomStuck: true
      });
    } else {
      this.set('isBottomStuck', false);
    }
  }
}

MessagesPaneComponent.reopenClass({ positionalParams: [ 'messages' ] });

export default MessagesPaneComponent;
