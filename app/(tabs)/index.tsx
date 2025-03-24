import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card } from '@/components/Card';
import { SearchBar } from '@/components/SearchBar';
import { Menu } from '@/components/Menu';
import { useState } from 'react';
import { Menu as MenuIcon, ListStart, Clock } from 'lucide-react-native';

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.title}>Escalas Médicas</Text>
          <Text style={styles.subtitle}>DeepLuxMed.mx</Text>
        </View>
        <TouchableOpacity 
          onPress={() => setMenuVisible(true)} 
          style={styles.menuButton}
        >
          <MenuIcon size={24} color="#0891b2" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SearchBar />

        {/* Recently Used Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Usado Recientemente</Text>
            <TouchableOpacity 
              onPress={() => router.push('/scales/recent')}
              style={styles.seeAllButton}
            >
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentScroll}>
            <TouchableOpacity onPress={() => router.push('/scales/barthel')}>
              <Card 
                title="Barthel Index" 
                subtitle="Funcional"
                style={[styles.recentCard, {backgroundColor: '#0891b2'}]}
                textColor="#ffffff"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/scales/mmse')}>
              <Card 
                title="MMSE" 
                subtitle="Cognitivo"
                style={styles.recentCard}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/scales/borg-scale')}>
              <Card 
                title="Borg Scale" 
                subtitle="Respiratorio"
                style={styles.recentCard}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Popular Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorías Populares</Text>
            <TouchableOpacity 
              onPress={() => router.push('/categories')}
              style={styles.seeAllButton}
            >
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryGrid}>
            <TouchableOpacity onPress={() => router.push('/scales?category=functional')}>
              <Card 
                title="Funcional" 
                count={15} 
                style={styles.categoryCard}
                icon="body-outline"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/scales?category=cognitive')}>
              <Card 
                title="Cognitivo" 
                count={12} 
                style={styles.categoryCard}
                icon="brain-outline"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/scales?category=geriatric')}>
              <Card 
                title="Geriátrico" 
                count={8} 
                style={styles.categoryCard}
                icon="people-outline"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/scales?category=pediatric')}>
              <Card 
                title="Pediátrico" 
                count={10} 
                style={styles.categoryCard}
                icon="child-outline"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Scale Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Escala Destacada</Text>
          <TouchableOpacity 
            onPress={() => router.push('/scales/barthel')}
            style={styles.featuredSection}
          >
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>Escala de Barthel</Text>
              <Text style={styles.featuredDescription}>
                Evaluación estandarizada del nivel de independencia en actividades básicas de la vida diaria.
              </Text>
              <View style={styles.featuredMeta}>
                <View style={styles.metaItem}>
                  <ListStart size={16} color="#64748b" />
                  <Text style={styles.featuredMetaText}>10 items</Text>
                </View>
                <View style={styles.metaItem}>
                  <Clock size={16} color="#64748b" />
                  <Text style={styles.featuredMetaText}>5-15 min</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.featuredButton}>
                <Text style={styles.featuredButtonText}>Iniciar Evaluación</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Menu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  seeAllButton: {
    padding: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: '#0891b2',
    fontWeight: '500',
  },
  recentScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  recentCard: {
    marginRight: 12,
    width: 160,
    borderRadius: 12,
    padding: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 4,
  },
  featuredSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredContent: {
    padding: 20,
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 16,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featuredMetaText: {
    fontSize: 14,
    color: '#64748b',
  },
  featuredButton: {
    backgroundColor: '#0891b2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});