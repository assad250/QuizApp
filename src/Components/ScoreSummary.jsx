import React from "react";



function ScoreSummary ({ score, total, onRestart}) {
    const percentage = ((score / total) * 100).toFixed(2);
    let message = '';
    let messageColor = '';

    if (percentage >= 80) {
        message = 'Excelent Job!';
        messageColor = 'text-green-600';
    } else if (percentage >= 60) {
        message = 'Good work!';
        messageColor = 'text-blue-600';
    } else {
        message = 'keep practicing!';
        messageColor = 'text-yellow-600'
    }

    return(
        <div className="text-center">
            <head className="text-2xl font-bold mb-4 ">Quiz Completed!</head>
            <p className="text-xl">
                Your Score: {score} Out Of {total}
            </p>
            <p className="text-lg mt-2">
                Percentage: {percentage}%
            </p>

            <p className={`text-lg font-semibold mt-2 ${messageColor}`}>
                {message}
            </p>

            <button onClick={{onRestart}} className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-red-500 transition-colors duration-200">
                Start New Quiz
            </button>
        </div>
    )

}

export default ScoreSummary