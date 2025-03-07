import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

// styles
import './Create.css';

export default function Create() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  
  // redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError('Please select a project category');
      return;
    }

    if (!name) {
      setFormError('Please provide a project name');
      return;
    }

    // create project object with user data
    const project = {
      name,
      details,
      dueDate: new Date(dueDate),
      category,
      assignedUsers,
      createdBy: user.uid,
    };

    try {
      // TODO: Add your project creation logic here
      // For example: await projectFirestore.collection('projects').add(project);
      
      // redirect to dashboard on success
      navigate('/');
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Create a New Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          <span>Project details:</span>
          <textarea
            required
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
        </label>

        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <label>
          <span>Project category:</span>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
          </select>
        </label>

        {/* We can add assigned users functionality in the future */}
        
        <button className="btn">Create Project</button>
        
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}

