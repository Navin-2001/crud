import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/student';

const studentService = {
    // Get all students
    getAllStudents: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getall`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Save new student
    saveStudent: async (studentData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/save`, studentData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update student
    updateStudent: async (id, studentData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/edit/${id}`, studentData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete student
    deleteStudent: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Search student by ID
    getStudentById: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/search/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default studentService;
