import React, { useCallback, useMemo, useRef, memo } from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, Platform, FlatList } from 'react-native';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { X, ChevronRight, ListStart, Brain, Activity, Heart, Stethoscope, Baby } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface MenuProps {
  visible: boolean;
  onClose: () => void;
}

interface Category {
  id: string;
  title: string;
  description: string;
  route: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  color: string;
}

const CATEGORIES: Category[] = [
  {
    id: 'alphabetical',
    title: 'Escalas por Nombre',
    description: 'Listado completo ordenado alfabéticamente',
    route: '/scales/alfabetico',
    icon: ListStart,
    color: '#0891b2'
  },
  {
    id: 'functional',
    title: 'Escalas Funcionales',
    description: 'Evaluación de capacidades y actividades diarias',
    route: '/scales/funcional',
    icon: Activity,
    color: '#0d9488'
  },
  {
    id: 'cognitive',
    title: 'Escalas Cognitivas',
    description: 'Evaluación de funciones mentales y comportamiento',
    route: '/scales/cognitive',
    icon: Brain,
    color: '#6366f1'
  },
  {
    id: 'cardiovascular',
    title: 'Escalas Cardiovasculares',
    description: 'Evaluación de riesgo y función cardíaca',
    route: '/scales/cardiovascular',
    icon: Heart,
    color: '#ec4899'
  },
  {
    id: 'respiratory',
    title: 'Escalas Respiratorias',
    description: 'Evaluación de función y capacidad pulmonar',
    route: '/scales/respiratory',
    icon: Stethoscope,
    color: '#8b5cf6'
  },
  {
    id: 'pediatric',
    title: 'Escalas Pediátricas',
    description: 'Evaluaciones específicas para población infantil',
    route: '/scales/pediatric',
    icon: Baby,
    color: '#f59e0b'
  }
];

// Componente memoizado para cada elemento de categoría
const CategoryItem = memo(({ category, index, onPress }: { 
  category: Category; 
  index: number; 
  onPress: (route: string) => void;
}) => (
  <Animated.View
    key={category.id}
    entering={FadeInDown.delay(index * 100)}
    style={styles.categoryContainer}
  >
    <Pressable
      style={styles.categoryButton}
      onPress={() => onPress(category.route)}
      accessible={true}
      accessibilityLabel={category.title}
      accessibilityHint={category.description}
      accessibilityRole="button"
    >
      <View style={[styles.iconContainer, { backgroundColor: `${category.color}20` }]}>
        <category.icon size={24} color={category.color} />
      </View>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <Text style={styles.categoryDescription}>{category.description}</Text>
      </View>
      <ChevronRight size={20} color="#64748b" />
    </Pressable>
  </Animated.View>
));

CategoryItem.displayName = 'CategoryItem';

export function Menu({ visible, onClose }: MenuProps) {
  const { height } = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['60%', '85%'], []);

  const handleCategoryPress = useCallback((route: string) => {
    onClose();
    router.push(route);
  }, [onClose]);

  // Efecto para presentar/descartar el bottomSheet
  React.useEffect(() => {
    if (Platform.OS !== 'web' && visible) {
      bottomSheetRef.current?.present();
    } else if (Platform.OS !== 'web') {
      bottomSheetRef.current?.dismiss();
    }
  }, [visible]);

  // Renderizador optimizado para FlatList
  const renderItem = useCallback(({ item, index }: { item: Category; index: number }) => (
    <CategoryItem category={item} index={index} onPress={handleCategoryPress} />
  ), [handleCategoryPress]);

  const keyExtractor = useCallback((item: Category) => item.id, []);

  // Renderizado para web
  if (Platform.OS === 'web') {
    if (!visible) return null;

    return (
      <View style={styles.webOverlay}>
        <View style={styles.webModal}>
          <View style={styles.header}>
            <Text style={styles.title}>Categorías de Escalas</Text>
            <Pressable 
              onPress={onClose} 
              style={styles.closeButton}
              accessible={true}
              accessibilityLabel="Cerrar"
              accessibilityRole="button"
            >
              <X size={24} color="#64748b" />
            </Pressable>
          </View>

          <FlatList
            data={CATEGORIES}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.content}
          />
        </View>
      </View>
    );
  }

  // Renderizado para dispositivos móviles
  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onDismiss={onClose}
      backgroundStyle={styles.modalBackground}
      handleIndicatorStyle={styles.indicator}
      enablePanDownToClose={true}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Categorías de Escalas</Text>
        <Pressable 
          onPress={onClose} 
          style={styles.closeButton}
          accessible={true}
          accessibilityLabel="Cerrar"
          accessibilityRole="button"
        >
          <X size={24} color="#64748b" />
        </Pressable>
      </View>

      <BottomSheetFlatList
        data={CATEGORIES}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.content}
      />
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  webOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  webModal: {
    width: '90%',
    maxWidth: 500,
    maxHeight: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
  },
  modalBackground: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  indicator: {
    backgroundColor: '#cbd5e1',
    width: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  content: {
    padding: 20,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});