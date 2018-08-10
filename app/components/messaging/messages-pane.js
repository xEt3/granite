import Component from '@ember/component';
import { observer, computed } from '@ember/object';
import { scheduleOnce, debounce } from '@ember/runloop';

const MessagesPaneComponent = Component.extend({
  classNames: [ 'messaging-thread__messages-pane' ],

  topOffsetFudgePX: 20,
  messageThreshold: 49,
  isBottomStuck: true,

  didInsertElement () {
    this._super(...arguments);
    this.$()[0].addEventListener('scroll', this.onScroll.bind(this));
    this.contentChanged();
  },

  willDestroyElement () {
    this.$()[0].removeEventListener('scroll', this.onScroll.bind(this));
    this._super(...arguments);
  },

  contentChanged: observer('messages.[]', function () {
    const bottomStuck = this.get('isBottomStuck'),
          topStuck = this.get('isTopStuck');

    if (!bottomStuck && !topStuck) {
      return;
    }

    scheduleOnce('afterRender', () => {
      let $this = this.$(),
          lastScroll = this.get('lastScrollHeight');

      this.set('isLoading', false);

      if (bottomStuck) {
        return $this.scrollTop($this[0].scrollHeight);
      }

      $this.scrollTop(lastScroll ? $this[0].scrollHeight - lastScroll : 0);
    })
  }),

  isFetchable: computed('messages.length', 'messageThreshold', function () {
    return this.get('messages.length') > this.get('messageThreshold');
  }),

  onScroll (e) {
    debounce(this, this.__handleScroll, e, 1000);
  },

  triggerTopScrollEvent () {
    this.set('isLoading', true);
    this.get('onScrolledToTop')();
  },

  __handleScroll (e) {
    const t = e.target,
          isFetchable = this.get('isFetchable');

    if (isFetchable && t.scrollTop <= this.get('topOffsetFudgePX')) {
      console.log('at top');
      this.setProperties({
        isTopStuck: true,
        lastScrollHeight: t.scrollHeight
      });

      if (t.scrollHeight > t.clientHeight) {
        this.set('isBottomStuck', false);
      }

      if (this.get('retrievalMax')) {
        return;
      }

      return this.triggerTopScrollEvent();
    } else {
      console.log('not at top');
      this.set('isTopStuck', false);
    }

    if (t.scrollHeight === t.scrollTop + t.clientHeight) {
      console.log('at bottom');
      this.setProperties({
        isTopStuck: false,
        isBottomStuck: true
      });
    } else {
      console.log('not at bottom');
      this.set('isBottomStuck', false);
    }
  }
});

MessagesPaneComponent.reopenClass({
  positionalParams: [ 'messages' ]
})

export default MessagesPaneComponent;
