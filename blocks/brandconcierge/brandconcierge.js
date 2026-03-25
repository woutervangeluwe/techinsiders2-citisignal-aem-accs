export default function decorate(block) {
  block.setAttribute('id', 'brand-concierge-mount');
  window.dispatchEvent(new CustomEvent('aem-brand-concierge-mount'));
}
