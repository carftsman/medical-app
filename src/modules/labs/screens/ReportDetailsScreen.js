import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import DetailHeader from '../components/DetailHeader';
import InfoCard from '../components/InfoCard';
import TestResultBox from '../components/TestResultBox';
import ReportList from '../components/ReportList';
import PrimaryButton from '../components/PrimaryButton';
import { scale, verticalScale } from '../../../utils/styling';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatDate } from '../../../utils/helpers';
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

     const response = await api.get(
  `/labs/reports/${id}/details`
);
   const formatDate = (dateString) => {
  if (!dateString) return '-';

  const date = new Date(dateString);

  if (isNaN(date)) return '-';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};


      setReport(response.data);
    } catch (error) {
      console.log('API Error:', error?.response || error);
    } finally {
      setLoading(false);
    }
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
console.log("rd",report);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F6F8' }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
         
  {/* <Text style={styles.header}>Detailed Report</Text> */}
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
            // status={report.reportStatus}

          />

          {/* Dates */}
          <View style={styles.row}>
            <InfoCard
              label="Collected Date"
              // value={new Date(report.collectedDate).toLocaleDateString()}
              value={formatDate(report.collectedDate)}

            />
            <InfoCard
              label="Reports Issued"
              // value={new Date(report.issuedDate).toLocaleDateString()}
             value={formatDate(report.issuedDate)}


            />
          </View>
          <Text style={styles.section}>Samples Collected</Text>
          <Text style={styles.sub}>{report.samplesCollected
?.join(', ')}</Text>

          <Text style={styles.section}>Test Result</Text>
          <TestResultBox summary={report.resultSummary} />
          <View style={styles.reportHeader}>
            <Text style={styles.section}>Reports</Text>
            <Text style={styles.download}>Download All</Text>
          </View>

          <ReportList reports={report.reports} />
          <TouchableOpacity onPress={() => navigation.navigate('Feedback',
            {id:report.bookingId}
          )}>
          <Text style={styles.rate}>Rate Your Experience →</Text>
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
    marginBottom: verticalScale(10),
  },
  section: {
    fontSize: scale(14),
    fontWeight: '600',
    marginTop: verticalScale(10),
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
    marginTop: verticalScale(12),
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
});  