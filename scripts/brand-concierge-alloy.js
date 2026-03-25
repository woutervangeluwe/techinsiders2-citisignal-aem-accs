/* eslint-env browser */

/**
 * Start Brand Concierge via Alloy after #brand-concierge-mount exists.
 * Called from blocks/brandconcierge/brandconcierge.js so bootstrap runs in the
 * same document/realm as the block (head-only listeners can miss the mount on Author/UE).
 */
export function startBrandConciergeAlloy() {
  if (window.__bcAlloyBootstrapDone) return;
  if (!document.getElementById('brand-concierge-mount')) return;

  const base = window.hlx?.codeBasePath || '';
  const mainSrc = `${base}/scripts/brandconciergemain.js`;

  const attempt = (tries) => {
    if (window.__bcAlloyBootstrapDone) return;
    if (typeof window.alloy !== 'function') {
      if (tries < 80) {
        requestAnimationFrame(() => attempt(tries + 1));
      } else {
        console.error('[Brand Concierge] window.alloy never became available');
      }
      return;
    }

    window.__bcAlloyBootstrapDone = true;
    window
      .alloy('sendEvent', {
        conversation: {
          fetchConversationalExperience: true,
        },
      })
      .then((result) => {
        console.log('Conversation experience fetched', result);
        return window.alloy('bootstrapConversationalExperience', {
          selector: '#brand-concierge-mount',
          src: mainSrc,
          stylingConfigurations: window.styleConfiguration,
          stickySession: true,
        });
      })
      .catch((err) => {
        window.__bcAlloyBootstrapDone = false;
        console.error('[Brand Concierge] sendEvent or bootstrap failed:', err);
      });
  };

  attempt(0);
}
