import React  from "react";

function QuizHistory ({history, onClearHistory}) {
return(
    <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Quiz History</h2>
            {history.length > 0 && (
                <button onClick={onClearHistory} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-sm">
                    Clear History
                </button>
            )}
        </div>
        {history.length === 0 ? (
    <p>No quizzes taken yet</p>
) : (
    <ul className="space-y-2">
        {history.map((quiz, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded">
                <p>Date: {new Date(quiz.date).toLocaleDateString()}</p>
                <p>Category: {quiz.category}</p>
                <p>Score: {quiz.score}/{quiz.total}</p>
            </li>
        ))} 
    </ul>
)}
    </div>
);
}

export default QuizHistory