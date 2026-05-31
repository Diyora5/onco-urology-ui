import SectionHeader from '../SectionHeader/SectionHeader.jsx';
import CommentForm from '../CommentForm/CommentForm.jsx';
import ReviewCard from './ReviewCard.jsx';
import './ReviewsSection.css';

function ReviewsSection({
  comments = [],
  reactedMap = {},
  onReact,
  onAddComment,
  commentCount = 0,
  maxComments = 3,
}) {
  const limitReached = commentCount >= maxComments;

  const totalReactions = comments.reduce(
    (acc, c) => acc + (c.reactions ? c.reactions.length : 0),
    0
  );
  const totalLikes = comments.reduce(
    (acc, c) =>
      acc + (c.reactions || []).filter((r) => r.type === 'LIKE').length,
    0
  );

  const stats = [
    { label: 'Отзывов', value: comments.length },
    { label: 'Лайков', value: totalLikes },
    { label: 'Реакций', value: totalReactions },
  ];

  return (
    <section className="section-block doc-section reviews" id="reviews">
      <SectionHeader
        title="Отзывы пациентов"
        subtitle="Мнения и реакции посетителей платформы"
      />

      <div className="reviews__stats">
        {stats.map((s) => (
          <div key={s.label} className="reviews__stat">
            <span className="reviews__stat-num">{s.value}</span>
            <span className="reviews__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {comments.length === 0 ? (
        <div className="state-box reviews__empty">
          <span className="state-icon" aria-hidden>
            💬
          </span>
          <p>Пока нет отзывов. Оставьте первый отзыв.</p>
        </div>
      ) : (
        <ul className="reviews__list">
          {comments.map((comment) => (
            <ReviewCard
              key={comment.id}
              comment={comment}
              reactedType={reactedMap[comment.id] || null}
              onReact={(type) => onReact(comment.id, type)}
            />
          ))}
        </ul>
      )}

      <div className="reviews__form">
        {limitReached ? (
          <div className="reviews__limit">
            <span aria-hidden>✅</span>
            <span>
              Вы оставили {maxComments} отзыва (максимум). Спасибо за обратную
              связь!
            </span>
          </div>
        ) : (
          <>
            <CommentForm onSubmit={onAddComment} />
            <p className="reviews__quota">
              Осталось отзывов: {maxComments - commentCount} / {maxComments}
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default ReviewsSection;
