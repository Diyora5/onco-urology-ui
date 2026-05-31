import ReactionButtons from '../ReactionButtons/ReactionButtons.jsx';
import './CommentList.css';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function initial(name = '') {
  return name.trim().charAt(0).toUpperCase() || '?';
}

function CommentList({ comments = [], onReact, reactedMap = {} }) {
  if (!comments.length) {
    return (
      <div className="state-box comment-list__empty">
        <span className="state-icon" aria-hidden>
          💭
        </span>
        <p>Hozircha izohlar yo‘q. Birinchi bo‘lib fikr bildiring!</p>
      </div>
    );
  }

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment.id} className="comment-item">
          <div className="comment-item__header">
            <div className="comment-item__author">
              <span className="comment-item__avatar" aria-hidden>
                {initial(comment.authorName)}
              </span>
              <span className="comment-item__name">{comment.authorName}</span>
            </div>
            <span className="comment-item__date">
              {formatDate(comment.createdAt || comment.created_at)}
            </span>
          </div>
          <p className="comment-item__text">{comment.text}</p>
          <ReactionButtons
            reactions={comment.reactions || []}
            reactedType={reactedMap[comment.id] || null}
            onReact={(type) => onReact(comment.id, type)}
          />
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
