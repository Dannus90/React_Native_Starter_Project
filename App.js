/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, View, Button, FlatList} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

import {} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  console.log(courseGoals);

  const addGoalHandler = goalTitle => {
    if (goalTitle.length === 0) {
      return;
    }
    setCourseGoals(currentGoals => [
      ...currentGoals,
      {id: Math.random().toString(), value: goalTitle},
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId);
    });
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };
  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionHandler}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            onDelete={removeGoalHandler}
            id={itemData.item.id}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});

export default App;
