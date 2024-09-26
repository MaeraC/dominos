
// Affiche les points d'un côté du domino
const renderDots = (num) => {
    const dotClass = `dot dot-${num}`

    switch (num) {
        case 0:
            return <div className="container-dots"></div>

        case 1:
            return (
                <div className="container-dots">
                    <div style={{ margin: 'auto' }}>
                        <div className={dotClass}></div>
                    </div>
                </div>
            )

        case 2:
            return (
                <div className="container-dots">
                    <div className="row-dots">
                        <div className={dotClass}></div>
                        <div></div>
                        <div style={{ visibility: 'hidden' }}></div>
                    </div>
                    <div className="row-dots">
                        <div style={{ visibility: 'hidden' }}></div>
                        <div></div>
                        <div className={dotClass}></div>
                    </div>
                </div>
            )

        case 3:
            return (
                <div className="container-dots">
                    <div className="row-dots">
                        <div className={dotClass}></div>
                    </div>
                    <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
                        <div className={dotClass}></div>
                    </div>
                    <div className="row-dots">
                        <div></div>
                        <div className={dotClass}></div>
                    </div>
                </div>
            )

        case 4:
            return (
                <div className="container-dots">
                    <div className="row-dots">
                        <div className={dotClass}></div>
                        <div className={dotClass}></div>
                    </div>
                    <div className="row-dots">
                        <div className={dotClass}></div>
                        <div className={dotClass}></div>
                    </div>
                </div>
            )

        case 5:
            return (
                <div className="container-dots">
                    <div className="row-dots">
                        <div className={dotClass}></div>
                        <div className={dotClass}></div>
                    </div>
                    <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
                        <div className={dotClass}></div>
                    </div>
                    <div className="row-dots">
                        <div className={dotClass}></div>
                        <div className={dotClass}></div>
                    </div>
                </div>
            )

        case 6:
            return (
                <div className="container-dots">
                    <div className="row-dots">
                        <div className={dotClass}></div>
                        <div className={dotClass}></div>
                    </div>
                    <div className="row-dots">
                        <div className={dotClass}></div>
                        <div className={dotClass}></div>
                    </div>
                    <div className="row-dots">
                        <div className={dotClass}></div>
                        <div className={dotClass}></div>
                    </div>
                </div>
            )

        default:
          return null
    }
}

const Domino = ({ left, right, onClick, className }) => (
    <div className={`domino ${className}`} onClick={onClick} >
        {/* Affiche la barre centrale uniquement si les deux côtés existent */}
        {left !== null && right !== null && <div className="bar-center"></div>}

        <div style={{ display: 'flex', gap: '10px' }}>
            {left !== null && <div>{renderDots(left)}</div>}
            {right !== null && <div>{renderDots(right)}</div>}
        </div>
    </div>
);



export default Domino