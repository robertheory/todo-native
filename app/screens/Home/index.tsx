import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import { TaskItem } from '../../components/Task';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type Task = {
  id: string;
  name: string;
  checked: boolean;
};

export const Home = () => {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    if (taskName === '') {
      return;
    }

    const newTask: Task = {
      id: String(Math.random()),
      name: taskName,
      checked: false,
    };

    setTasks([...tasks, newTask]);
    setTaskName('');
  };

  const handleCheckTask = (id: string) => {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      return;
    }

    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          checked: !task.checked,
        };
      }

      return task;
    });

    setTasks(newTasks);
  };

  const handleRemoveTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
  };

  const checkedQuantity = tasks.filter((task) => task.checked).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do Native</Text>

      {tasks.length === 0 ? (
        <View style={styles.progress}>
          <Text style={styles.progressText}>Nenhuma tarefa ainda</Text>
        </View>
      ) : checkedQuantity === tasks.length ? (
        <View style={styles.progress}>
          <Text style={styles.progressText}>Todas tarefas concluídas! 🎉</Text>
        </View>
      ) : (
        <View style={styles.progress}>
          <Text style={styles.progressText}>Tarefas concluídas</Text>
          <Text style={styles.progressText}>
            {checkedQuantity} de {tasks.length}
          </Text>
        </View>
      )}

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Nome da atividade'
          placeholderTextColor='#6B6B6B'
          onChangeText={setTaskName}
          value={taskName}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            name={item.name}
            checked={item.checked}
            onCheck={() => handleCheckTask(item.id)}
            onRemove={() => handleRemoveTask(item.id)}
          />
        )}
      />
    </View>
  );
};
