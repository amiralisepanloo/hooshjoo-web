import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';

// styles
import './Project.css';

export default function Project() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [document, setDocument] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);
    
    // Fetch the project data
    const fetchProject = async () => {
      try {
        // Example API call to get project data
        const response = await fetch(`/api/projects/${id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Could not fetch the project');
        }

        const json = await response.json();
        setDocument(json);
        setIsPending(false);
        setError(null);
      } catch (err) {
        setError(err.message);
        setIsPending(false);
      }
    };

    if (user) {
      fetchProject();
    }
  }, [id, user]);

  return (
    <div className="project-details">
      {error && <div className="error">{error}</div>}
      {isPending && <div className="loading">Loading...</div>}
      {document && (
        <div>
          <h2 className="page-title">{document.name}</h2>
          <p className="due-date">
            Due by {document.dueDate && document.dueDate.toDate().toDateString()}
          </p>
          <p className="details">{document.details}</p>
          <h4>Project assigned to:</h4>
          <div className="assigned-users">
            {document.assignedUsersList.map(user => (
              <div key={user.id} className="user-avatar">
                <img src={user.photoURL} alt="user avatar" />
                <p>{user.displayName}</p>
              </div>
            ))}
          </div>
          {document.createdBy.id === user.uid && (
            <button className="btn">Mark as Complete</button>
          )}
        </div>
      )}
    </div>
  );
}

