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
          "rgba(247, 125, 125, 2)",
           "rgba(252, 216, 216, 2)",
           "rgba(243, 39, 39, 2)",
         
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
