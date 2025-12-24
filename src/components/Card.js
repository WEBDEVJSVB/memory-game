function Card({ item, id, handleClick }) {
    const itemClass = item.stat ? ' ' + item.stat : '';

    return (
        <div className={"card" + itemClass} onClick={() => handleClick(id)}>
            {/* Cara Frontal (Lo que se ve antes de hacer click) */}
            <div className="face front"></div>
            
            {/* Cara Trasera (La imagen a revelar) */}
            <div className="face back">
                <img src={item.img} alt="technology icon" />
            </div>
        </div>
    );
}

export default Card;