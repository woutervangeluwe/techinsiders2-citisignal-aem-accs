import { startBrandConciergeAlloy } from '../../scripts/brand-concierge-alloy.js';

export default function decorate(block) {
  block.setAttribute('id', 'brand-concierge-mount');
  startBrandConciergeAlloy();
}
