import { useState } from 'react';
import './CommentForm.css';

function CommentForm({ onSubmit }) {
  const [authorName, setAuthorName] = useState('');
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authorName.trim() || !text.trim()) {
      setError('Пожалуйста, заполните имя и текст отзыва.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({ authorName: authorName.trim(), text: text.trim() });
      setAuthorName('');
      setText('');
    } catch (err) {
      setError('Не удалось отправить отзыв. Попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h3 className="comment-form__title">
        <span aria-hidden>✍️</span> Оставить отзыв
      </h3>

      {error && (
        <div className="alert-error comment-form__error">
          <span aria-hidden>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <div className="comment-form__field">
        <label htmlFor="authorName">Ваше имя</label>
        <input
          id="authorName"
          type="text"
          className="input"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Введите ваше имя"
          disabled={submitting}
        />
      </div>

      <div className="comment-form__field">
        <label htmlFor="text">Отзыв</label>
        <textarea
          id="text"
          rows="3"
          className="input comment-form__textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Напишите ваш отзыв..."
          disabled={submitting}
        />
      </div>

      <button type="submit" className="btn comment-form__submit" disabled={submitting}>
        {submitting ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  );
}

export default CommentForm;
