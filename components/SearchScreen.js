import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet ,ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Card } from 'react-native-elements';

function PermutationApp() {
  const [speciality, setSpeciality] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [desiredCity, setDesiredCity] = useState('');
  const [professors, setProfessors] = useState([]);
  const [permutations, setPermutations] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [cities, setCities] = useState([]);
  const [showPermutations, setShowPermutations] = useState(false);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const response = await fetch('https://tiny-worm-nightgown.cyclic.app/professeurs');
      const data = await response.json();
      setProfessors(data);

      // Extraire toutes les spécialités uniques
      const uniqueSpecialities = [...new Set(data.map(professor => professor.specialite))];
      setSpecialities(uniqueSpecialities);

      // Extraire toutes les villes actuelles et désirées uniques
      const uniqueCities = [
        ...new Set([
          ...data.map(professor => professor.villeFaculteActuelle),
          ...data.reduce((accumulator, professor) => accumulator.concat(professor.villeDesiree.split(';')), [])
        ])
      ];
      setCities(uniqueCities);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des données:", error);
    }
  };

  const generatePermutations = (professors, depth, currentProfessor) => {
    if (depth === 0 || professors.length === 0) {
      return [[]];
    }
  
    const permutations = [];
  
    for (let i = 0; i < professors.length; i++) {
      const professor = professors[i];
  
      if (professor.specialite === currentProfessor.specialite) {
        if (
          professor.villeFaculteActuelle !== currentProfessor.villeDesiree &&
          professor.villeDesiree !== currentProfessor.villeFaculteActuelle
        ) {
          const remainingProfessors = [...professors.slice(0, i), ...professors.slice(i + 1)];
  
          const subPermutations = generatePermutations(remainingProfessors, depth - 1, professor);
  
          for (const subPermutation of subPermutations) {
            permutations.push([professor, ...subPermutation]);
          }
        }
      }
    }
  
    return permutations;
  };

  const handleGeneratePermutations = () => {
    // Filtrer les professeurs en fonction de la spécialité, de la ville actuelle et de la ville désirée
    const filteredProfessors = professors.filter(
      (professor) =>
        professor.specialite === speciality &&
        professor.villeFaculteActuelle === desiredCity &&
        professor.villeDesiree.includes(currentCity)
    );
  
    const generatedPermutations = generatePermutations(
      filteredProfessors,
      6,
      filteredProfessors[0]
    );
  
    setPermutations(generatedPermutations);
    setShowPermutations(true);
  };
  
  return (
    
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title style={styles.title}>Permutation des professeurs</Card.Title>
        <View style={styles.pickerContainer}>
          <Text style={styles.title1}>Spécialité:</Text>
          <Picker
            style={styles.picker}
            selectedValue={speciality}
            onValueChange={(value) => setSpeciality(value)}
          >
            <Picker.Item label="Sélectionnez une spécialité" value="" />
            {specialities.map((speciality, index) => (
              <Picker.Item key={index} label={speciality} value={speciality} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.title1}>Ville actuelle:</Text>
          <Picker
            style={styles.picker}
            selectedValue={currentCity}
            onValueChange={(value) => setCurrentCity(value)}
          >
            <Picker.Item label="Sélectionnez une ville actuelle" value="" />
            {cities.map((city, index) => (
              <Picker.Item key={index} label={city} value={city} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.title1}>Ville désirée:</Text>
          
          <Picker
            style={styles.picker}
            selectedValue={desiredCity}
            onValueChange={(value) => setDesiredCity(value)}
          >
            <Picker.Item label="Sélectionnez une ville désirée" value="" />
            {cities.map((city, index) => (
              <Picker.Item key={index} label={city} value={city} />
            ))}
          </Picker>
        </View>
        <Button
          title="Consulter les permutations"
          onPress={handleGeneratePermutations}
        />
        {showPermutations && (
          <View>
            <Text style={styles.resultTitle}>Résultats des permutations :</Text>
            {permutations.length > 0 ? (
              <View>
                {permutations.map((permutation, index) => (
                  <View key={index}>
                    {permutation.map((professor, professorIndex) => (
                      <Text key={professorIndex} style={styles.permutationText}>
                        {professor.nom} - {professor.email}
                        {professorIndex !== permutation.length - 1 && <Text> | </Text>}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            ) : (
              <View>
                <Text>Aucune permutation disponible.</Text>
              </View>
            )}
          </View>
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
  },
  card:{
    padding: 4,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  title1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  picker: {
    height: 40,
    borderWidth: 8,
    borderColor: 'red',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  permutationText: {
    marginBottom: 4,
  },
});

export default PermutationApp;
