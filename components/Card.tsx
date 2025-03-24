import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { PressableProps } from 'react-native';

interface CardProps extends PressableProps {
  title: string;
  subtitle?: string;
  count?: number;
}

const Card = React.forwardRef<View, CardProps>(({ title, subtitle, count, ...props }, ref) => {
  return (
    <Pressable {...props}>
      <View ref={ref} style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {count !== undefined && <Text style={styles.count}>{count} scales</Text>}
      </View>
    </Pressable>
  );
});

Card.displayName = 'Card';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  count: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
  },
});

export { Card };