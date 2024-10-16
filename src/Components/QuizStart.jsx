import React, {useState,useEffect} from 'react';
import axios from 'axios'


function QuizStart ({onStart}) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [amount, setAmount] = useState(10);

    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
        .then(response => {
            setCategories(response.data.trivia_categories);
        })
        .catch(error => console.error('Error fetching categories:', error)
        );
    }, []);

    const handleStart = (e) => {
        e.preventDefault();
        onStart(selectedCategory, difficulty, amount);
    };

    return(
        <form onSubmit={handleStart} className='space-y-4'>
            <div>
                <label htmlFor="category" className='block text-sm font-medium text-gray-700'>Category</label>
                <select
                 id="category"
                 value={selectedCategory}
                 onChange={(e) => setSelectedCategory(e.target.value)}
                 className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'>
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                 </select>
            </div>


            <div>
                <label htmlFor="difficulty" className='block text-sm font-medium text-gray-700'>Difficulty</label>
                <select id="difficulty" value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="easy">Hard</option>

                </select>
            </div>

            <div>
            <label htmlFor="amount" className='block text-sm font-medium text-gray-700'>Number Of Questions</label>
            <input type="number"
            id='amount'
            min='1'
            max='50'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md' />
            </div>

            <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '>
                Start Quiz
            </button>
        </form>
    );

}
export default QuizStart
