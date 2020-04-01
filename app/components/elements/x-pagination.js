import Component from '@glimmer/component';

export default class XPaginationComponent extends Component {
  maxButtons = 6
  skipBy = 20

  pageCountFromMetadata (meta, limit) {
    return Math.ceil((meta || {}).totalRecords / limit);
  }

  get cleanPageValue () {
    return parseInt(this.args.page, 0) || 1;
  }

  get pages () {
    return this.args.model ?
      this.pageCountFromMetadata(this.args.model.meta, this.args.limit) :
      this.args.pages;
  }

  get buttons () {
    const buttonList = [],
          page = this.cleanPageValue,
          pages = this.pages,
          maxButtons = this.args.maxButtons || this.maxButtons;

    if (!pages) {
      return buttonList;
    }

    let p = page > maxButtons / 2 ? page - maxButtons / 2 : 1;

    if (isNaN(pages) || isNaN(p)) {
      return buttonList;
    }

    if (p + maxButtons > pages) {
      p = pages - maxButtons + 1;
    }

    if (p <= 0) {
      p = 1;
    }

    const topLoop = pages >= maxButtons ? maxButtons : pages;

    for (let loop = 0; loop < topLoop; loop++) {
      buttonList.push({
        n:      p,
        active: p === page
      });

      p++;
    }

    return buttonList;
  }

  get onFirstPage () {
    return this.cleanPageValue < 2;
  }

  get onLastPage () {
    return this.cleanPageValue >= this.pages;
  }

  get nextPage () {
    return Math.min(this.cleanPageValue + 1, this.pages);
  }

  get previousPage () {
    return Math.max(this.cleanPageValue - 1, 1);
  }

  get nextSkipPage () {
    const incVal = this.args.skipBy || this.skipBy;
    return Math.min(this.cleanPageValue + incVal, this.pages);
  }

  get previousSkipPage () {
    const decVal = this.args.skipBy || this.skipBy;
    return Math.max(this.cleanPageValue - decVal, 1);
  }
}
