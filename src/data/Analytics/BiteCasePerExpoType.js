import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getExposureCountPerClinicThunk,
  getSourceExposureCountPerClinicThunk,
} from "../../redux/slices/AnalyticsSlice";
import "chart.js/auto";
import { Doughnut, Pie } from "react-chartjs-2";
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
          "rgba(247, 125, 125, 2)",
          "rgba(243, 39, 39, 2)",
          "rgba(252, 216, 216, 2)",
          "rgba(25, 20, 20, 2)",
        ],
      },
    ],
  };
  useEffect(() => {
    dispatch(getExposureCountPerClinicThunk());
    return () => {};
  }, [dispatch]);

  return <>{!loading && <Pie options={option} data={data} />}</>;
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
        text: "Bite Cases per Source of Exposure",
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
          "rgba(247, 125, 125, 2)", //cat
          "rgba(243, 39, 39, 2)", //dog
          "rgba(252, 216, 216, 2)", //others
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
