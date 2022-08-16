import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ButtonProps {
  onClick: () => void;
  active: boolean;
  icon: IconProp
}

interface ButtonRowProps {
  buttons: ButtonProps[];
}

export const ButtonRow = (props: ButtonRowProps) => {
  return (
    <div className="flex">
      <div className="btn-group content-center m-auto indicator bg-base-100 rounded-lg shadow-xl">
        {props.buttons.map((button, index) => {
          return(
            <button 
            className={`btn btn-ghost ${button.active && "btn-active"}`}
            key={index}
            onClick={button.onClick}
          >
            <FontAwesomeIcon icon={button.icon} />
          </button>
          )
        })}
      </div>
    </div>
  );
};
