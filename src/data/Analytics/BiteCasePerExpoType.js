import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getExposureCountPerClinicThunk,
  getSourceExposureCountPerClinicThunk,
} from "../../redux/slices/AnalyticsSlice";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
export const BiteCasePerExpoType = () => {
  const dispatch = useDispatch();
  const { loading, clinic_exposureCount } = useSelector(
    (state) => state.analytics
  );
  const label = [];
  clinic_exposureCount &&
    clinic_exposureCount.map((category) => label.push(category._id));
  const option = {
    parsing: {
      key: "count",
      name: "_id",
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Bite Cases per Exposure Type",
      },
    },
  };
  const data = {
    labels: label,
    datasets: [
      {
        label: "Bite Case per Exposure Type",
        data: clinic_exposureCount ? clinic_exposureCount : [],
        backgroundColor: [
          "rgba(75, 192, 192, 2)",
          "rgba(153, 102, 255, 2)",
          "rgba(255, 159, 64, 2)",
          "rgba(56, 43, 173)",
        ],
      },
    ],
  };
  useEffect(() => {
    dispatch(getExposureCountPerClinicThunk());
    return () => {};
  }, [dispatch]);

  return <>{!loading && <Doughnut options={option} data={data} />}</>;
};

export const BiteCasePerSourceExposure = () => {
  const dispatch = useDispatch();
  const { loading, clinic_source_exposureCount } = useSelector(
    (state) => state.analytics
  );
  const label = [];
  clinic_source_exposureCount &&
    clinic_source_exposureCount.map((category) => label.push(category._id));
  const option = {
    parsing: {
      key: "count",
      name: "_id",
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Bite Cases per Sourcce of Exposure",
      },
    },
  };
  const data = {
    labels: label,
    datasets: [
      {
        label: "Bite Case per Source of Exposure",
        data: clinic_source_exposureCount ? clinic_source_exposureCount : [],
        backgroundColor: [
          "rgba(75, 192, 192, 2)",
          "rgba(153, 102, 255, 2)",
          "rgba(255, 159, 64, 2)",
          "rgba(56, 43, 173)",
        ],
      },
    ],
  };
  useEffect(() => {
    dispatch(getSourceExposureCountPerClinicThunk());
    return () => {};
  }, [dispatch]);

  return <>{!loading && <Doughnut options={option} data={data} />}</>;
};
