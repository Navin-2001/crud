import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    CircularProgress,
    Snackbar,
    Alert
} from '@mui/material';
import studentService from '../services/studentService';

const StudentForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        studentname: '',
        studentaddress: '',
        mobile: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        if (isEditMode) {
            fetchStudentData();
        }
    }, [id]);

    const fetchStudentData = async () => {
        try {
            setLoading(true);
            const data = await studentService.getStudentById(id);
            setFormData({
                studentname: data.studentname,
                studentaddress: data.studentaddress,
                mobile: data.mobile
            });
        } catch (error) {
            showNotification('Failed to fetch student data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.studentname.trim()) {
            newErrors.studentname = 'Name is required';
        }
        if (!formData.studentaddress.trim()) {
            newErrors.studentaddress = 'Address is required';
        }
        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Please enter a valid 10-digit mobile number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            if (isEditMode) {
                await studentService.updateStudent(id, formData);
                showNotification('Student updated successfully', 'success');
            } else {
                await studentService.saveStudent(formData);
                showNotification('Student added successfully', 'success');
            }
            navigate('/'); // Navigate back to list after success
        } catch (error) {
            showNotification(
                `Failed to ${isEditMode ? 'update' : 'add'} student`,
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const showNotification = (message, severity) => {
        setNotification({ open: true, message, severity });
    };

    if (loading && isEditMode) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    {isEditMode ? 'Edit Student' : 'Add New Student'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="studentname"
                        value={formData.studentname}
                        onChange={handleChange}
                        margin="normal"
                        error={Boolean(errors.studentname)}
                        helperText={errors.studentname}
                    />
                    <TextField
                        fullWidth
                        label="Address"
                        name="studentaddress"
                        value={formData.studentaddress}
                        onChange={handleChange}
                        margin="normal"
                        error={Boolean(errors.studentaddress)}
                        helperText={errors.studentaddress}
                    />
                    <TextField
                        fullWidth
                        label="Mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        margin="normal"
                        error={Boolean(errors.mobile)}
                        helperText={errors.mobile}
                    />
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} />
                            ) : isEditMode ? (
                                'Update Student'
                            ) : (
                                'Add Student'
                            )}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Paper>

            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={() => setNotification({ ...notification, open: false })}
            >
                <Alert
                    onClose={() => setNotification({ ...notification, open: false })}
                    severity={notification.severity}
                    sx={{ width: '100%' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default StudentForm; 