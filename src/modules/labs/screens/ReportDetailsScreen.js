import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import DetailHeader from '../components/DetailHeader';
import InfoCard from '../components/InfoCard';
import TestResultBox from '../components/TestResultBox';
import ReportList from '../components/ReportList';
import PrimaryButton from '../components/PrimaryButton';
import { scale, verticalScale } from '../../../utils/styling';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../../../api/client';

export default function ReportDetailsScreen({ route }) {
  const id = route?.params?.id || 2;
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchReportDetails();
  }, []);

  const fetchReportDetails = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/labs/reports/${id}/details`);

      setReport(response.data);
    } catch (error) {
      console.log('API Error:', error?.response || error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';

    const date = new Date(dateString);
    if (isNaN(date)) return '-';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  if (!report) {
    return (
      <View style={styles.loader}>
        <Text>No Report Found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F6F8' }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.header}>Detailed Report</Text>
            <View style={{ width: 24 }} />
          </View>

          <DetailHeader
            testName={report.packageName}
            labName={report.labName}
          />

          {/* Dates With Icons */}
          <View style={styles.row}>
            <InfoCard
              label="Collected Date"
              value={formatDate(report.collectedDate)}
              icon={
                <Ionicons
                  name="calendar-outline"
                  size={24}
                  color="#1976D2"
                />
              }
            />

            <InfoCard
              label="Reports Issued"
              value={formatDate(report.issuedDate)}
              icon={
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color="#1976D2"
                />
              }
            />
          </View>

  
          <Text style={styles.section}>Samples Collected</Text>
           <View style={styles.sampleRow}>
  {report.samplesCollected?.map((sample, index) => {
    let iconName = 'flask-outline';
    let iconColor = '#1976D2';

    if (sample?.toLowerCase().includes('blood')) {
      iconName = 'water-outline';
      iconColor = '#D32F2F';
    } else if (sample?.toLowerCase().includes('urine')) {
      iconName = 'beaker-outline';
      iconColor = '#F9A825';
    }

    return (
      <View key={index} style={styles.sampleCard}>
        <Ionicons name={iconName} size={18} color={iconColor} />
        <Text style={styles.sampleText}>{sample}</Text>
      </View>
    );
  })}
</View>

          

          <Text style={styles.section}>Test Result</Text>
          <TestResultBox summary={report.resultSummary} />

          <View style={styles.reportHeader}>
            <Text style={styles.section}>Reports</Text>
            <Text style={styles.download}>Download All</Text>
          </View>

          <ReportList reports={report.reports} />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Feedback', {
                id: report.bookingId,
              })
            }
          >
            <Text style={styles.rate}>
              Rate Your Experience →
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <PrimaryButton title="Rebook Test" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    padding: scale(14),
  },
  header: {
    fontSize: scale(17),
    fontWeight: '700',
    marginBottom: verticalScale(10),
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(12),
  },
  row: {
    flexDirection: 'row',
  },
  section: {
    fontSize: scale(14),
    fontWeight: '600',
    marginTop: verticalScale(15),
    marginBottom: verticalScale(5),
  },
  sub: {
    fontSize: scale(13),
    color: '#666',
    marginTop: verticalScale(12),
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5),
  },
  download: {
    fontSize: scale(13),
    color: '#1976D2',
    fontWeight: '600',
    marginTop: verticalScale(10),
  },
  rate: {
    textAlign: 'center',
    marginTop: verticalScale(18),
    color: '#1976D2',
    fontSize: scale(17),
    fontWeight: '600',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sampleRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: verticalScale(5),
},

sampleCard: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: scale(10),
  borderRadius: scale(8),
  marginRight: scale(8),
},

sampleText: {
  fontSize: scale(13),
  marginLeft: scale(6),
  color: '#333',
  fontWeight: '500',
},

});
