import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TendanceData from '../Data/TendanceData';
import Heading from './Heading';

const DetailsTendance = () => {
    const { id } = useParams();
    const tendance = TendanceData[id - 1];

    return (
        <div className='relative'>
            <Heading title={tendance.title} paragraph={tendance.description} />

            <div>
              {tendance.workouts.map((detail, index) => (
                <div key={index} className="detail">
                  <h3>{detail.name}</h3>
                  <p>{detail.sets}</p>
                  <p>{detail.reps}</p>
                  <img src={`/${detail.image}`} alt={detail.name} />

                </div>
              ))}
            </div>

            <Link to="/tendances" className='absolute top-0 left-0 p-4'>Retour</Link>

        </div>
    );
}

export default DetailsTendance;