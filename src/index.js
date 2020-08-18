import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `New project ${Date.now()}`,
            owner: "Matheus Afonso"
        });

        setProjects([...projects, response.data]);
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            
            <SafeAreaView style={styles.container}>
                <FlatList 
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item: project }) => (
                        <Text key={project.id} style={styles.project}>{project.title}</Text>
                    )}
                />

                <TouchableOpacity onPress={handleAddProject} activeOpacity={0.6} style={styles.button}>
                    <Text style={styles.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },

    project: {
        color: '#fff',
        fontSize: 30
    },

    button: {
        backgroundColor: "#fff",
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        fontWeight: "bold",
        fontSize: 16,
    }
});