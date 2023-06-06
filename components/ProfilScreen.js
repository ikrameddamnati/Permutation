import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const ProfilScreen = ({ currentUser }) => {
  const handleModifier = () => {
    // Logique pour gérer la modification des informations du profil
    // Cela peut inclure l'affichage d'un formulaire de modification ou la navigation vers un écran de modification
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`https://tiny-worm-nightgown.cyclic.app/professeurs/${profileData.email}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Compte supprimé avec succès');
        // Ajoutez ici votre logique pour rediriger ou effectuer d'autres actions après la suppression du compte
      } else {
        const error = await response.json();
        console.error('Erreur lors de la suppression du compte:', error.message);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (!currentUser || !currentUser.email) {
    // Rendu d'une interface de secours si currentUser ou email n'est pas disponible
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{currentUser.email}</Text>

        <Text style={styles.label}>Nom:</Text>
        <Text style={styles.text}>{currentUser.nom}</Text>

        <Text style={styles.label}>Prénom:</Text>
        <Text style={styles.text}>{currentUser.prenom}</Text>

        <Text style={styles.label}>Téléphone:</Text>
        <Text style={styles.text}>{currentUser.tel}</Text>

        <Text style={styles.label}>Grade:</Text>
        <Text style={styles.text}>{currentUser.grade}</Text>

        <Text style={styles.label}>Spécialité:</Text>
        <Text style={styles.text}>{currentUser.specialite}</Text>

        <Text style={styles.label}>Faculté actuelle:</Text>
        <Text style={styles.text}>{currentUser.faculteActuelle}</Text>

        <Text style={styles.label}>Ville de la faculté actuelle:</Text>
        <Text style={styles.text}>{currentUser.villeFaculteActuelle}</Text>

        <Text style={styles.label}>Villes désirées:</Text>
        <Text style={styles.text}>{currentUser.villeDesiree}</Text>

        <View style={styles.buttonContainer}>
          <Button title="Modifier" onPress={handleModifier} />
          <Button title="Supprimer" onPress={handleDeleteAccount} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ProfilScreen;
