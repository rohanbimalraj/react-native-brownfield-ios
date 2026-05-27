import React, { useState } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppDispatch, RootState } from '../store/store';
import { setPhoneNumber, setDeviceId, setPincode } from '../store/userSlice';
import NativeUserModule from '../../specs/NativeUserModule';
import { useUserNativeEvent } from '../hooks/useUserNativeEvent';

export default function HomeScreen() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const insets = useSafeAreaInsets();
  const [isFetchingDeviceId, setIsFetchingDeviceId] = useState(false);

  // Sync call
  const handleFetchPhoneNumber = () => {
    const phoneNumber = NativeUserModule?.getPhoneNumber() ?? '';
    dispatch(setPhoneNumber(phoneNumber));
  };

  // Async call
  const handleFetchDeviceId = async () => {
    setIsFetchingDeviceId(true);
    try {
      const deviceId = await NativeUserModule?.getDeviceId();
      dispatch(setDeviceId(deviceId ?? ''));
    } catch (e) {
      console.warn('Failed to fetch device ID', e);
    } finally {
      setIsFetchingDeviceId(false);
    }
  };

  // Native event
  useUserNativeEvent<{ pincode: string }>('pincodeUpdated', (data) => {
    dispatch(setPincode(data.pincode));
  });

  return (
    <LinearGradient
      colors={['#e0e7ff', '#f0f4ff', '#ffffff']}
      locations={[0, 0.5, 1]}
      style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.screenLabel}>Home Screen</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>User Info</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user.name}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Role</Text>
            <Text style={styles.value}>{user.role}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Phone</Text>
            {user.phoneNumber ? (
              <Text style={styles.value}>{user.phoneNumber}</Text>
            ) : (
              <TouchableOpacity onPress={handleFetchPhoneNumber} style={styles.fetchButton}>
                <Text style={styles.fetchButtonText}>Get from Native</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Device ID</Text>
            {user.deviceId ? (
              <Text style={styles.value}>{user.deviceId}</Text>
            ) : isFetchingDeviceId ? (
              <ActivityIndicator size="small" color="#6366f1" />
            ) : (
              <TouchableOpacity onPress={handleFetchDeviceId} style={styles.fetchButton}>
                <Text style={styles.fetchButtonText}>Get from Native</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Pincode</Text>
            <Text style={styles.value}>{user.pincode || '—'}</Text>
          </View>

          <View style={styles.divider} />

          <View>
            <Text style={styles.label}>Token</Text>
            <Text style={styles.token}>{user.token}</Text>
          </View>

          <Text style={styles.hint}>Token passed from native layer</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingBottom: 60,
  },
  screenLabel: {
    color: '#4f46e5',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.3,
    textAlign: 'center',
    marginBottom: 28,
  },
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e7ff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  cardTitle: {
    color: '#6366f1',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: {
    color: '#94a3b8',
    fontSize: 14,
  },
  value: {
    color: '#1e293b',
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
    marginLeft: 8,
    textAlign: 'right',
  },
  token: {
    color: '#6366f1',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 12,
  },
  hint: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 16,
    textAlign: 'right',
  },
  fetchButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  fetchButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
