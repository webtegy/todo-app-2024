import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Linking,
  Alert,
  TextInput,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function SettingsScreen() {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  const [feedback, setFeedback] = useState('');

  const handleContactUsPress = () => {
    const email = 'support@yourcompany.com'; // Replace with your actual support email
    const subject = 'Customer Support Request';
    const body = feedback || 'Hi, I need help with...';

    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url).catch((err) => {
      Alert.alert('Error', 'Unable to open email client.'); // Error handling in case email app is not available
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: form.darkMode ? '#333' : '#fff' }}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: form.darkMode ? '#fff' : '#9e9e9e' }]}>Preferences</Text>
          
          {/* Dark Mode Toggle */}
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
              <FeatherIcon color="#fff" name="moon" size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: form.darkMode ? '#fff' : '#0c0c0c' }]}>Dark Mode</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={() => setForm({ ...form, darkMode: !form.darkMode })}
              value={form.darkMode}
            />
          </View>
          
          {/* Email Notifications Toggle */}
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
              <FeatherIcon color="#fff" name="at-sign" size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: form.darkMode ? '#fff' : '#0c0c0c' }]}>Email Notifications</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={emailNotifications => setForm({ ...form, emailNotifications })}
              value={form.emailNotifications}
            />
          </View>
          
          {/* Push Notifications Toggle */}
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
              <FeatherIcon color="#fff" name="bell" size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: form.darkMode ? '#fff' : '#0c0c0c' }]}>Push Notifications</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={pushNotifications => setForm({ ...form, pushNotifications })}
              value={form.pushNotifications}
            />
          </View>
        </View>

        {/* Feedback Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: form.darkMode ? '#fff' : '#9e9e9e' }]}>Feedback</Text>
          <TextInput
            style={[styles.feedbackInput, { backgroundColor: form.darkMode ? '#555' : '#f2f2f2', color: form.darkMode ? '#fff' : '#000' }]}
            placeholder="Write your feedback here..."
            placeholderTextColor={form.darkMode ? '#ccc' : '#aaa'}
            multiline
            numberOfLines={4}
            onChangeText={setFeedback}
            value={feedback}
          />
          <TouchableOpacity onPress={handleContactUsPress} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </View>

        {/* Resources Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: form.darkMode ? '#fff' : '#9e9e9e' }]}>Resources</Text>
          <TouchableOpacity onPress={handleContactUsPress} style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
              <FeatherIcon color="#fff" name="mail" size={20} />
            </View>
            <Text style={[styles.rowLabel, { color: form.darkMode ? '#fff' : '#0c0c0c' }]}>Contact Us</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  feedbackInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#007afe',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
