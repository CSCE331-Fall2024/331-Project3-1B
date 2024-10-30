import "./menuBoards.css";

// The Board1 component represents a menu board with meal options.
// It includes a header and a list of meal options, each displaying the meal name, calorie range, price, and a note indicating the starting price.

export default function Board1() {
    return (
        <>
            <div id="board-container">
                <div className="board-generic">



                    <h1 className="header-generic">PICK A MEAL</h1>

                    <div id="options-list">

                        <div className="option-generic">
                            <span className="option-titles">BOWL</span>
                            <span className="calories-count">240-1010</span>
                            <span className="cal">cal</span>
                            <span className="price">$6.70</span>
                            <span className="starting-at">starting at*</span>

                        </div>

                        <div className="option-generic">
                            <span className="option-titles">PLATE</span>
                            <span className="calories-count">390-1500</span>
                            <span className="cal">cal</span>
                            <span className="price">$8.20</span>
                            <span className="starting-at">starting at*</span>
                        </div>

                        <div className="option-generic">
                            <span className="option-titles">BIGGER PLATE</span>
                            <span className="calories-count">540-1990</span>
                            <span className="cal">cal</span>
                            <span className="price">$9.70</span>
                            <span className="starting-at">starting at*</span>
                        </div>

                        <div className="option-generic">
                            <span className="option-titles">PANDA CUB MEAL</span>
                            <span className="calories-count">330-1020</span>
                            <span className="cal">cal</span>
                            <span className="price">$5.80</span>
                            <span className="starting-at">starting at*</span>
                        </div>

                    </div>
                </div>

                <div className="board-generic">
                    <div className="header-generic">SIDE CHOICES</div>
                </div>
            </div>
        </>
    );
}
