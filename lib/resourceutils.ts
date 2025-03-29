import { ref, set, update, onValue, push, remove } from 'firebase/database';
import { realtimeDB } from './firebase';

// Ambulance Resource Management
export const updateAmbulanceStatus = async (ambulanceId: string, status: any) => {
  const ambulanceRef = ref(realtimeDB, `resources/ambulances/${ambulanceId}`);
  await update(ambulanceRef, {
    ...status,
    lastUpdated: new Date().toISOString()
  });
};

// Hospital Bed Tracking
export const updateHospitalBeds = async (hospitalId: string, bedData: any) => {
  const hospitalRef = ref(realtimeDB, `hospitals/${hospitalId}`);
  await update(hospitalRef, bedData);
};

// Emergency Dispatch Tracking
export const createEmergencyDispatch = async (emergencyData: any) => {
  const emergencyRef = ref(realtimeDB, 'emergencies');
  const newEmergencyRef = push(emergencyRef);
  await set(newEmergencyRef, {
    ...emergencyData,
    timestamp: new Date().toISOString(),
    status: 'pending'
  });
  return newEmergencyRef.key;
};

// Real-time Listener Example
export const trackAmbulanceStatus = (ambulanceId: string, callback: (data: any) => void) => {
  const ambulanceRef = ref(realtimeDB, `resources/ambulances/${ambulanceId}`);
  return onValue(ambulanceRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};