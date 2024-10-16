import React from 'react';

function SearchBar ({setSearchQuery}) {
    return(
        <div className="mt-4">
            <input type="text" placeholder='Search Quiz History' onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full px-3 py-2 placeholdr-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus-ring-indigo-100 focus:border-indigo-300'/>
        </div>
    );
}

export default SearchBar