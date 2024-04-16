import Heading from "./Heading";
import ListeEntrainements from "./ListeEntrainements";

const Entrainements = () => {

    return(
        <section>
            <Heading title="Booste tes performances en enregistrant tes entraînements " paragraph="Ajoute tes entraînements afin de suivre ta progression et de te motiver à atteindre tes objectifs."/>

            <div className="flex gap-4">
                <div className="bg-red-500">
                    TEXTE
                </div>

                <div className="bg-blue-500">
                    PHOTO
                </div>
            </div>

            <ListeEntrainements/>

        </section>
    )

};

export default Entrainements;
