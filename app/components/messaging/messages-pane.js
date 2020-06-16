import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { scheduleOnce, debounce } from '@ember/runloop';

export default class MessagingMessagesPaneComponent extends Component {
  @tracked messageThreshold = 49
  @tracked isLoading
  @tracked isBottomStuck = true
  @tracked isTopStuck
  @tracked lastScrollHeight

  topOffsetFudgePX = 20;

  @action
  didInsert () {
    this.contentChanged();
  }

  @action
  contentChanged () {
    const bottomStuck = this.isBottomStuck,
          topStuck = this.isTopStuck;

    if (!bottomStuck && !topStuck) {
      return;
    }

    scheduleOnce('afterRender', () => {
      let $this = document.getElementById('messages-pane'),
          lastScroll = this.lastScrollHeight;

      this.isLoading = false;

      if (bottomStuck) {
        return $this.scrollTo(0, $this.scrollHeight);
      }

      $this.scrollTo(lastScroll ? $this.scrollHeight - lastScroll : 0);
    });
  }

  get isFetchable () {
    return this.args.messages.length > this.messageThreshold;
  }

  @action
  onScroll (e) {
    debounce(this, this.__handleScroll, e, 1000);
  }

  @action
  triggerTopScrollEvent () {
    this.isLoading = true;
    this.args.onScrolledToTop();
  }

  @action
  __handleScroll (e) {
    const t = e.target,
          isFetchable = this.isFetchable;

    if (isFetchable && t.scrollTop <= this.topOffsetFudgePX) {
      this.isTopStuck = true;
      this.lastScrollHeight = t.scrollHeight;

      if (t.scrollHeight > t.clientHeight) {
        this.isBottomStuck = false;
      }

      if (this.args.retrievalMax) {
        return;
      }

      return this.triggerTopScrollEvent();
    } else {
      this.isTopStuck = false;
    }

    if (t.scrollHeight === t.scrollTop + t.clientHeight) {
      this.isTopStuck = false;
      this.isBottomStuck = true;
    } else {
      this.isBottomStuck = false;
    }
  }
}
