import './InputField.css';

const InputField = ({ label, type = "text", placeholder, icon, value, onChange, inputClass }) => {
  return (
    <div className="input-wrapper">
      <label className="input-label">{label}</label>

      <div className="input-box">
        <input
          type={type}
          className={`input-field ${inputClass || ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {icon && <span className="input-icon">{icon}</span>}
      </div>
    </div>
  );
};

export default InputField;
