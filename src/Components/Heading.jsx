const Heading = ({title, paragraph}) => {
    

    return(
        <div className="text-center pt-24">
            <h1 className="font-titre text-xl">{title}</h1>
            <p className="text-sm">{paragraph}</p>
        </div>
    )

};

export default Heading;