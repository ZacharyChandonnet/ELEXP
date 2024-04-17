import {Link } from 'react-router-dom';
import TendanceData from '../Data/TendanceData';
import Heading from './Heading';

const Tendances = () => {
    return (
        <div>
            <Heading title="Le fitness devrait être accessible à tout le monde." paragraph="Découvrez les tendances du moment pour vous aider à rester en forme." />

            <h2 className='font-titre uppercase'>Entrainements tendances</h2>

            <div>
                {TendanceData.map((tendance) => (
                    <div key={tendance.id}>
                        <div >
                            <div>
                                <h5>{tendance.title}</h5>
                                <Link to={`/tendances/${tendance.id}`} className="btn btn-primary">Voir plus</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tendances;