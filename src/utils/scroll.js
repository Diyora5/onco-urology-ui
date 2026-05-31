// Smoothly scroll to an element id, or to the top when id is 'top'.
export function scrollToId(id) {
  if (!id || id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
