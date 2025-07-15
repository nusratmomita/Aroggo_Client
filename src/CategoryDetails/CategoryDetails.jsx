import React from 'react';
import { useParams } from 'react-router';

const CategoryDetails = () => {
    const catName = useParams();
    console.log(catName)
    return (
        <div>
            
        </div>
    );
};

export default CategoryDetails;