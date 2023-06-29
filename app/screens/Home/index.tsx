import {
  FlatList,
  Image,
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
      <View style={styles.header}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder='Adicione uma nova tarefa'
            placeholderTextColor='#6B6B6B'
            onChangeText={setTaskName}
            value={taskName}
          />

          <TouchableOpacity style={styles.button} onPress={handleAddTask}>
            <Image source={require('../../../assets/plus.png')} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.createdText}>Criadas</Text>
          <View style={styles.taskCounter}>
            <Text style={styles.counterText}>{tasks.length}</Text>
          </View>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.finishedText}>Concluídas</Text>
          <View style={styles.taskCounter}>
            <Text style={styles.counterText}>{checkedQuantity}</Text>
          </View>
        </View>
      </View>

      <View style={styles.hairlineWidth} />

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../../../assets/clipboard.png')}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>
            Você ainda não tem tarefas cadastradas
          </Text>
          <Text style={styles.emptyTextSub}>
            Crie tarefas e organize seus itens a fazer{' '}
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.taskList}
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
      )}
    </View>
  );
};
