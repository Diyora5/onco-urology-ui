// Tracks the current visitor's activity in localStorage.
// There is no auth, so "one user" = one browser. This enforces:
//  - one reaction per comment (changeable / updatable)
//  - up to MAX_COMMENTS comments per employee

export const MAX_COMMENTS = 3;

// Versioned keys: bumping the suffix discards incompatible legacy data.
const REACTED_KEY = 'di_reacted_comments_v2';
const COMMENTED_KEY = 'di_comment_counts_v2';

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore storage errors */
  }
}

// Reactions: { [commentId]: { id, type } }
export function getReactedComments() {
  return read(REACTED_KEY, {});
}

export function getReactionFor(commentId) {
  const value = getReactedComments()[commentId];
  // Only trust the new object format { id, type }.
  if (value && typeof value === 'object' && value.type) return value;
  return null;
}

export function setReactionFor(commentId, id, type) {
  const map = getReactedComments();
  map[commentId] = { id, type };
  write(REACTED_KEY, map);
}

export function clearReactionFor(commentId) {
  const map = getReactedComments();
  delete map[commentId];
  write(REACTED_KEY, map);
}

// Comments: { [employeeId]: count }
export function getCommentCount(employeeId) {
  return read(COMMENTED_KEY, {})[Number(employeeId)] || 0;
}

export function incrementCommentCount(employeeId) {
  const map = read(COMMENTED_KEY, {});
  const id = Number(employeeId);
  map[id] = (map[id] || 0) + 1;
  write(COMMENTED_KEY, map);
  return map[id];
}

export function hasReachedCommentLimit(employeeId) {
  return getCommentCount(employeeId) >= MAX_COMMENTS;
}
