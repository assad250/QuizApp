import React, { useState } from "react";

function QuestionCard ({question, onAnswer, currentQuestion, totalQuestions }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(selectedAnswer !== null) {
            setAnswerSubmitted(true);
            setTimeout(() => {
                onAnswer(selectedAnswer === question.correct_answer);
                setSelectedAnswer(null);
                setAnswerSubmitted(false);
            }, 1500);
        }
    };

    const getAnswerClass = (answer) => {
        if (!answerSubmitted) return '';
        if (answer === question.correct_answer) return 'bg-green-200';
        if (answer === selectedAnswer) return 'bg-red-200';
        return '';
    };

    return(
        <div>
            <div className="mb-4">
                <p className="text-sm text-gray-500">
                    Question{currentQuestion} of {totalQuestions}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-600 h-2.5 rounded-full"
                    style={{width: `${(currentQuestion / totalQuestions) * 100}% `}}>

                    </div>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-4" dangerouslySetInnerHTML={{__html: question.question}}></h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {[...question.incorrect_answers, question.correct_answer]
                .sort(() => Math.random() - 0.5)
                .map((answer, index) => (
                    <div key={index} className={`flex items-center p-2 rounded ${getAnswerClass(answer)}`}>
                        <input type="radio"
                        id={`answer-${index}`}
                        name="answer"
                        value={answer}
                        checked={selectedAnswer === answer}
                        onChange={() => setSelectedAnswer(answer)}
                        disabled={answerSubmitted}
                        className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300" />
                        <label htmlFor={`answer-${index}`} className="ml-3 block text-sm font-medium text-gray-700" dangerouslySetInnerHTML={{__html: answer}}></label>


                    </div>
                ))}
                <button type="submit"
                disabled={selectedAnswer === null || answerSubmitted}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-offset-2 ring-red-500 disabled:opacity-50">
                    Submit Answer
                </button>
            </form>
        </div>
    );

}

export default QuestionCard;