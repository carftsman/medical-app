import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import ReportCard from '../components/ReportCard';
import SearchBar from '../components/SearchBar';
import FilterBottomSheet from '../components/FilterBottomSheet';
import { scale, verticalScale } from '../../../utils/styling';
import api from '../../../api/client';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../../../utils/helpers';
import useAuth from '../../../hooks/useAuth';

export default function ReportsTab() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [showFilter, setShowFilter] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [reportStatus, setReportStatus] = useState('*');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  const fetchReports = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      const {
        reportStatus: status = reportStatus,
        fromDate: start = fromDate,
        toDate: end = toDate,
        search = searchQuery,
      } = filters;

      const res = await api.get('/labs/reports', {
        params: {
          userId: 1,
          ...(search && { search }),
          ...(status &&
            status !== '*' && {
              reportStatus: status.toUpperCase(),
            }),
          ...(start && { fromDate: start }),
          ...(end && { toDate: end }),
        },
      });

      console.log('LAB REPORTS', res.data, user.id);

      if (res.status === 200) {
        setReports(res.data?.reports || []);
      } else {
        setError('Failed to fetch reports');
      }
    } catch (err) {
      console.log(err);
      setError('Network error. Please check internet or server.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilter = filters => {
    setReportStatus(filters.reportStatus);
    setFromDate(filters.fromDate);
    setToDate(filters.toDate);

    fetchReports(filters);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <Text style={styles.header}>Reports</Text>

        <SearchBar
          value={searchQuery}
          onChangeText={text => {
            setSearchQuery(text);
            fetchReports({ search: text });
          }}
          onFilterPress={() => setShowFilter(true)}
          onMicPress={() => console.log('Mic Clicked')}
        />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: verticalScale(100) }}
        showsVerticalScrollIndicator={false}
        
      >
        {loading && (
          <ActivityIndicator
            size="large"
            color="#1976D2"
            style={{ marginTop: 20 }}
          />
        )}

        {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}

        {!loading &&
          !error &&
          reports.map((item, index) => <ReportCard key={index} item={item} />)}

        {!loading && !error && reports.length === 0 && (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="document-text-outline"
                size={scale(36)}
                color="#1976D2"
              />
            </View>

            <Text style={styles.emptyTitle}>No lab reports available</Text>

            <Text style={styles.emptySub}>
              You don’t have any lab reports yet. Start exploring tests and book
              your first lab checkup.
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('LabsHomeScreen')}
              style={styles.exploreBtn}
            >
              <Text style={styles.exploreText}>Explore Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <FilterBottomSheet
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={handleApplyFilter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: scale(14),
    paddingTop: verticalScale(10),
  },
  name: {
    paddingHorizontal: scale(14),
  },
  header: {
    fontSize: scale(19),
    fontWeight: '700',
    color: '#000',
    marginBottom: verticalScale(6),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(80),
    paddingHorizontal: scale(30),
  },
  emptyIcon: {
    backgroundColor: '#E3F2FD',
    padding: scale(18),
    borderRadius: scale(50),
    marginBottom: verticalScale(12),
  },
  emptyTitle: {
    fontSize: scale(14),
    fontWeight: '600',
    color: '#000',
    marginBottom: verticalScale(6),
  },
  emptySub: {
    fontSize: scale(12),
    color: '#777',
    textAlign: 'center',
    marginBottom: verticalScale(14),
  },
  exploreBtn: {
    backgroundColor: '#1976D2',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(8),
  },
  exploreText: {
    color: '#fff',
    fontSize: scale(13),
    fontWeight: '600',
  },
});
