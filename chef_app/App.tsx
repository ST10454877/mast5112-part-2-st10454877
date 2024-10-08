import React, { useState } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  FlatList,
  Alert,
  ListRenderItem
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
// Will store the courses in it

interface CourseItem {
  id: number;
  name: string;
}
// Will store the store 4 items 
interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}
// Course's array, it's predefined 
const courseList: CourseItem[] = [
  { id: 0, name: 'Select Course'},
  { id: 1, name: 'Hors D`Oeuvre'},
  { id: 2, name: 'Amuse-Bouche'},
  { id: 3, name: 'Soup'},
  { id: 4, name: 'Salad'},
  { id: 5, name: 'Appetiser'},
  { id: 6, name: 'Fish'},
  { id: 7, name: 'Main'},
  { id: 8, name: 'Palate Cleanser'},
  { id: 9, name: 'Cheese'},
  { id: 10, name: 'Dessert'},
  { id: 11, name: 'Mignardise'}
];

const App: React.FC = () => {
  const [name, setName] = useState<string>(''); // State to store dish name
  const [description, setDescription] = useState<string>(''); // State to store dish description
  const [course, setCourse] = useState<number>(0); // State to store selected course (by id)
  const [price, setPrice] = useState<string>(''); // State to store price input (as string for validation)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]); // State to store the list of menu items
  
  // Function to handle saving a new menu item
  const handleSave = (): void => {
    // Validating all fields, the chef must fill all fields in order to save
    if (!name.trim() || !description.trim() || course === 0 || !price.trim()) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    // Validating if the price is a number
    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) {
      Alert.alert('Error', 'Price must be a valid number');
      return;
    }

    // Create a new menu item
    const newItem: MenuItem = {
      id: Date.now().toString(), // For the dish id (generates a unique id using current timestamp)
      name: name.trim(), // Trim any extra spaces
      description: description.trim(),
      course: courseList[course].name, // Get the course name from the selected id
      price: priceNum // Store the parsed price as a number
    };

    // Add the new item to menu items
    setMenuItems(prevItems => [...prevItems, newItem]);

    // Reset the fields to initial state
    setName('');
    setDescription('');
    setCourse(0);
    setPrice('');

    // Alert the chef when the item is added
    Alert.alert('Success', 'Menu item added successfully');
  };

  // Function to render each menu item in the list
  const renderMenuItem: ListRenderItem<MenuItem> = ({ item }) => (
    <View style={styles.menuItem}>
      <Text style={styles.menuItemName}>{item.name}</Text>
      <Text style={styles.menuItemDescription}>{item.description}</Text>
      <Text style={styles.menuItemCourse}>{item.course}</Text>
      <Text style={styles.menuItemPrice}>R{item.price.toFixed(2)}</Text>
    </View>
  );

  return(
    <View style={styles.container}>
      {/* Section for adding a new menu item */}
      <View>
        <Text style={styles.home}>Add Menu</Text>

        {/* Text input for dish name */}
        <TextInput 
          style={styles.input}
          placeholder='Dish Name'
          value={name}
          onChangeText={setName}
        />
        
        {/* Text input for dish description */}
        <TextInput 
          style={styles.input}
          placeholder='Dish Description'
          value={description}
          onChangeText={setDescription}
        />
        
        {/* Picker to select a course */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={course}
            onValueChange={(itemValue: number) => setCourse(itemValue)}
          >
            {courseList.map(courseItem => (
              <Picker.Item 
                key={courseItem.id} 
                label={courseItem.name} 
                value={courseItem.id} 
              />
            ))}
          </Picker>
        </View>
        
        {/* Text input for price (numeric keyboard) */}
        <TextInput 
          style={styles.input}
          placeholder='Price in Rands'
          value={price}
          onChangeText={setPrice}
          keyboardType='numeric' // Ensure numeric input only
        />

        {/* Button to save the menu item */}
        <TouchableHighlight 
          style={styles.addButton}
          onPress={handleSave}
        >
          <Text>Save</Text>
        </TouchableHighlight>
      </View>
      
      {/* Display the current state of the menu */}
      <Text style={styles.home}>HOME</Text>
      <Text style={styles.home}>MENU: {menuItems.length}</Text>

      {/* FlatList to render all added menu items */}
      <FlatList 
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item: MenuItem) => item.id} // Unique id for each menu item
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  home: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FED718', // Styled border color
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#FED718', 
    borderRadius: 5,   
    marginBottom: 10  
  },
  addButton: {
    backgroundColor: '#FED718',
    borderRadius: 30,
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center'
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FED718',
    marginBottom: 10,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItemDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  menuItemCourse: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default App;
