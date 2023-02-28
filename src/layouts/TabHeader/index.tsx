import { useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";

type Props = {
    profile: any;
};
export const TabHeader: React.FC<Props> = ({ profile }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentLocation = location.pathname.split("/").splice(-1)[0];

    return (
        <div className="tab-container">
            {profile.map((tabName: any, index: number) => (
                <div
                    key={index}
                    className={
                        currentLocation === `${tabName}`
                            ? "tabs staticTab"
                            : " staticTab"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`${tabName}`)}>
                    <span style={{ textTransform: "capitalize" }}>
                        {tabName === "shop"
                            ? "APX/Shop"
                            : tabName.replace("_", "")}
                    </span>
                </div>
            ))}
        </div>
    );
};
