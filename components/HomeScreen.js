import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Svg, Circle, Path } from 'react-native-svg';


export default function HomeScreen() {
  const [numProfsInscrits, setNumProfsInscrits] = useState(0);
  const [specialites, setSpecialites] = useState([]);
  const [villesDemandees, setVillesDemandees] = useState([]);
  const [numProfsParGrade, setNumProfsParGrade] = useState([]);

 
  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then((response) => response.json())
      .then((data) => {
        setNumProfsInscrits(data.length);
        setSpecialites(calculateProfessorsBySpeciality (data));
        setVillesDemandees(calculateMostDemandedCities (data));
        setNumProfsParGrade(calculateProfessorsByGrade(data));
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
      });
  }, []);

  const calculateProfessorsBySpeciality= (data) => {
    const specialitesCount = {};
    data.forEach((prof) => {
      const specialite = prof.specialite;
      if (specialite in specialitesCount) {
        specialitesCount[specialite] += 1;
      } else {
        specialitesCount[specialite] = 1;
      }
    });
    return Object.entries(specialitesCount)
      .map(([label, value], index) => ({
        label,
        value,
        color:getSpecialityColors(index),
      }))
      .sort((a, b) => b.value - a.value) 
      .slice(0, 13);
  };

  const calculateMostDemandedCities  = (data) => {
    const villesCount = {};
    data.forEach((prof) => {
      const villeDemandee = prof.villeDesiree;
      if (villeDemandee in villesCount) {
        villesCount[villeDemandee] += 1;
      } else {
        villesCount[villeDemandee] = 1;
      }
    });

    return Object.entries(villesCount)
      .map(([label, value], index) => ({
        label,
        value,
        color:getCityColors(index),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); 
  };

  const calculateProfessorsByGrade = (data) => {
    const gradesCount = {};
    data.forEach((prof) => {
      const grade = prof.grade;
      if (grade in gradesCount) {
        gradesCount[grade] += 1;
      } else {
        gradesCount[grade] = 1;
      }
    });
    return Object.entries(gradesCount).map(([label, value], index) => ({
      label,
      value,
      color: getGradeColors(index),
    }));
  };

  const renderPieChart = (data) => {
    const radius = 80;
    const centerX = 100;
    const centerY = 100;

    let total = 0;
    data.forEach((item) => {
      total += item.value;
    });

    let startAngle = 0;
    const arcs = data.map((item, index) => {
      const endAngle = startAngle + (item.value / total) * 360;

      const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
      const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
      const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
      const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

      const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

      const pathData = `M${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} L${centerX},${centerY}`;

      const arc = (
        <Path key={item.label} d={pathData} fill={item.color} />
      );

      startAngle = endAngle;

      return arc;
    });

    return (
      <Svg width="200" height="200">
        <Circle cx={centerX} cy={centerY} r={radius} fill="#ffffff" />
        {arcs}
      </Svg>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.infoText}>Nombre de professeurs inscrits : {numProfsInscrits}</Text>

        <View style={styles.svgContainer}>
          <Text style={styles.svgtTitle}>Nombre de professeus par spécialité</Text>
          {renderPieChart(specialites)}
          <View style={styles.colorLegendContainer}>
            {specialites.map((item, index) => (
              <View key={index} style={styles.colorLegend}>
                <View style={[styles.colorIndicator, { backgroundColor: item.color }]}></View>
                <Text style={styles.colorLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.svgContainer}>
          <Text style={styles.svgtTitle}>Villes les plus demandées</Text>
          {villesDemandees.length > 0 ? (
            renderPieChart(villesDemandees)
          ) : (
            <Text>Aucune donnée disponible pour les villes demandées.</Text>
          )}
          <View style={styles.colorLegendContainer}>
            {villesDemandees.map((item, index) => (
              <View key={index} style={styles.colorLegend}>
                <View style={[styles.colorIndicator, { backgroundColor: item.color }]}></View>
                <Text style={styles.colorLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.svgContainer}>
          <Text style={styles.svgtTitle}>Nombre de professeurs par grade</Text>
          {renderPieChart(numProfsParGrade)}
          <View style={styles.colorLegendContainer}>
            {numProfsParGrade.map((item, index) => (
              <View key={index} style={styles.colorLegend}>
                <View style={[styles.colorIndicator, { backgroundColor: item.color }]}></View>
                <Text style={styles.colorLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statContainer}>
          <Text style={styles.statTitle}>les 10 spécialités les plus répartu</Text>
          {specialites.map((item, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statValue}>{item.value}</Text>
              
            </View>
            
          ))}
        </View><View style={styles.statContainer}>
  <Text style={styles.statTitle}>Villes les plus demandées</Text>
  {villesDemandees.slice(0, 15).map((item, index) => (
    <View key={index} style={styles.statItem}>
      <Text style={styles.statLabel}>{item.label}</Text>
      <Text style={styles.statValue}>{item.value}</Text>
    </View>
  ))}
</View>
  <View style={styles.statContainer}>
          <Text style={styles.statTitle}>Nombre de professeurs par grade</Text>
          {numProfsParGrade.map((item, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statValue}>{item.value}</Text>
            </View>
          ))}

        
        
      </View>
      </View>
      
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  
  infoText: {
    fontSize: 20,
    marginBottom: 16,
    color:'red'
  },
  svgContainer: {
    marginBottom: 24,
  },
  svgtTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  colorLegendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  colorLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  colorLabel: {
    fontSize: 14,
  },
  statContainer: {
    marginTop: 24,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
const getSpecialityColors = (index) => {
  const specialityColors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099'];
  return specialityColors [index % specialityColors.length];
};
const getGradeColors= (index) => {
  const gradeColors = ['#FFC300', '#FF5733', '#C70039', '#900C3F', '#581845'];
    return gradeColors[index % gradeColors.length];
};
const getCityColors= (index) => {
  const cityColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    return cityColors[index % cityColors.length];
};