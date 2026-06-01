import React, { useState } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { store, RootState, AppDispatch } from '../store/store';
import { updateUser } from '../store/userSlice';

function AccountScreenInner() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const insets = useSafeAreaInsets();

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({ name: '', email: '', role: '' });

  if (!user.isLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  const handleEdit = () => {
    setDraft({ name: user.name, email: user.email, role: user.role });
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateUser(draft));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <LinearGradient
      colors={['#e0e7ff', '#f0f4ff', '#ffffff']}
      locations={[0, 0.5, 1]}
      style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={[styles.container, { paddingTop: insets.top }]}>

        <Text style={styles.screenLabel}>Account Screen</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Account Details</Text>
            {!isEditing && (
              <TouchableOpacity onPress={handleEdit}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={draft.name}
                onChangeText={text => setDraft(d => ({ ...d, name: text }))}
                autoCapitalize="words"
              />
            ) : (
              <Text style={styles.value}>{user.name}</Text>
            )}
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={draft.email}
                onChangeText={text => setDraft(d => ({ ...d, email: text }))}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <Text style={styles.value}>{user.email}</Text>
            )}
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Role</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={draft.role}
                onChangeText={text => setDraft(d => ({ ...d, role: text }))}
                autoCapitalize="words"
              />
            ) : (
              <Text style={styles.value}>{user.role}</Text>
            )}
          </View>

          <View style={styles.divider} />

          <View>
            <Text style={styles.label}>Token</Text>
            <Text style={styles.token}>{user.token}</Text>
          </View>

          <Text style={styles.hint}>Token passed from native layer</Text>

          {isEditing && (
            <View style={styles.actions}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

      </View>
    </LinearGradient>
  );
}

export default function AccountScreen() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AccountScreenInner />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    color: '#6366f1',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  editButton: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
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
  },
  input: {
    color: '#1e293b',
    fontSize: 14,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: '#6366f1',
    paddingVertical: 2,
    minWidth: 160,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 12,
  },
  token: {
    color: '#6366f1',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 6,
  },
  hint: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 16,
    textAlign: 'right',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e7ff',
  },
  cancelText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#6366f1',
  },
  saveText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
