import { useState } from 'react';
import ReactionButtons from '../ReactionButtons/ReactionButtons.jsx';
import { formatCommentDate } from '../../utils/format';

const MAX_LEN = 220;

function initial(name = '') {
  return (name.trim()[0] || '?').toUpperCase();
}

function ReviewCard({ comment, reactedType, onReact }) {
  const [expanded, setExpanded] = useState(false);
  const text = comment.text || '';
  const isLong = text.length > MAX_LEN;
  const shown = !isLong || expanded ? text : `${text.slice(0, MAX_LEN)}…`;

  return (
    <li className="review-card">
      <div className="review-card__head">
        <span className="review-card__avatar" aria-hidden>
          {initial(comment.authorName)}
        </span>
        <div className="review-card__meta">
          <span className="review-card__author">{comment.authorName}</span>
          <span className="review-card__date">
            {formatCommentDate(comment.createdAt || comment.created_at)}
          </span>
        </div>
      </div>

      <p className="review-card__text">{shown}</p>

      {isLong && (
        <button
          type="button"
          className="review-card__more"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? 'свернуть' : 'читать далее'}
        </button>
      )}

      <ReactionButtons
        reactions={comment.reactions || []}
        reactedType={reactedType}
        onReact={onReact}
      />
    </li>
  );
}

export default ReviewCard;
