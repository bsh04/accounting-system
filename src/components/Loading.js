import React from 'react';
import '../index.scss'

export const Loading = () => {
    return (
        <div className="spinner-border text-success loading" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
};
