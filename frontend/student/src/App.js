import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
    Container, 
    CssBaseline, 
    ThemeProvider, 
    createTheme,
    AppBar,
    Toolbar,
    Typography,
    Box 
} from '@mui/material';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f5f5f5'
        }
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingTop: '2rem',
                    paddingBottom: '2rem'
                }
            }
        }
    }
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Student Management System
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Container>
                        <Routes>
                            <Route path="/" element={<StudentList />} />
                            <Route path="/add" element={<StudentForm />} />
                            <Route path="/edit/:id" element={<StudentForm />} />
                        </Routes>
                    </Container>
                </Box>
            </Router>
        </ThemeProvider>
    );
};

export default App; 