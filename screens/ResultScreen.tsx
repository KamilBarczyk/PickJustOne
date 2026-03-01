import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, typography, spacing, borderRadius } from '../utils/theme';
import { animationDurations, animationDelays } from '../utils/animations';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAppStore } from '../store/appStore';
import { calculateWinner } from '../utils/calculateWinner';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ResultScreen() {
  const { comparisonChoices, clearComparisonChoices, clearTasks } = useAppStore();
  const navigation = useNavigation<NavigationProp>();

  const winner = calculateWinner(comparisonChoices);

  const winnerOpacity = useSharedValue(0);
  const winnerScale = useSharedValue(0.9);
  const messageOpacity = useSharedValue(0);
  const messageTranslateY = useSharedValue(16);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(16);

  useEffect(() => {
    winnerOpacity.value = withTiming(1, { duration: animationDurations.slow });
    winnerScale.value = withTiming(1, { duration: animationDurations.slow });

    const messageDelay = animationDurations.slow;
    messageOpacity.value = withDelay(
      messageDelay,
      withTiming(1, { duration: animationDurations.normal })
    );
    messageTranslateY.value = withDelay(
      messageDelay,
      withTiming(0, { duration: animationDurations.normal })
    );

    const buttonsDelay = messageDelay + animationDelays.short;
    buttonsOpacity.value = withDelay(
      buttonsDelay,
      withTiming(1, { duration: animationDurations.normal })
    );
    buttonsTranslateY.value = withDelay(
      buttonsDelay,
      withTiming(0, { duration: animationDurations.normal })
    );
  }, [winner?.id]);

  const animatedWinnerStyle = useAnimatedStyle(() => ({
    opacity: winnerOpacity.value,
    transform: [{ scale: winnerScale.value }],
  }));
  const animatedMessageStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
    transform: [{ translateY: messageTranslateY.value }],
  }));
  const animatedButtonsStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsTranslateY.value }],
  }));

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

      <Animated.View style={animatedWinnerStyle}>
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
      </Animated.View>

      <Animated.View style={[styles.messageCardWrap, animatedMessageStyle]}>
        <Card variant="default">
          <Text style={styles.messageText}>
            This isn't a command—it's a reflection of your inner hierarchy. Trust yourself.
          </Text>
        </Card>
      </Animated.View>

      <Animated.View style={[styles.actionsContainer, animatedButtonsStyle]}>
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
      </Animated.View>
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
  messageCardWrap: {
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
