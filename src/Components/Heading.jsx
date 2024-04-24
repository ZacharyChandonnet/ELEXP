const Heading = ({title, paragraph}) => {
    

    return(
        <div className="text-center pt-24">
            <h1 className="font-titre text-md lg:text-xl text-dark">{title}</h1>
            <p className="text-sm text-dark">{paragraph}</p>
        </div>
    )

};

export default Heading;