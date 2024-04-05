import "./GreenBoxFile.css";
const GreenBox = ({ title }) => {
  console.log(title);
  return (
    <div className="frame">
      <div className="text-wrapper">{title}</div>
    </div>
  );
};

export default GreenBox;
