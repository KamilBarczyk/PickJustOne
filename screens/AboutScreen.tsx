import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import Card from '../components/Card';
import { colors, typography, spacing } from '../utils/theme';

export default function AboutScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      
      <Card variant="default" style={styles.card}>
        <Text style={styles.description}>
          Pick Just One helps you make conscious decisions by focusing on one choice at a time.
        </Text>
        <Text style={styles.description}>
          Instead of long to-do lists, we help you pick just one priority right now.
        </Text>
      </Card>
      
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
        variant="outline"
        size="medium"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    marginBottom: spacing.lg,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'left',
    marginBottom: spacing.md,
  },
});
