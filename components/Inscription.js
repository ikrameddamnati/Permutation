import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import MultipleSelect from 'react-native-multiple-select';

const Inscription = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [grades, setGrades] = useState([]);
  const [faculte, setFaculte] = useState('');
  const [villes, setVilles] = useState([]);
  const [grade, setGrade] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [villeActuelle, setVilleActuelle] = useState('');
  const [villeDesiree, setVilleDesiree] = useState([]);
  const [villesSelectionnees, setVillesSelectionnees] = useState([]);

  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        const uniqueGrades = [...new Set(data.map(professeur => professeur.grade))];
        const uniqueSpecialites = [...new Set(data.map(professeur => professeur.specialite))];
        setGrades(uniqueGrades);
        setSpecialite(uniqueSpecialites);
        setVilles([...new Set(data.flatMap(professeur => professeur.villeDesiree.split(';')))]);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);

  const validateFields = () => {
    // Effectuer des vérifications sur les champs du formulaire ici
    return true;
  };

  const addProfessor = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const idsVillesSelectionnees = villeDesiree;

      const response = await fetch('https://tiny-worm-nightgown.cyclic.app/professeurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: nom,
          prenom: prenom,
          tel: telephone,
          email: email,
          grade: grade,
          specialite: specialite,
          faculteActuelle: faculte,
          villeFaculteActuelle: villeActuelle,
          villeDesiree: idsVillesSelectionnees.join(';'),
          password: motDePasse,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Professor added successfully:', data);
        resetFields(); // Réinitialiser les valeurs des champs après l'inscription réussie
      } else {
        const error = await response.json();
        console.error('Failed to add professor:', error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetFields = () => {
    setNom('');
    setPrenom('');
    setTelephone('');
    setEmail('');
    setMotDePasse('');
    setGrade('');
    setSpecialite('');
    setFaculte('');
    setVilleActuelle('');
    setVilleDesiree([]);
    setVillesSelectionnees([]);
  };

  const handleInscription = () => {
    addProfessor();
  };

  useEffect(() => {
    const villesSelectionnees = villeDesiree.map(selectedId => {
      const selectedVille = villes.find(ville => ville.id === selectedId);
      return selectedVille ? selectedVille.name : '';
    });

    setVillesSelectionnees(villesSelectionnees);
  }, [villeDesiree, villes]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={nom}
          onChangeText={text => setNom(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={prenom}
          onChangeText={text => setPrenom(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Téléphone"
          value={telephone}
          onChangeText={text => setTelephone(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={motDePasse}
          onChangeText={text => setMotDePasse(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Faculté actuelle"
          value={faculte}
          onChangeText={text => setFaculte(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Grade"
          value={grade}
          onChangeText={text => setGrade(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Spécialité"
          value={specialite}
          onChangeText={text => setSpecialite(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ville actuelle"
          value={villeActuelle}
          onChangeText={text => setVilleActuelle(text)}
        />
        <MultipleSelect
          style={styles.input}
          items={villes.map((villeItem, index) => ({
            id: index.toString(),
            name: villeItem,
          }))}
          selectedItems={villeDesiree}
          onSelectedItemsChange={selectedItems => setVilleDesiree(selectedItems)}
          uniqueKey="id"
          displayKey="name"
          searchInputPlaceholderText="Rechercher des villes..."
          tagRemoveIconColor="gray"
          tagBorderColor="gray"
          tagTextColor="gray"
          selectedItemTextColor="gray"
          selectedItemIconColor="gray"
          itemTextColor="black"
          searchInputStyle={{ color: 'gray' }}
          submitButtonColor="gray"
          submitButtonText="Valider"
        />
        <View style={styles.selectedCitiesContainer}>
          <Text style={styles.selectedCitiesTitle}>Villes sélectionnées :</Text>
          {villesSelectionnees.map((ville, index) => (
            <Text key={index} style={styles.selectedCity}>
              {ville}
            </Text>
          ))}
        </View>
        <Button title="S'inscrire" onPress={handleInscription} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  selectedCitiesContainer: {
    marginTop: 10,
  },
  selectedCitiesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectedCity: {
    fontSize: 14,
    marginBottom: 2,
  },
});

export default Inscription;
