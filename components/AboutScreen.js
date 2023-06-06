import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Plateforme de Permutation pour Enseignants Universitaires</Text>
      <Text style={styles.description}>
        Cette plateforme est simplement un espace permettant aux professeurs universitaires de rechercher un partenaire pour une permutation. Elle se limite à cette fonctionnalité. Les enseignants peuvent rechercher des partenaires intéressés par un échange dans d'autres établissements d'enseignement supérieur. Le système facilite la recherche et la correspondance entre les enseignants ayant une volonté mutuelle d'échanger.
      </Text>
      <Text style={styles.description}>
        La plateforme offre une interface conviviale et sécurisée aux enseignants pour communiquer et échanger les informations nécessaires. Les membres peuvent créer des profils personnels et renseigner des informations concernant leurs spécialités, les établissements et les informations de contact. Les enseignants peuvent consulter les profils des partenaires potentiels et entrer en contact avec eux pour discuter des détails de l'accord d'échange.
      </Text>
      <Text style={styles.description}>
        En utilisant cette plateforme, les enseignants peuvent faciliter leur recherche de partenaires d'échange, économiser du temps et des efforts en évitant les communications individuelles et les recherches continues d'opportunités d'échange. Ce système est efficace et utile pour les enseignants souhaitant changer d'institution ou travailler dans un nouvel établissement pour élargir leur expérience académique.
      </Text>
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  bottomSpace: {
    height: 200, 
  },
});

export default AboutScreen;
