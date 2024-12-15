import { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import * as Location from 'expo-location';
import MapView from "react-native-maps";


import { api } from "@/services/api";

import { Places } from "@/components/places";
import { PlaceProps } from "@/components/place";
import { Categories, CategoriesProps } from "@/components/categories";

export default function Home(){

    type MarketsProps = PlaceProps

    type Location = {
        latitude: number,
        longitude: number
    }

    const [categories, setCategories] = useState<CategoriesProps>([])
    const [category, setCategory] = useState("")
    const [markets, setMarkets] = useState<MarketsProps[]>([])
    const [location, setLocation] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });

    async function fetchCategories() {
        try {
            const { data } = await api.get("/categories")
            setCategories(data)
            setCategory(data[0].id)
        } catch (error) {
            console.log(error)
            Alert.alert("Categorias", "Não foi possível carregar as categorias.")
        }
    }

    async function fetchMarkets() {
        try {            
            if(!category){
                return
            }
            const { data } = await api.get("/markets/category/" + category)
            setMarkets(data)
            
        } catch (error) {
            console.log(error)
            Alert.alert("Locais", "Não foi possível carregar os locais")
        }        
    }

    async function getCurrentLocation() {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if(granted){
                const getLocation = await Location.getCurrentPositionAsync()
                const locationFunction = {
                    latitude: getLocation.coords.latitude,
                    longitude: getLocation.coords.longitude
                }
                setLocation(locationFunction)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCurrentLocation()
        fetchCategories()
    }, [])

    useEffect(() => {
        fetchMarkets()
    }, [category])

    return <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
        <Categories 
            data={categories} 
            onSelect={setCategory} 
            selected={category} 
        />

        <MapView style={{ flex: 1 }} 
            region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
        />

        <Places data={markets} />

    </View>
}