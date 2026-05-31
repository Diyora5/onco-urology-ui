import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEmployeeById } from '../../api/employeeApi';
import { createComment } from '../../api/commentApi';
import { createReaction, deleteReaction } from '../../api/reactionApi';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import DoctorStickyNav from '../../components/DoctorStickyNav/DoctorStickyNav.jsx';
import DoctorProfileHeader from '../../components/DoctorProfileHeader/DoctorProfileHeader.jsx';
import DoctorBioSection from '../../components/doctorDetail/DoctorBioSection.jsx';
import ScientificInterests from '../../components/doctorDetail/ScientificInterests.jsx';
import AcademicInfoBlock from '../../components/doctorDetail/AcademicInfoBlock.jsx';
import ExperienceSection from '../../components/doctorDetail/ExperienceSection.jsx';
import EducationSection from '../../components/doctorDetail/EducationSection.jsx';
import ListSection from '../../components/doctorDetail/ListSection.jsx';
import ReviewsSection from '../../components/ReviewsSection/ReviewsSection.jsx';
import {
  MAX_COMMENTS,
  getReactedComments,
  getReactionFor,
  setReactionFor,
  getCommentCount,
  incrementCommentCount,
  hasReachedCommentLimit,
} from '../../utils/userActivity';
import './EmployeeDetail.css';

function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reactedMap, setReactedMap] = useState({});
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const stored = getReactedComments();
    const typeMap = {};
    Object.keys(stored).forEach((cid) => {
      const value = stored[cid];
      if (value && typeof value === 'object' && value.type) {
        typeMap[cid] = value.type;
      }
    });
    setReactedMap(typeMap);
    setCommentCount(getCommentCount(id));
  }, [id]);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getEmployeeById(id);
        if (active) setEmployee(data);
      } catch (err) {
        if (active) {
          if (err.response && err.response.status === 404) {
            setError('Врач не найден.');
          } else {
            setError('Не удалось загрузить данные. Попробуйте позже.');
          }
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, [id]);

  const handleAddComment = async ({ authorName, text }) => {
    if (hasReachedCommentLimit(id)) {
      setCommentCount(getCommentCount(id));
      return;
    }
    const newComment = await createComment(id, { authorName, text });
    setEmployee((prev) => ({
      ...prev,
      comments: [newComment, ...(prev.comments || [])],
    }));
    setCommentCount(incrementCommentCount(id));
  };

  const handleReact = async (commentId, type) => {
    const prevReaction = getReactionFor(commentId); // { id, type } | null
    if (prevReaction && prevReaction.type === type) return;

    // Switching: remove the previous reaction, then add the new one.
    if (prevReaction && prevReaction.id) {
      try {
        await deleteReaction(commentId, prevReaction.id);
      } catch {
        /* old reaction already gone on the server — continue */
      }
    }
    const newReaction = await createReaction(commentId, { type });

    setEmployee((prev) => ({
      ...prev,
      comments: (prev.comments || []).map((c) => {
        if (c.id !== commentId) return c;
        let reactions = c.reactions || [];
        if (prevReaction) {
          reactions = reactions.filter((r) => r.id !== prevReaction.id);
        }
        return { ...c, reactions: [...reactions, newReaction] };
      }),
    }));

    setReactionFor(commentId, newReaction.id, type);
    setReactedMap((prev) => ({ ...prev, [commentId]: type }));
  };

  if (loading) {
    return (
      <div className="detail">
        <div className="detail__skeleton-header">
          <div className="skeleton detail__skeleton-photo" />
          <div className="detail__skeleton-lines">
            <div className="skeleton detail__skeleton-line lg" />
            <div className="skeleton detail__skeleton-line sm" />
            <div className="skeleton detail__skeleton-line" />
            <div className="skeleton detail__skeleton-line" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail">
        <div className="state-box">
          <span className="state-icon" aria-hidden>
            😕
          </span>
          <p>{error}</p>
          <Link to="/" className="btn btn-secondary" style={{ marginTop: 18 }}>
            ← На главную
          </Link>
        </div>
      </div>
    );
  }

  if (!employee) return null;

  const profile = employee.profile;
  const publications = employee.publications || [];
  const certificates = employee.certificates || [];
  const internships = employee.internships || [];

  const navItems = [
    { id: 'about', label: 'О враче' },
    (profile?.scientificInterests || []).length > 0 && {
      id: 'interests',
      label: 'Интересы',
    },
    (employee.workExperiences || []).length > 0 && {
      id: 'experience',
      label: 'Опыт',
    },
    (employee.educations || []).length > 0 && {
      id: 'education',
      label: 'Образование',
    },
    publications.length > 0 && { id: 'publications', label: 'Публикации' },
    certificates.length > 0 && { id: 'certificates', label: 'Сертификаты' },
    internships.length > 0 && { id: 'internships', label: 'Стажировки' },
    { id: 'reviews', label: 'Отзывы' },
  ].filter(Boolean);

  return (
    <div className="detail">
      <Breadcrumb current={employee.fullName} />

      <DoctorProfileHeader doctor={employee} />

      <DoctorStickyNav items={navItems} />

      <div className="detail__sections">
        <DoctorBioSection bio={profile?.bio} />

        <ScientificInterests interests={profile?.scientificInterests} />

        <AcademicInfoBlock profile={profile} />

        <ExperienceSection experiences={employee.workExperiences} />

        <EducationSection educations={employee.educations} />

        <ListSection
          id="publications"
          title="Публикации"
          subtitle="Научные статьи и работы"
          items={publications}
          variant="list"
          icon="📄"
        />

        <ListSection
          id="certificates"
          title="Сертификаты"
          subtitle="Подтверждённые квалификации"
          items={certificates}
          variant="chips"
          icon="🏆"
        />

        <ListSection
          id="internships"
          title="Стажировки"
          subtitle="Международный и клинический опыт"
          items={internships}
          variant="list"
          icon="✈️"
        />

        <ReviewsSection
          comments={employee.comments || []}
          reactedMap={reactedMap}
          onReact={handleReact}
          onAddComment={handleAddComment}
          commentCount={commentCount}
          maxComments={MAX_COMMENTS}
        />
      </div>
    </div>
  );
}

export default EmployeeDetail;
