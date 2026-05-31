import api from './axios';

// POST /comments/:commentId/reactions
// data: { type }  -> LIKE | DISLIKE | HEART | SMILE | FIRE
export const createReaction = async (commentId, data) => {
  const response = await api.post(`/comments/${commentId}/reactions`, data);
  return response.data.data;
};

// DELETE /comments/:commentId/reactions/:reactionId
export const deleteReaction = async (commentId, reactionId) => {
  const response = await api.delete(
    `/comments/${commentId}/reactions/${reactionId}`
  );
  return response.data.data;
};
