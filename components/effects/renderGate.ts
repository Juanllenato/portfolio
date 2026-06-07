// Tiny shared flag so heavy background canvases can pause when a fullscreen
// overlay (e.g. the AI chat) is open — avoids two WebGL contexts rendering at once.
export const renderGate = { heroPaused: false };
