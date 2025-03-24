import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Search as SearchIcon, SlidersHorizontal, X, ChevronRight } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

// Temporary data - replace with API call
const SCALES = [
  {
    id: 'barthel',
    name: 'Escala de Barthel',
    category: 'Functional',
    description: 'Evaluación de independencia en actividades diarias',
    imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&auto=format&fit=crop&q=60',
    tags: ['ADL', 'Functional', 'Independence'],
    popularity: 98
  },
  {
    id: 'mmse',
    name: 'Mini-Mental State Examination',
    category: 'Cognitive',
    description: 'Evaluación del estado cognitivo',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=60',
    tags: ['Cognitive', 'Mental Health', 'Screening'],
    popularity: 95
  },
  {
    id: 'borg',
    name: 'Escala de Borg',
    category: 'Respiratory',
    description: 'Medición de esfuerzo percibido',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60',
    tags: ['Respiratory', 'Effort', 'Exercise'],
    popularity: 90
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All Scales' },
  { id: 'functional', name: 'Functional' },
  { id: 'cognitive', name: 'Cognitive' },
  { id: 'respiratory', name: 'Respiratory' },
  { id: 'pain', name: 'Pain' },
  { id: 'neurological', name: 'Neurological' }
];

const SORT_OPTIONS = [
  { id: 'alphabetical', name: 'A-Z' },
  { id: 'popularity', name: 'Most Popular' },
  { id: 'recent', name: 'Recently Updated' }
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const filteredScales = SCALES.filter(scale => {
    const matchesSearch = scale.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scale.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scale.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || scale.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
    if (sortBy === 'popularity') return b.popularity - a.popularity;
    return 0;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medical scales..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#94a3b8"
          />
          {searchQuery ? (
            <Pressable onPress={() => setSearchQuery('')}>
              <X size={20} color="#64748b" />
            </Pressable>
          ) : null}
        </View>
        <Pressable style={styles.filterButton} onPress={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal size={20} color="#64748b" />
        </Pressable>
      </View>

      {showFilters && (
        <Animated.View 
          entering={FadeIn}
          exiting={FadeOut}
          layout={Layout}
          style={styles.filtersContainer}
        >
          <Text style={styles.filterTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {CATEGORIES.map(category => (
              <Pressable
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.categoryChipSelected
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category.id && styles.categoryChipTextSelected
                  ]}
                >
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <Text style={styles.filterTitle}>Sort By</Text>
          <View style={styles.sortOptions}>
            {SORT_OPTIONS.map(option => (
              <Pressable
                key={option.id}
                style={[
                  styles.sortChip,
                  sortBy === option.id && styles.sortChipSelected
                ]}
                onPress={() => setSortBy(option.id)}
              >
                <Text
                  style={[
                    styles.sortChipText,
                    sortBy === option.id && styles.sortChipTextSelected
                  ]}
                >
                  {option.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      )}

      <ScrollView style={styles.content}>
        <View style={styles.resultsGrid}>
          {filteredScales.map(scale => (
            <Link href={`/scales/${scale.id}`} asChild key={scale.id}>
              <Pressable style={styles.scaleCard}>
                <View style={styles.imageContainer}>
                  <View style={styles.image} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.scaleName}>{scale.name}</Text>
                  <Text style={styles.scaleDescription} numberOfLines={2}>
                    {scale.description}
                  </Text>
                  <View style={styles.tags}>
                    {scale.tags.slice(0, 2).map(tag => (
                      <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.cardFooter}>
                    <Text style={styles.categoryText}>{scale.category}</Text>
                    <ChevronRight size={16} color="#64748b" />
                  </View>
                </View>
              </Pressable>
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0f172a',
    marginLeft: 8,
    marginRight: 8,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  categoryScroll: {
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#0891b2',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#64748b',
  },
  categoryChipTextSelected: {
    color: '#ffffff',
  },
  sortOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  sortChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  sortChipSelected: {
    backgroundColor: '#0891b2',
  },
  sortChipText: {
    fontSize: 14,
    color: '#64748b',
  },
  sortChipTextSelected: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  resultsGrid: {
    padding: 16,
    gap: 16,
  },
  scaleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    height: 160,
    backgroundColor: '#f1f5f9',
  },
  image: {
    flex: 1,
    backgroundColor: '#e2e8f0',
  },
  cardContent: {
    padding: 16,
  },
  scaleName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  scaleDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#64748b',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 14,
    color: '#0891b2',
    fontWeight: '500',
  },
});