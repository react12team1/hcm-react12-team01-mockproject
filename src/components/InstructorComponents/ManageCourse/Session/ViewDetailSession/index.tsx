import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { message, Spin, Descriptions } from 'antd';
// import { useNavigate } from 'react-router-dom';
import { Session } from '../../../../../model/admin/response/Session.resonse';
import { SessionService } from '../../../../../services/SessionService/session.service';



const ViewDetailSession = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);
  // const navigate = useNavigate();
  const hasMounted = useRef(false);

  const fetchSessionDetails = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const res = await SessionService.getSessionById(id)
        const sessionData = res.data?.data as Session;
        console.log(res)
        console.log("sessionData>>", sessionData)
        if (sessionData) {
          setSession(sessionData);
        } else {
          message.error("No page data available for this session.");
        }
      } catch (error) {
        message.error("Failed to fetch session details. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    console.log("SESSIONID>>>>>>>", id)
    if (hasMounted.current) return;
    hasMounted.current = true;
    if (id) {
      fetchSessionDetails(id);
    }
  }, [id, fetchSessionDetails]);

  if (loading) return <Spin tip="Loading course details..." />;

  if (!session) return <div>Session not found</div>;



  return (
    <Descriptions title="Course Details" bordered column={1}>
      <Descriptions.Item label="Title">{session.name}</Descriptions.Item>
      <Descriptions.Item label="course_id">{session.course_id}</Descriptions.Item>
      <Descriptions.Item label="Description">{session.description}</Descriptions.Item>
      <Descriptions.Item label="Position Order">{session.position_order}</Descriptions.Item>
      <Descriptions.Item label="Created At">{new Date(session.created_at).toLocaleDateString()}</Descriptions.Item>
      <Descriptions.Item label="Updated At">{new Date(session.updated_at).toLocaleDateString()}</Descriptions.Item>
    </Descriptions>
  );
};

export default ViewDetailSession;
