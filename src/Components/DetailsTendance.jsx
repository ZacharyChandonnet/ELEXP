import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TendanceData from '../Data/TendanceData';

const DetailsTendance = () => {
    const { id } = useParams();
    const tendance = TendanceData[id - 1];

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h5>{tendance.title}</h5>
                    <p>{tendance.description}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailsTendance;