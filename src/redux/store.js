import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/UserSlices";
import AdminReducer from "./slices/AdminSlices";
import AnalyticsReducer from "./slices/AnalyticsSlice";
import PetReducer from "./slices/PetSlice";
import InventoryReducer from "./slices/InventorySlice";
import VaccineReducer from "./slices/VaccineSlice";
import BiteCaseReducer from "./slices/BiteCaseSlice";
import AppointmentReducer from "./slices/AppointmentSlice";
import AnnouncementReducer from "./slices/AnnouncementSlice";
import ClinicReducer from "./slices/Clinic";
export const store = configureStore({
  reducer: {
    user: UserReducer,
    pets: PetReducer,
    vaccine: VaccineReducer,
    inventory: InventoryReducer,
    bitecase: BiteCaseReducer,
    appointments: AppointmentReducer,
    admin: AdminReducer,
    announcement: AnnouncementReducer,
    cases: BiteCaseReducer,
    category: BiteCaseReducer,
    gender: BiteCaseReducer,
    allgender: BiteCaseReducer,
    analytics: AnalyticsReducer,
    clinic: ClinicReducer,
  },
});

export default store;
