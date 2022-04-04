import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenderCountPerClinicThunk,
  getGenderCountThunk,
} from "../../redux/slices/AnalyticsSlice";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
export const ClinicGenderCountGraph = () => {
  const dispatch = useDispatch();
  const { loading, clinic_GenderCount } = useSelector(
    (state) => state.analytics
  );
  const label = [];
  clinic_GenderCount &&
    clinic_GenderCount.map(
      (sex) => !label.includes(sex._id) && label.push(sex._id)
    );
  const option = {
    parsing: {
      key: "count",
      name: "_id",
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Bite Cases per Gender",
      },
    },
  };
  const data = {
    labels: label,
    datasets: [
      {
        label: "Bite Case per Gender",
        data: clinic_GenderCount ? clinic_GenderCount : [],
        backgroundColor: ["rgba(25, 20, 20, 2)","rgba(255, 128, 138,2)",],
      },
    ],
  };
  useEffect(() => {
    dispatch(getGenderCountPerClinicThunk());
    return () => {};
  }, [dispatch]);

  return <>{!loading && <Doughnut options={option} data={data} />}</>;
};

export const GenderCountGraph = () => {
  const dispatch = useDispatch();
  const { loading, genderCount } = useSelector((state) => state.analytics);
  const label = [];
  genderCount && genderCount.map((sex) => label.push(sex._id));
  const option = {
    parsing: {
      key: "count",
      name: "_id",
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Bite Cases per Gender",
      },
    },
  };
  const data = {
    labels: label,
    datasets: [
      {
        label: "Bite Case per Gender",
        data: genderCount ? genderCount : [],
        backgroundColor: ["rgba(56, 43, 173)", "rgba(255, 128, 138, 2)"],
      },
    ],
  };
  useEffect(() => {
    dispatch(getGenderCountThunk());
    return () => {};
  }, [dispatch]);

  return <>{!loading && <Doughnut options={option} data={data} />}</>;
};
