import Switch from "@mui/material/Switch";
import "./styles.scss";

type ToogleProps = {
    label1: string,
    label2: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    defaultChecked?: boolean
    value: boolean
    text: string
}

export const ToggleButton: React.FC<ToogleProps> = ({ label1, label2, defaultChecked, onChange, value, text }) => {

    return (
        <div className='toggle-container'>
            <label className="txt-label">{text}  :</label>
            <div className='toggle-button'>
                <div className={value ? "active-false-label" : "inActive-false-label"}>{label1}</div>
                <Switch
                    defaultChecked={defaultChecked}
                    color="warning"
                    onChange={onChange}
                />
                <div className={value ? "active-true-label" : "inActive-true-label"} >{label2}</div>
            </div>
        </div>
    );
};
