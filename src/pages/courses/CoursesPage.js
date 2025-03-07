import React, { useState, useEffect } from 'react';
import './CoursesPage.css';

// Mock course data - in a real app this would come from an API or Firebase
const mockCourses = [
  {
    id: 1,
    title: 'Introduction to Programming',
    description: 'Learn the fundamentals of programming with this comprehensive course for beginners.',
    instructor: 'Dr. Sarah Johnson',
    category: 'Programming',
    level: 'Beginner',
    price: 49.99,
    rating: 4.7,
    students: 1245,
    image: 'https://via.placeholder.com/300x200?text=Programming'
  },
  {
    id: 2,
    title: 'Advanced Machine Learning',
    description: 'Dive deep into machine learning algorithms and techniques with hands-on projects.',
    instructor: 'Prof. Michael Chen',
    category: 'Data Science',
    level: 'Advanced',
    price: 89.99,
    rating: 4.9,
    students: 863,
    image: 'https://via.placeholder.com/300x200?text=Machine+Learning'
  },
  {
    id: 3,
    title: 'Web Development Bootcamp',
    description: 'Build modern, responsive websites with HTML, CSS, and JavaScript.',
    instructor: 'Jane Smith',
    category: 'Web Development',
    level: 'Intermediate',
    price: 69.99,
    rating: 4.5,
    students: 2156,
    image: 'https://via.placeholder.com/300x200?text=Web+Development'
  },
  {
    id: 4,
    title: 'Mobile App Development with React Native',
    description: 'Create cross-platform mobile applications using React Native and JavaScript.',
    instructor: 'Alex Rodriguez',
    category: 'Mobile Development',
    level: 'Intermediate',
    price: 79.99,
    rating: 4.6,
    students: 1587,
    image: 'https://via.placeholder.com/300x200?text=React+Native'
  },
  {
    id: 5,
    title: 'Database Design & SQL',
    description: 'Master database design principles and SQL queries for effective data management.',
    instructor: 'Dr. Priya Patel',
    category: 'Databases',
    level: 'Beginner',
    price: 59.99,
    rating: 4.4,
    students: 978,
    image: 'https://via.placeholder.com/300x200?text=SQL'
  },
  {
    id: 6,
    title: 'Cybersecurity Fundamentals',
    description: 'Learn essential cybersecurity concepts to protect systems and data from threats.',
    instructor: 'Robert Williams',
    category: 'Security',
    level: 'Beginner',
    price: 69.99,
    rating: 4.8,
    students: 1345,
    image: 'https://via.placeholder.com/300x200?text=Cybersecurity'
  }
];

const categories = ['All', 'Programming', 'Data Science', 'Web Development', 'Mobile Development', 'Databases', 'Security'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const CoursesPage = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [filteredCourses, setFilteredCourses] = useState(mockCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [priceRange, setPriceRange] = useState(100);

  // Handle search and filtering
  useEffect(() => {
    let result = [...courses];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(course => course.category === selectedCategory);
    }
    
    // Apply level filter
    if (selectedLevel !== 'All') {
      result = result.filter(course => course.level === selectedLevel);
    }
    
    // Apply price filter
    result = result.filter(course => course.price <= priceRange);
    
    setFilteredCourses(result);
  }, [courses, searchQuery, selectedCategory, selectedLevel, priceRange]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle level selection
  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  // Handle price range change
  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setPriceRange(100);
  };

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>Explore Our Courses</h1>
        <p>Discover the perfect course to enhance your skills and knowledge</p>
      </div>

      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search courses by title, description, or instructor..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="search-button">Search</button>
        </div>
      </div>

      <div className="courses-container">
        <div className="filters-panel">
          <h3>Filters</h3>
          
          <div className="filter-group">
            <label htmlFor="category">Category</label>
            <select 
              id="category" 
              value={selectedCategory} 
              onChange={handleCategoryChange}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="level">Level</label>
            <select 
              id="level" 
              value={selectedLevel} 
              onChange={handleLevelChange}
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="price">Max Price: ${priceRange}</label>
            <input
              type="range"
              id="price"
              min="0"
              max="100"
              step="5"
              value={priceRange}
              onChange={handlePriceChange}
            />
          </div>
          
          <button className="clear-filters-button" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        <div className="courses-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-image">
                  <img src={course.image} alt={course.title} />
                </div>
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <p className="instructor">by {course.instructor}</p>
                  <p className="description">{course.description}</p>
                  <div className="course-meta">
                    <span className="category">{course.category}</span>
                    <span className="level">{course.level}</span>
                  </div>
                  <div className="course-footer">
                    <div className="rating">
                      <span className="rating-value">{course.rating}</span>
                      <span className="stars">★★★★★</span>
                      <span className="students">({course.students} students)</span>
                    </div>
                    <div className="price">${course.price}</div>
                  </div>
                  <button className="enroll-button">Enroll Now</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-courses-found">
              <h3>No courses match your search criteria</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  TextField, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Box, 
  Rating, 
  Chip, 
  FormControl, 
  InputLabel,
  Select, 
  MenuItem, 
  Pagination,
  Divider,
  IconButton,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './CoursesPage.css';

const CoursesPage = () => {
  // Sample course data
  const sampleCourses = [
    {
      id: 1,
      title: 'Introduction to Machine Learning',
      description: 'Learn the fundamentals of machine learning algorithms and their applications.',
      instructor: 'Dr. Sarah Johnson',
      image: 'https://source.unsplash.com/random/300x200?machine+learning',
      category: 'Data Science',
      level: 'Beginner',
      rating: 4.7,
      reviews: 128,
      price: 49.99,
      duration: '8 weeks',
      favorite: false
    },
    {
      id: 2,
      title: 'Advanced JavaScript Programming',
      description: 'Master modern JavaScript features, design patterns, and best practices.',
      instructor: 'Mark Thompson',
      image: 'https://source.unsplash.com/random/300x200?javascript',
      category: 'Web Development',
      level: 'Intermediate',
      rating: 4.9,
      reviews: 215,
      price: 59.99,
      duration: '10 weeks',
      favorite: true
    },
    {
      id: 3,
      title: 'Digital Marketing Essentials',
      description: 'Learn effective digital marketing strategies to grow your business online.',
      instructor: 'Jessica Williams',
      image: 'https://source.unsplash.com/random/300x200?marketing',
      category: 'Marketing',
      level: 'Beginner',
      rating: 4.5,
      reviews: 189,
      price: 39.99,
      duration: '6 weeks',
      favorite: false
    },
    {
      id: 4,
      title: 'UX/UI Design Principles',
      description: 'Learn user-centered design principles and create intuitive interfaces.',
      instructor: 'Alex Chen',
      image: 'https://source.unsplash.com/random/300x200?design',
      category: 'Design',
      level: 'Intermediate',
      rating: 4.8,
      reviews: 156,
      price: 54.99,
      duration: '8 weeks',
      favorite: false
    },
    {
      id: 5,
      title: 'Python for Data Analysis',
      description: 'Use Python to analyze large datasets and extract meaningful insights.',
      instructor: 'Dr. Michael Brown',
      image: 'https://source.unsplash.com/random/300x200?python',
      category: 'Data Science',
      level: 'Intermediate',
      rating: 4.6,
      reviews: 178,
      price: 49.99,
      duration: '9 weeks',
      favorite: true
    },
    {
      id: 6,
      title: 'Blockchain Fundamentals',
      description: 'Understand the core concepts of blockchain technology and cryptocurrencies.',
      instructor: 'Robert Garcia',
      image: 'https://source.unsplash.com/random/300x200?blockchain',
      category: 'Technology',
      level: 'Advanced',
      rating: 4.4,
      reviews: 92,
      price: 69.99,
      duration: '12 weeks',
      favorite: false
    },
    {
      id: 7,
      title: 'Mobile App Development with React Native',
      description: 'Build cross-platform mobile applications using React Native.',
      instructor: 'Emily Parker',
      image: 'https://source.unsplash.com/random/300x200?mobile+app',
      category: 'Web Development',
      level: 'Intermediate',
      rating: 4.7,
      reviews: 143,
      price: 59.99,
      duration: '10 weeks',
      favorite: false
    },
    {
      id: 8,
      title: 'Business Leadership Skills',
      description: 'Develop essential leadership skills for managing teams and organizations.',
      instructor: 'Thomas Wilson',
      image: 'https://source.unsplash.com/random/300x200?leadership',
      category: 'Business',
      level: 'Beginner',
      rating: 4.5,
      reviews: 167,
      price: 44.99,
      duration: '7 weeks',
      favorite: false
    },
    {
      id: 9,
      title: 'Adobe Photoshop Masterclass',
      description: 'Master photo editing and digital art creation with Adobe Photoshop.',
      instructor: 'Lisa Adams',
      image: 'https://source.unsplash.com/random/300x200?photoshop',
      category: 'Design',
      level: 'Intermediate',
      rating: 4.8,
      reviews: 203,
      price: 49.99,
      duration: '8 weeks',
      favorite: true
    },
    {
      id: 10,
      title: 'Ethical Hacking and Cybersecurity',
      description: 'Learn how to identify and fix security vulnerabilities in systems.',
      instructor: 'David Miller',
      image: 'https://source.unsplash.com/random/300x200?cybersecurity',
      category: 'Technology',
      level: 'Advanced',
      rating: 4.9,
      reviews: 176,
      price: 74.99,
      duration: '14 weeks',
      favorite: false
    },
    {
      id: 11,
      title: 'Content Marketing Strategy',
      description: 'Create effective content marketing strategies to engage your audience.',
      instructor: 'Olivia Taylor',
      image: 'https://source.unsplash.com/random/300x200?content+marketing',
      category: 'Marketing',
      level: 'Intermediate',
      rating: 4.6,
      reviews: 132,
      price: 44.99,
      duration: '7 weeks',
      favorite: false
    },
    {
      id: 12,
      title: 'Data Visualization with D3.js',
      description: 'Create interactive data visualizations for the web using D3.js.',
      instructor: 'James Wilson',
      image: 'https://source.unsplash.com/random/300x200?data+visualization',
      category: 'Data Science',
      level: 'Advanced',
      rating: 4.7,
      reviews: 105,
      price: 64.99,
      duration: '9 weeks',
      favorite: false
    }
  ];

  // Categories derived from the course data
  const categories = [...new Set(sampleCourses.map(course => course.category))];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  // State variables
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // Initialize courses with sample data
  useEffect(() => {
    setCourses(sampleCourses);
    setFilteredCourses(sampleCourses);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = courses;
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(course => course.category === categoryFilter);
    }
    
    // Apply level filter
    if (levelFilter) {
      result = result.filter(course => course.level === levelFilter);
    }
    
    setFilteredCourses(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, categoryFilter, levelFilter, courses]);

  // Toggle favorite status
  const handleToggleFavorite = (id) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, favorite: !course.favorite } : course
    ));
  };

  // Handle search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('');
    setLevelFilter('');
  };

  return (
    <div className="courses-page">
      <div className="courses-hero">
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" className="courses-hero-title">
            Explore Our Courses
          </Typography>
          <Typography variant="h5" component="p" className="courses-hero-subtitle">
            Discover a wide range of educational content to enhance your skills
          </Typography>
        </Container>
      </div>

      <Container maxWidth="lg" className="courses-container">
        {/* Search and Filter Section */}
        <Box className="courses-search-section">
          <Typography variant="h4" component="h2" gutterBottom>
            Find Your Perfect Course
          </Typography>
          
          {/* Search field */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for courses, topics, or instructors"
            value={searchQuery}
            onChange={handleSearchChange}
            className="courses-search-input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          {/* Filters */}
          <Grid container spacing={2} className="courses-filters">
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Level</InputLabel>
                <Select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  label="Level"
                >
                  <MenuItem value="">All Levels</MenuItem>
                  {levels.map((level, index) => (
                    <MenuItem key={index} value={level}>{level}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4} className="courses-clear-filters">
              <Button 
                variant="outlined" 
                onClick={handleClearFilters}
                fullWidth
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Divider className="courses-divider" />

        {/* Results summary */}
        <Box className="courses-results-summary">
          <Typography variant="h6" component="p">
            Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
            {categoryFilter && ` in ${categoryFilter}`}
            {levelFilter && ` for ${levelFilter} level`}
          </Typography>
        </Box>

        {/* Course Grid */}
        {currentCourses.length > 0 ? (
          <Grid container spacing={3} className="courses-grid">
            {currentCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card className="course-card">
                  <CardMedia
                    component="img"
                    height="160"
                    image={course.image}
                    alt={course.title}
                    className="course-card-media"
                  />
                  <CardContent className="course-card-content">
                    <Box className="course-card-category-box">
                      <Chip 
                        label={course.category} 
                        size="small" 
                        className="course-category-chip"
                      />
                      <Chip 
                        label={course.level} 
                        size="small" 
                        variant="outlined" 
                        className="course-level-chip"
                      />
                      <IconButton 
                        className="course-favorite-button"
                        onClick={() => handleToggleFavorite(course.id)}
                        size="small"
                      >
                        {course.favorite ? 
                          <FavoriteIcon color="error" /> : 
                          <FavoriteBorderIcon />
                        }
                      </IconButton>
                    </Box>
                    
                    <Typography gutterBottom variant="h6" component="h3" className="course-title">
                      {course.title}
                    </Typography>
                    
                    <Typography variant="body2" color="textSecondary" className="course-description">
                      {course.description}
                    </Typography>
                    
                    <Typography variant="body2" className="course-instructor">
                      Instructor: <strong>{course.instructor}</strong>
                    </Typography>
                    
                    <Box className="course-rating-box">
                      <Rating 
                        value={course.rating}

import React from 'react';
import './CoursesPage.css';

const CoursesPage = () => {
  return (
    <div className="page courses-page">
      <h1>Our Courses</h1>
      <div className="courses-grid">
        {/* Courses will be displayed here */}
      </div>
    </div>
  );
};

export default CoursesPage;

