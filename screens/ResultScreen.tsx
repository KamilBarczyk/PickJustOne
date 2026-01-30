import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, typography, spacing, borderRadius } from '../utils/theme';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAppStore } from '../store/appStore';
import { calculateWinner } from '../utils/calculateWinner';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ResultScreen() {
  const { comparisonChoices, clearComparisonChoices, clearTasks } = useAppStore();
  const navigation = useNavigation<NavigationProp>();

  const winner = calculateWinner(comparisonChoices);

  const handleStartOver = () => {
    clearComparisonChoices();
    clearTasks();
    navigation.navigate('Home');
  };

  const handleNewComparison = () => {
    clearComparisonChoices();
    navigation.navigate('Tasks');
  };

  if (!winner) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>
          No result available. Please complete comparisons first.
        </Text>
        <Button
          title="Go to Tasks"
          onPress={() => navigation.navigate('Tasks')}
          variant="primary"
          size="medium"
        />
      </View>
    );
  }

  const isRest = winner.isRest;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Priority Right Now</Text>
      </View>

      <Card variant="elevated" style={styles.winnerCard}>
        <View style={styles.winnerIconContainer}>
          <Text style={styles.winnerIcon}>{isRest ? '☕' : '✨'}</Text>
        </View>
        
        <Text style={styles.winnerText}>{winner.text}</Text>
        
        {isRest && (
          <Text style={styles.restMessage}>
            Rest is not laziness. It's a conscious choice.
          </Text>
        )}
      </Card>

      <Card variant="default" style={styles.messageCard}>
        <Text style={styles.messageText}>
          This isn't a command—it's a reflection of your inner hierarchy. Trust yourself.
        </Text>
      </Card>

      <View style={styles.actionsContainer}>
        <Button
          title="Start New Decision"
          onPress={handleStartOver}
          variant="primary"
          size="medium"
        />
        <Button
          title="Compare Again"
          onPress={handleNewComparison}
          variant="outline"
          size="medium"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    textAlign: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  winnerCard: {
    alignItems: 'center',
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  winnerIconContainer: {
    marginBottom: spacing.md,
  },
  winnerIcon: {
    fontSize: 48,
  },
  winnerText: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 36,
  },
  restMessage: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: spacing.md,
  },
  messageCard: {
    marginBottom: spacing.lg,
  },
  messageText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  actionsContainer: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
});
