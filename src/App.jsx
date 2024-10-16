import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizStart from './Components/QuizStart';
import QuestionCard from './Components/QuestionCard';
import QuizHistory from './Components/QuizHistory';
import ScoreSummary from './Components/ScoreSummary';
import SearchBar from './Components/SearchBar';
import ErrorMessage from './Components/ErrorMessage';


function App() {

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      setQuizHistory(JSON.parse(savedHistory));
    }
  }, []);

  const startQuiz = async (category, difficulty, amount) => {
    try {
      setError(null);
      const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);
      if (response.data.results.length === 0) {
        throw new Error ('No questions available for the selected criteria.');
      }
      setQuestions(response.data.results);
      setQuizStarted(true);
      setCurrentQuestion(0);
      setScore(0);
      setQuizCompleted(false);

  } catch (error) {
      setError(error.message);
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score+1);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const newQuizResult = {
        date: new Date().toISOString(),
        score: score + (isCorrect ? 1 : 0),
        total: questions.length,
        category: questions[0].category,
      };
      const updatedHistory = [...quizHistory, newQuizResult];
      setQuizHistory(updatedHistory);
      localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setQuestions([]);
    setQuizCompleted(false);
  };

  const clearHistory = () => {
    setQuizHistory([]);
    localStorage.removeItem('quizHistory');
  };

  const filteredHistory = quizHistory.filter(quiz => quiz.category.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <div className="min=h-screen bg-gradient-to-r from-red-500 to-red-800 py-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-red-800">Quiz App</h1>
          {error && <ErrorMessage message={error}/>}
          {!quizStarted && !quizCompleted && (
            <>
            <QuizStart onStart={startQuiz} />
            <SearchBar setSearchQuery= {setSearchQuery} />
            <QuizHistory history={filteredHistory} onClearHistory={clearHistory}/>
            </>
          )}
          {quizStarted && !quizCompleted && (
            <QuestionCard
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
            currentQuestion={currentQuestion + 1}
            totalQuestions= {questions.length}
            />
          )}
          {quizCompleted && (
            <ScoreSummary
            score={score}
            total={questions.length}
            onRestart= {resetQuiz}
            />
          )}
        </div>
      </div>
    </div>
  );

  
}

export default App
