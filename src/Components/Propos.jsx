import Heading from './Heading';
import "./Entrainement.css";

const Propos = () => {

    return(
        <div>
            <Heading title="Qui sommes-nous?" paragraph="Découvrez notre mission et notre vision." />

        <div className="grid grid-cols-1 lg:grid-cols-2 pt-12 ">
        <div className="bg-dark text-white grid grid-cols-1 items-center  p-12 pt-36 pb-36">
        <div className="lg:pl-16"> 

       
        <h2 className="font-titre text-white text-lg lg:text-3xl" >
        CRÉEZ ET PERSONNALISE <br />
        TES ENTRAINEMENTS QUAND TU VEUX.
        </h2>

        <p className="text-white italic pt-4 w-2/3 lg:pl-8">
          Créez tes propres entraînements avec des exercices optimales au développement de vos performances <br /> et au goût du jour.	
        </p>
        </div>
        </div>

        <div >
          <img src="/push1_image.jpg" alt="Entrainement" className='para' />
        </div>
      </div>

        </div>
    )

}

export default Propos;