import { useState, useEffect } from 'react';
import Card from './Card';

function Cards({ addMove }) {
    const [items, setItems] = useState([]);
    const [prev, setPrev] = useState(-1);
    const [isChecking, setIsChecking] = useState(false); // Bloqueo para evitar clicks rápidos
    const [matches, setMatches] = useState(0);

    // Imágenes de datos (Asegúrate de tener estas imágenes en public/img/)
    const cardImages = [
        { id: 1, img: '/img/html.png', stat: "" },
        { id: 2, img: '/img/css.png', stat: "" },
        { id: 3, img: '/img/js.png', stat: "" },
        { id: 4, img: '/img/scss.png', stat: "" },
        { id: 5, img: '/img/react.png', stat: "" },
        { id: 6, img: '/img/vue.png', stat: "" },
        { id: 7, img: '/img/angular.png', stat: "" },
        { id: 8, img: '/img/nodejs.png', stat: "" }
    ];

    useEffect(() => {
        // Duplicamos y barajamos al iniciar
        const shuffled = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ ...card, uniqueId: index })); // uniqueId para keys de React
        setItems(shuffled);
    }, []);

    function check(current) {
        if (items[current].id === items[prev].id) {
            // Acierto
            items[current].stat = "correct";
            items[prev].stat = "correct";
            setItems([...items]);
            setPrev(-1);
            setMatches(prev => prev + 1);
            setIsChecking(false);
        } else {
            // Fallo
            items[current].stat = "wrong";
            items[prev].stat = "wrong";
            setItems([...items]);
            
            // Esperar animación antes de voltear
            setTimeout(() => {
                items[current].stat = "";
                items[prev].stat = "";
                setItems([...items]);
                setPrev(-1);
                setIsChecking(false);
            }, 800); // 800ms para ver el error
        }
        addMove(); // Sumamos un movimiento en App.js
    }

    function handleClick(index) {
        // Evitar clicks si: ya está animando, es la misma carta, o ya está correcta
        if (isChecking || index === prev || items[index].stat === "correct") {
            return;
        }

        if (prev === -1) {
            // Primer click
            items[index].stat = "active";
            setItems([...items]);
            setPrev(index);
        } else {
            // Segundo click
            check(index);
            setIsChecking(true); // Bloquear tablero mientras verifica
        }
    }

    return (
        <>
            <div className="container">
                {items.map((item, index) => (
                    <Card key={index} item={item} id={index} handleClick={handleClick} />
                ))}
            </div>
            {/* Mensaje de Victoria */}
            {matches === 8 && (
                <div className="win-message">
                    🎉 ¡Felicidades! Completado 🎉
                </div>
            )}
        </>
    );
}

export default Cards;