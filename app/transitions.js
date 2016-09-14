export default function () {
  this.transition(
    this.fromRoute('account.asset.index.index'),
    this.toRoute('account.asset.index.new'),
    this.use('toUp'),
    this.reverse('toDown')
  );
  this.transition(
    this.fromRoute('account.anatomy.departments'),
    this.toRoute('account.anatomy.department/new'),
    this.use('toUp'),
    this.reverse('toDown')
  );
}
