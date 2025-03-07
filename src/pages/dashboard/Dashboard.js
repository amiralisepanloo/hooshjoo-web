import { useAuthContext } from '../../context/AuthContext'
import './Dashboard.css'

// Dashboard component
export default function Dashboard() {
  const { user } = useAuthContext()

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        {user && <p>Welcome, {user.displayName}</p>}
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-summary">
          <div className="dashboard-card">
            <h3>Projects</h3>
            <p>Your projects will appear here</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Recent Activity</h3>
            <p>Your recent activities will appear here</p>
          </div>
        </div>
        
        <div className="dashboard-sidebar">
          <div className="dashboard-card">
            <h3>Quick Stats</h3>
            <p>Stats loading...</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Notifications</h3>
            <p>No new notifications</p>
          </div>
        </div>
      </div>
    </div>
  )
}

