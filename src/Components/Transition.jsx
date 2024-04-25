import { motion, AnimatePresence } from 'framer-motion';
import "./CSS/Loader.css"
import { useState } from 'react';

const Transition = () => {

    const [animationComplete, setAnimationComplete] = useState(false);

    const handleAnimationComplete = () => {
        setAnimationComplete(true);
    }

    return (

        <AnimatePresence>
            <motion.div
               
                initial={{ width: '100%' }}
                animate={{ width: ['100%', '0%'], height: ['100%', '0%', '0%'], opacity: [1, 1, 1]}}
                transition={{ duration: 3, delay:1,  ease: 'easeInOut'}}
                onAnimationComplete={handleAnimationComplete}
            >
                <div className='preloader'
                    style={{ display: animationComplete ? 'none' : '' }}
                >
                    <div className='text-container'>
                        <span>
                            <motion.div
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: .5 }}
                            >
                                <img src="/LogoB.svg" alt="Logo" className='logo' />
                            </motion.div>
                        </span>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )

}
export default Transition;