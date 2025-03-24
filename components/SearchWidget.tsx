import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Search as SearchIcon, ArrowRight } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

// Temporary data - replace with API call
const QUICK_RESULTS = [
  { id: 'barthel', name: 'Escala de Barthel', category: 'Functional' },
  { id: 'mmse', name: 'Mini-Mental State Examination', category: 'Cognitive' },
  { id: 'borg', name: 'Escala de Borg', category: 'Respiratory' },
];

interface SearchWidgetProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export function SearchWidget({ onSearch, placeholder = 'Search medical scales...' }: SearchWidgetProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = useCallback((text: string) => {
    setQuery(text);
    onSearch?.(text);
  }, [onSearch]);

  const handleResultPress = useCallback((scaleId: string) => {
    router.push(`/scales/${scaleId}`);
  }, []);

  const handleViewAll = useCallback(() => {
    router.push({
      pathname: '/search',
      params: { q: query }
    });
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchIcon size={20} color="#64748b" />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={query}
          onChangeText={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholderTextColor="#94a3b8"
        />
      </View>

      {isFocused && query.length > 0 && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          layout={Layout}
          style={styles.resultsContainer}
        >
          {QUICK_RESULTS.map(result => (
            <Pressable
              key={result.id}
              style={styles.resultItem}
              onPress={() => handleResultPress(result.id)}
            >
              <View>
                <Text style={styles.resultName}>{result.name}</Text>
                <Text style={styles.resultCategory}>{result.category}</Text>
              </View>
              <ArrowRight size={16} color="#64748b" />
            </Pressable>
          ))}
          
          <Pressable style={styles.viewAllButton} onPress={handleViewAll}>
            <Text style={styles.viewAllText}>View all results</Text>
            <ArrowRight size={16} color="#0891b2" />
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#0f172a',
  },
  resultsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginTop: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
  },
  resultName: {
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 2,
  },
  resultCategory: {
    fontSize: 14,
    color: '#64748b',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    marginTop: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: '#0891b2',
    fontWeight: '500',
  },
});