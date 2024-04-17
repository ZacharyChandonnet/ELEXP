import { Link } from 'react-router-dom';
import TendanceData from '../Data/TendanceData';
import Heading from './Heading';
import { FaArrowRightLong } from "react-icons/fa6";
import {useState} from 'react';

const Tendances = () => {

    const [hover, setHover] = useState(false);
    
    return (
        <div>
            <Heading title="Le fitness devrait être accessible à tout le monde." paragraph="Découvrez les tendances du moment pour vous aider à rester en forme." />
            <h2 className='font-titre uppercase pt-12 pb-4'>Entrainements tendances</h2>
            <div>
                {TendanceData.map((tendance) => (
                    <div key={tendance.id} className="tendance-item mb-4">
                        <Link to={`/tendances/${tendance.id}`} style={{ textDecoration: 'none' }}>
                            <div className='pt-12 bg-dark text-white rounded-lg px-4'>
                                <div className='flex flex-col-reverse justify-between h-40 pb-6'>
                                    <div className="flex justify-between items-end">
                                        <h5 className='uppercase font-titre text-4xl'>{tendance.title}</h5>
                                        <div className="btn btn-primary text-4xl"><FaArrowRightLong /></div> 
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div>
                <h2 className='font-titre uppercase pt-12 pb-4'>Avantages de s'entrainer</h2>

                <div className='flex flex-col pt-4 gap-12'>
                    <div className='border-b-2 border-dark pb-2 cursor-pointer' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <h3 className='font-titre uppercase font-titre text-2xl lg:text-4xl '>Améliore la santé mentale</h3>
                    {hover && <p className='text-dark text-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.</p>}
                    </div>
                    <div className='border-b-2 border-dark pb-2 cursor-pointer' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <h3 className='font-titre uppercase  font-titre text-2xl lg:text-4xl'>Améliore la santé physique</h3>
                    {hover && <p className='text-dark text-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.</p>}
                    </div>
                    <div className='border-b-2 border-dark pb-2 cursor-pointer' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <h3 className='font-titre uppercase font-titre text-2xl lg:text-4xl'>Aide à dormir</h3>
                    {hover && <p className='text-dark text-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.</p>}
                    </div>
                </div>
                
            </div>

            <div className='bg-dark h-96 mt-12 mb-12 rounded-lg flex justify-center items-center'>
            <h2 className='font-titre uppercase pt-12 pb-4 text-center text-white text-3xl lg:text-9xl'>TON CORPS <br /> TON TEMPLE</h2>
            </div>

        </div>
    );
}

export default Tendances;
