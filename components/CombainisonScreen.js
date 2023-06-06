import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';

const Combinaison = () => {
  const [professors, setProfessors] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [specialites, setSpecialites] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs');
      const jsonData = await response.json();
      setProfessors(jsonData);

      const uniqueSpecialites = [...new Set(jsonData.map((item) => item.specialite))];
      setSpecialites(uniqueSpecialites);
    } catch (error) {
      console.error(error);
    }
  };

  const filterProfessorsBySpeciality = () => {
    if (selectedSpeciality === '') {
      return professors;
    }
    return professors.filter((professor) => professor.specialite === selectedSpeciality);
  };

  const renderNodes = () => {
    const filteredProfessors = filterProfessorsBySpeciality();

    return filteredProfessors.map((professor, index) => {
      // Generate random positions for the nodes
      const cx = Math.random() * 300 + 50;
      const cy = Math.random() * 300 + 50;

      // Generate random colors for the circles
      const colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00', '#00FFFF'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      return {
        id: professor.id,
        cx,
        cy,
        color: randomColor,
        professor,
        ville: professor.ville,
      };
    });
  };

  const renderLinks = () => {
    const filteredProfessors = filterProfessorsBySpeciality();
    const nodes = renderNodes();

    const links = [];

    filteredProfessors.forEach((_, index) => {
      const sourceNodeIndex = index;
      const targetNodeIndex = index === filteredProfessors.length - 1 ? 0 : index + 1;

      const sourceNode = nodes[sourceNodeIndex];
      const targetNode = nodes[targetNodeIndex];

      if (sourceNode.professor.ville === targetNode.professor.ville) {
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00', '#00FFFF'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        links.push({
          source: sourceNode,
          target: targetNode,
          color: randomColor,
        });
      }
    });

    return links.map((link, index) => (
      <Line
        key={index}
        x1={link.source.cx}
        y1={link.source.cy}
        x2={link.target.cx}
        y2={link.target.cy}
        stroke={link.color}
      />
    ));
  };

  const handleSpecialityChange = (value) => {
    setSelectedSpeciality(value);
    setSelectedProfessor(null);
  };

  const handleCirclePress = (professor) => {
    setSelectedProfessor(professor);
  };

  return (
    <View style={styles.container}>
      <Text>Spécialité :</Text>
      <Picker selectedValue={selectedSpeciality} onValueChange={handleSpecialityChange}>
        <Picker.Item label="Toutes les spécialités" value="" />
        {specialites.map((specialite, index) => (
          <Picker.Item key={index} label={specialite} value={specialite} />
        ))}
      </Picker>
      <Svg width="100%" height="100%">
        {renderLinks()}
        {renderNodes().map((node) => (
          <Circle
            key={node.id}
            cx={node.cx}
            cy={node.cy}
            r={10}
            fill={node.color}
            onPress={() => handleCirclePress(node.professor)}
          />
        ))}
      </Svg>
      {selectedProfessor && (
        <View>
          <Text>Nom du professeur : {selectedProfessor.nom}</Text>
          <Text>Spécialité : {selectedProfessor.specialite}</Text>
          {/* Affichez d'autres informations sur le professeur ici */}
        </View>
      )}
      <Text>Les cercles représentent les professeurs par spécialité</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Combinaison;
