// Reference: https://www.youtube.com/watch?v=p7J7u_9_3FI

import { useDispatch } from "react-redux";
import { resetAsync } from "../redux/thunks";


function Dialog(props) {
    const dispatch = useDispatch();
    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    background: "white",
                    padding: "20px",
                    borderRadius: "10px"
                }}
            >
                <h3 style={{ color: "#111", fontSize: "16px" }}>Are you sure to remove all recipes?</h3>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                        type="button"
                        onClick={() => {
                            dispatch(resetAsync());
                            props.toggleDialog(0);

                        }
                    }
                        style={{
                            background: "red",
                            color: "white",
                            padding: "10px",
                            marginRight: "4px",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            props.toggleDialog(0)}
                    }
                        style={{
                            background: "blue",
                            color: "white",
                            padding: "10px",
                            marginLeft: "4px",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Dialog;
