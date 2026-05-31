import { useState } from 'react';
import './ReactionButtons.css';

const REACTIONS = [
  { type: 'LIKE', emoji: '👍', label: 'Like' },
  { type: 'DISLIKE', emoji: '👎', label: 'Dislike' },
  { type: 'HEART', emoji: '❤️', label: 'Heart' },
  { type: 'SMILE', emoji: '😊', label: 'Smile' },
  { type: 'FIRE', emoji: '🔥', label: 'Fire' },
];

function countReactions(reactions = []) {
  return reactions.reduce((acc, r) => {
    acc[r.type] = (acc[r.type] || 0) + 1;
    return acc;
  }, {});
}

// `reactedType` is the reaction this user currently has for the comment (or null).
// The user keeps one reaction per comment, but can switch it to another sticker:
// the previous one is removed and the newly chosen one is applied.
function ReactionButtons({ reactions = [], onReact, reactedType = null }) {
  const [pending, setPending] = useState(null);
  const counts = countReactions(reactions);

  const handleReact = async (type) => {
    if (pending) return;
    // Clicking the already-selected reaction does nothing.
    if (reactedType === type) return;
    setPending(type);
    try {
      await onReact(type);
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="reaction-buttons">
      {REACTIONS.map((r) => {
        const count = counts[r.type] || 0;
        const isActive = reactedType === r.type;
        const isPending = pending === r.type;
        return (
          <button
            key={r.type}
            type="button"
            className={`reaction-btn${isActive ? ' is-active' : ''}${
              count > 0 ? ' has-count' : ''
            }`}
            title={isActive ? 'Tanlangan (qayta bossangiz o‘zgartirasiz)' : r.label}
            disabled={pending !== null}
            onClick={() => handleReact(r.type)}
          >
            <span className={`reaction-btn__emoji${isPending ? ' pop' : ''}`}>
              {r.emoji}
            </span>
            <span className="reaction-btn__count">{count}</span>
          </button>
        );
      })}
    </div>
  );
}

export default ReactionButtons;
