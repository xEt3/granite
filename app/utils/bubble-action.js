export default function bubbleAction ( proxyTo ) {
  return function () {
    this.get(proxyTo).apply(this, arguments);
  };
}
