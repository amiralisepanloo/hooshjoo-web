import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="page home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Welcome to HooshJoo</h1>
        <p className="hero-subtitle">
          Your comprehensive educational platform. Expand your knowledge, enhance your skills, and excel in your academic journey with our interactive learning experience.
        </p>
        <Link to="/courses" className="hero-button">
          Explore Courses
        </Link>
      </section>

      <div className="home-container">
        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">Why Choose HooshJoo?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3 className="feature-title">Comprehensive Curriculum</h3>
              <p className="feature-description">
                Access a wide range of subjects with structured learning paths tailored to various educational levels.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧩</div>
              <h3 className="feature-title">Interactive Quizzes</h3>
              <p className="feature-description">
                Test your knowledge with our engaging quizzes designed to reinforce learning and improve retention.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Learn Anywhere</h3>
              <p className="feature-description">
                Study on any device, anytime, anywhere. Your progress syncs across our web and mobile platforms.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3 className="feature-title">Achievement System</h3>
              <p className="feature-description">
                Earn certificates and badges as you progress through courses and master new concepts.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Courses Section */}
        <section className="courses-section">
          <h2 className="section-title">Popular Courses</h2>
          <div className="courses-grid">
            <div className="course-card">
              <img 
                src="https://via.placeholder.com/300x160?text=Mathematics" 
                alt="Mathematics Course" 
                className="course-image" 
              />
              <div className="course-content">
                <h3 className="course-title">Advanced Mathematics</h3>
                <p className="course-description">
                  Master advanced mathematical concepts including calculus, algebra, and statistics.
                </p>
                <div className="course-footer">
                  <div className="course-rating">
                    ★★★★★ (4.9)
                  </div>
                  <div className="course-price">$49.99</div>
                </div>
              </div>
            </div>

            <div className="course-card">
              <img 
                src="https://via.placeholder.com/300x160?text=Physics" 
                alt="Physics Course" 
                className="course-image" 
              />
              <div className="course-content">
                <h3 className="course-title">Fundamentals of Physics</h3>
                <p className="course-description">
                  Explore the laws that govern our universe from mechanics to quantum theory.
                </p>
                <div className="course-footer">
                  <div className="course-rating">
                    ★★★★☆ (4.7)
                  </div>
                  <div className="course-price">$39.99</div>
                </div>
              </div>
            </div>

            <div className="course-card">
              <img 
                src="https://via.placeholder.com/300x160?text=Chemistry" 
                alt="Chemistry Course" 
                className="course-image" 
              />
              <div className="course-content">
                <h3 className="course-title">Organic Chemistry</h3>
                <p className="course-description">
                  Learn about chemical compounds, reactions, and their applications in everyday life.
                </p>
                <div className="course-footer">
                  <div className="course-rating">
                    ★★★★☆ (4.5)
                  </div>
                  <div className="course-price">$44.99</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <h2 className="section-title">What Our Students Say</h2>
          <div className="testimonials-container">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "HooshJoo transformed my learning experience. The interactive quizzes and comprehensive explanations helped me excel in my final exams!"
              </p>
              <div className="testimonial-author">
                <img 
                  src="https://via.placeholder.com/50x50" 
                  alt="Student" 
                  className="testimonial-avatar" 
                />
                <div className="testimonial-info">
                  <span className="testimonial-name">Sarah Johnson</span>
                  <span className="testimonial-role">University Student</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">
                "As a teacher, I recommend HooshJoo to all my students. The platform offers engaging content that supplements classroom learning perfectly."
              </p>
              <div className="testimonial-author">
                <img 
                  src="https://via.placeholder.com/50x50" 
                  alt="Teacher" 
                  className="testimonial-avatar" 
                />
                <div className="testimonial-info">
                  <span className="testimonial-name">Dr. Michael Chen</span>
                  <span className="testimonial-role">High School Teacher</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">
                "I love how I can learn at my own pace with HooshJoo. The mobile compatibility allows me to study during my commute, making productive use of my time."
              </p>
              <div className="testimonial-author">
                <img 
                  src="https://via.placeholder.com/50x50" 
                  alt="Professional" 
                  className="testimonial-avatar" 
                />
                <div className="testimonial-info">
                  <span className="testimonial-name">David Rodriguez</span>
                  <span className="testimonial-role">Working Professional</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section">
          <h2 className="cta-title">Start Your Learning Journey Today</h2>
          <p className="cta-description">
            Join thousands of students who have transformed their education with HooshJoo's interactive learning platform. Get unlimited access to all courses, quizzes, and resources.
          </p>
          <Link to="/register" className="hero-button">
            Sign Up Now - Free Trial
          </Link>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
