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
                                                precision={0.1}
                                                readOnly
                                                className="course-rating"
                                            />
                                            <Typography component="span" className="course-reviews">
                                                ({course.reviews} reviews)
                                            </Typography>
                                        </Box>


                                        <Box className="course-price-duration-box">
                                            <Typography variant="h6" className="course-price">
                                                ${course.price}
                                            </Typography>
                                            <Typography variant="body2" className="course-duration">
                                                Duration: {course.duration}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box className="courses-no-results">
                        <Typography variant="h5">No courses found matching your criteria.</Typography>
                        <Typography variant="body1">
                            Please adjust your search or filters and try again.
                        </Typography>
                    </Box>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <Box className="courses-pagination">
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                )}
            </Container>
        </div>
    );
};
export default CoursesPage;