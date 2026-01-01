import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../utils/theme';
import Button from '../components/Button';
import Card from '../components/Card';

interface Task {
  id: string;
  text: string;
}

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: '' },
    { id: '2', text: '' },
  ]);

  const MAX_TASKS = 5;
  const MIN_TASKS = 2;

  // Add new task
  const addTask = () => {
    if (tasks.length < MAX_TASKS) {
      setTasks([...tasks, { id: Date.now().toString(), text: '' }]);
    }
  };

  // Remove task
  const removeTask = (id: string) => {
    if (tasks.length > MIN_TASKS) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  // Update task text
  const updateTask = (id: string, text: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text } : task
    ));
  };

  // Get valid tasks (non-empty)
  const validTasks = tasks.filter(task => task.text.trim() !== '');
  const canProceed = validTasks.length >= MIN_TASKS;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>What's on your mind?</Text>
        <Text style={styles.subtitle}>
          Add up to {MAX_TASKS} things you're considering
        </Text>
      </View>

      <View style={styles.tasksContainer}>
        {tasks.map((task, index) => (
          <Card key={task.id} variant="default" style={styles.taskCard}>
            <View style={styles.taskRow}>
              <Text style={styles.taskNumber}>{index + 1}.</Text>
              <TextInput
                style={styles.input}
                value={task.text}
                onChangeText={(text) => updateTask(task.id, text)}
                placeholder={`Task ${index + 1}...`}
                placeholderTextColor={colors.textTertiary}
              />
              {tasks.length > MIN_TASKS && (
                <Pressable
                  onPress={() => removeTask(task.id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </Pressable>
              )}
            </View>
          </Card>
        ))}
      </View>

      {tasks.length < MAX_TASKS && (
        <Button
          title="Add Task"
          onPress={addTask}
          variant="outline"
          size="medium"
        />
      )}

      <View style={styles.info}>
        <Text style={styles.infoText}>
          {validTasks.length} of {MIN_TASKS} required tasks
        </Text>
        {!canProceed && (
          <Text style={styles.warningText}>
            You need at least {MIN_TASKS} tasks to continue
          </Text>
        )}
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
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  tasksContainer: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  taskCard: {
    marginBottom: 0,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  taskNumber: {
    ...typography.body,
    color: colors.textTertiary,
    width: 24,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    paddingVertical: spacing.sm,
  },
  removeButton: {
    padding: spacing.xs,
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    fontSize: 24,
    color: colors.error,
    lineHeight: 24,
  },
  info: {
    alignItems: 'center',
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  warningText: {
    ...typography.bodySmall,
    color: colors.error,
  },
});
