// src/components/Quiz.js
import React, { useState } from 'react';
import {
    Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, Button,
    Box, LinearProgress, Alert, Collapse // Collapse for smooth feedback transition
} from '@mui/material';

const Quiz = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [feedback, setFeedback] = useState({ show: false, correct: false, message: '' });

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
        setFeedback({ show: false, correct: false, message: '' }); // Hide feedback when changing selection
    };

    const handleNextQuestion = () => {
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
        }

        // Show feedback
        setFeedback({
            show: true,
            correct: isCorrect,
            message: isCorrect ? 'Correct!' : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`
        });

        // Move to next question after a short delay to show feedback
        setTimeout(() => {
            setFeedback({ show: false, correct: false, message: '' }); // Hide feedback
            setSelectedAnswer(''); // Reset selection
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            } else {
                setShowResult(true); // End of quiz
            }
        }, 2000); // Show feedback for 2 seconds
    };

    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer('');
        setScore(0);
        setShowResult(false);
        setFeedback({ show: false, correct: false, message: '' });
    };

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    if (showResult) {
        let resultSeverity = "info";
        if (score / questions.length >= 0.8) resultSeverity = "success";
        else if (score / questions.length >= 0.5) resultSeverity = "warning";
        else resultSeverity = "error";

        return (
            <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>Quiz Completed!</Typography>
                    <Alert severity={resultSeverity} sx={{ mb: 2, justifyContent: 'center' }}>
                        Your Score: {score} out of {questions.length}
                    </Alert>
                    <Button variant="contained" onClick={handleRestartQuiz}>
                        Restart Quiz
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </Typography>
                    <LinearProgress variant="determinate" value={progress} />
                </Box>

                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                    {currentQuestion.question}
                </Typography>

                <RadioGroup
                    aria-label="quiz-options"
                    name="quiz-options-group"
                    value={selectedAnswer}
                    onChange={handleAnswerChange}
                >
                    {currentQuestion.options.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            value={option}
                            control={<Radio disabled={feedback.show} />} // Disable options while showing feedback
                            label={option}
                        />
                    ))}
                </RadioGroup>

                <Collapse in={feedback.show}>
                    <Alert severity={feedback.correct ? 'success' : 'error'} sx={{ mt: 2 }}>
                        {feedback.message}
                    </Alert>
                </Collapse>

                <Box sx={{ mt: 3, textAlign: 'right' }}>
                    <Button
                        variant="contained"
                        onClick={handleNextQuestion}
                        disabled={!selectedAnswer || feedback.show} // Disable if no answer or showing feedback
                    >
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Quiz;