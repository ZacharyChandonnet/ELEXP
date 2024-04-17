import Heading from "./Heading";
import ListeEntrainements from "./ListeEntrainements";
import "./Entrainement.css";

const Entrainements = () => {


  return (
    <section>
      <Heading
        title="Booste tes performances en enregistrant tes entraînements "
        paragraph="Ajoute tes entraînements afin de suivre ta progression et de te motiver à atteindre tes objectifs."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 pt-12 ">
        <div className="bg-dark text-white grid grid-cols-1 items-center  p-12 pt-36 pb-36 reverse-clip">
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
          <img src="/push1_image.jpg" alt="Entrainement" className="clip"  />
        </div>
      </div>

      <ListeEntrainements />



    </section>
  );
};

export default Entrainements;
