import "../../assets/Legend.css";
const Legends = () => {
  return (
    <div className="legend">
      <div style={{ "--color": "#a50f15" }}> more than 90</div>
      <div style={{ "--color": "#de2d26" }}>80 - 90</div>
      <div style={{ "--color": "#fb6a4a" }}>61 - 80</div>
      <div style={{ "--color": "#fc9272" }}>41 - 60</div>
      <div style={{ "--color": "#fcbba1" }}>26 - 40</div>
      <div style={{ "--color": "#fee5d9" }}>0 - 25</div>
    </div>
  );
};

export default Legends;
