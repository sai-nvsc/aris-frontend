import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryCountPerClinicThunk } from "../../redux/slices/AnalyticsSlice";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
export const ClinicCategoryCountGraph = () => {
  const dispatch = useDispatch();
  const { loading, clinic_categoryCount } = useSelector(
    (state) => state.analytics
  );
  const label = [];
  clinic_categoryCount &&
    clinic_categoryCount.map((category) => label.push(category._id));
  const option = {
    parsing: {
      key: "count",
      name: "_id",
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Bite Cases per Exposure Category",
      },
    },
  };
  const data = {
    labels: label,
    datasets: [
      {
        label: "Bite Case per Gender",
        data: clinic_categoryCount ? clinic_categoryCount : [],
        backgroundColor: [
          "rgba(75, 192, 192, 2)",
          "rgba(153, 102, 255, 2)",
          "rgba(255, 159, 64, 2)",
        ],
      },
    ],
  };
  useEffect(() => {
    dispatch(getCategoryCountPerClinicThunk());
    return () => {};
  }, [dispatch]);

  return <>{!loading && <Doughnut options={option} data={data} />}</>;
};
