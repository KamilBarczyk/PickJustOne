import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../utils/theme';
import Card from '../components/Card';
import { Task, useAppStore } from '../store/appStore';
import { generateRandomizedPairs } from '../utils/pairwiseComparison';

export default function ComparisonScreen() {
  const { tasks } = useAppStore();
  const [pairs, setPairs] = useState<[Task, Task][]>([]);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const validTasks = tasks.filter((task: Task) => task.text.trim() !== '' || task.isRest);
    if (validTasks.length >= 2) {
      const generatedPairs = generateRandomizedPairs(validTasks);
      setPairs(generatedPairs);
      setCurrentPairIndex(0);
      setSelectedTasks([]);
    }
  }, [tasks]);

  const currentPair = pairs[currentPairIndex];
  const progress = currentPairIndex + 1;
  const total = pairs.length;

  const handleTaskChoice = (selectedTask: Task) => {
    if (!currentPair) return;

    // Store selected task for winner calculation
    setSelectedTasks([...selectedTasks, selectedTask]);

    // Move to next pair, or finish if this was the last comparison
    if (currentPairIndex < pairs.length - 1) {
      setCurrentPairIndex(currentPairIndex + 1);
    } else {
      // All pairs compared - ready for result calculation
      console.log('All comparisons done!', selectedTasks);
    }
  };

  if (!currentPair) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>
          Please add at least 2 tasks to start comparison
        </Text>
      </View>
    );
  }

  const [taskA, taskB] = currentPair;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Comparison {progress} of {total}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(progress / total) * 100}%` }
            ]} 
          />
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          Right now,{'\n'}
          <Text style={styles.questionSubtext}>what is more important to you?</Text>
        </Text>
      </View>

      <View style={styles.choicesContainer}>
        <Pressable
          onPress={() => handleTaskChoice(taskA)}
          style={({ pressed }) => [
            styles.choiceCard,
            pressed && styles.choiceCardPressed,
          ]}
        >
          <Card variant="elevated" style={styles.cardContent}>
            {taskA.isRest && (
              <View style={styles.restIconContainer}>
                <Text style={styles.restIcon}>☕</Text>
              </View>
            )}
            <Text style={styles.choiceText}>{taskA.text}</Text>
          </Card>
        </Pressable>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <Pressable
          onPress={() => handleTaskChoice(taskB)}
          style={({ pressed }) => [
            styles.choiceCard,
            pressed && styles.choiceCardPressed,
          ]}
        >
          <Card variant="elevated" style={styles.cardContent}>
            {taskB.isRest && (
              <View style={styles.restIconContainer}>
                <Text style={styles.restIcon}>☕</Text>
              </View>
            )}
            <Text style={styles.choiceText}>{taskB.text}</Text>
          </Card>
        </Pressable>
      </View>

      <Text style={styles.reminder}>
        There's no wrong answer. Trust your instincts.
      </Text>
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
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.md,
  },
  progressText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 320,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  questionText: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 32,
  },
  questionSubtext: {
    color: colors.textSecondary,
    fontWeight: '300',
  },
  choicesContainer: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  choiceCard: {
    borderRadius: borderRadius.lg,
  },
  choiceCardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  cardContent: {
    padding: spacing.lg,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  restIconContainer: {
    marginBottom: spacing.sm,
  },
  restIcon: {
    fontSize: 32,
  },
  choiceText: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 32,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginVertical: spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    ...typography.bodySmall,
    color: colors.textTertiary,
    fontWeight: '300',
  },
  reminder: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: spacing.md,
  },
});
