import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, typography, spacing, borderRadius } from '../utils/theme';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAppStore, Task } from '../store/appStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function TasksScreen() {
  // Use global state instead of local state
  const { tasks, setTasks, addTask, removeTask, updateTask } = useAppStore();
  const navigation = useNavigation<NavigationProp>();
  
  // Initialize with 2 empty tasks if store is empty
  useEffect(() => {
    if (tasks.length === 0) {
      setTasks([
        { id: '1', text: '' },
        { id: '2', text: '' },
      ]);
    }
  }, []);

  const MAX_TASKS = 5;
  const MIN_TASKS = 2;

  // Add new task
  const handleAddTask = () => {
    if (tasks.length < MAX_TASKS) {
      addTask({ id: Date.now().toString(), text: '' });
    }
  };

  const addRestOption = () => {
    const hasRest = tasks.some((task: Task) => task.isRest);
    if (!hasRest && tasks.length < MAX_TASKS) {
      addTask({ id: 'rest', text: 'Rest', isRest: true });
    }
  };

  // Remove task
  const handleRemoveTask = (id: string) => {
    if (tasks.length > MIN_TASKS) {
      removeTask(id);
    }
  };

  // Update task text (but not for Rest option)
  const handleUpdateTask = (id: string, text: string) => {
    updateTask(id, text);
  };

  const validTasks = tasks.filter((task: Task) => 
    task.text.trim() !== '' || task.isRest
  );
  const canProceed = validTasks.length >= MIN_TASKS;
  const hasRest = tasks.some((task: Task) => task.isRest);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}
    >
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
      <View style={styles.header}>
        <Text style={styles.title}>What's on your mind?</Text>
        <Text style={styles.subtitle}>
          Add up to {MAX_TASKS} things you're considering
        </Text>
        <Text style={styles.philosophy}>
          Pick Just One helps you focus on what matters most right now.
        </Text>
      </View>

      <View style={styles.tasksContainer}>
        {tasks.map((task: Task, index: number) => (
          <Card 
            key={task.id} 
            variant="default" 
            style={task.isRest ? { ...styles.taskCard, ...styles.restCard } : styles.taskCard}
          >
            <View style={styles.taskRow}>
              <Text style={[
                styles.taskNumber,
                task.isRest && styles.restNumber
              ]}>
                {task.isRest ? '☕' : `${index + 1}.`}
              </Text>
              {task.isRest ? (
                <View style={styles.restContainer}>
                  <Text style={styles.restText}>{task.text}</Text>
                  <Text style={styles.restSubtext}>
                    Rest is not laziness. It's a conscious choice.
                  </Text>
                </View>
              ) : (
                <TextInput
                  style={styles.input}
                  value={task.text}
                  onChangeText={(text) => handleUpdateTask(task.id, text)}
                  placeholder={`Task ${index + 1}...`}
                  placeholderTextColor={colors.textTertiary}
                />
              )}
              {tasks.length > MIN_TASKS && (
                <Pressable
                  onPress={() => handleRemoveTask(task.id)}
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
        <View style={styles.addButtonsContainer}>
          <Button
            title="Add Task"
            onPress={handleAddTask}
            variant="outline"
            size="medium"
          />
          {!hasRest && (
            <Button
              title="Add Rest Option"
              onPress={addRestOption}
              variant="secondary"
              size="medium"
            />
          )}
        </View>
      )}

      {canProceed && (
        <Button
          title="Start Comparison"
          onPress={() => navigation.navigate('Comparison')}
          variant="primary"
          size="large"
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl, // Extra padding for keyboard
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
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    lineHeight: typography.body.lineHeight, // Use original line height
    color: colors.text,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    minHeight: 44, // Standard touch target
    includeFontPadding: false, // Remove extra font padding on Android
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
  philosophy: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: spacing.sm,
  },
  restCard: {
    backgroundColor: '#FFF9E6',
    borderColor: '#FFE066',
  },
  restContainer: {
    flex: 1,
  },
  restText: {
    ...typography.body,
    color: '#B8860B',
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  restSubtext: {
    ...typography.caption,
    color: '#D4A017',
    fontStyle: 'italic',
  },
  restNumber: {
    fontSize: 20,
  },
  addButtonsContainer: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
});
