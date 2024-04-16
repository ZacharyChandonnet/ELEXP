import Heading from './Heading';
import { motion } from "framer-motion"

const Accueil = () => {

    const style = {
        lineHeight: '6rem',
    }

    const h1 = {
        fontSize: '10rem',
        lineHeight: '7rem',
    }

    return (
        <section className='grid grid-cols-1 gap-12'>
            
            <div>
            <Heading title="atteints tes objectifs" />
            <h1 className='text-center font-titre  pt-6' style={h1}>
                TROUVE <br />
                TON POTENTIEL
            </h1>
            </div>

           
           <div className='bottom'>
            <figure className='bg-gray-400'>
            <h1 className='text-center font-titre text-9xl pt-12 text-white' style={style}>
                INTERIEUR <br />
                ET EXTERIEUR
            </h1>
            </figure>
           </div>
        
        </section>
    );
}

export default Accueil;