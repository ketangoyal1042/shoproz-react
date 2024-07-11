import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
    const [category, setCategory] = useState([]);

    //get the category
    const getCategories = async () => {
        try {
            const { data } = await axios.get(`/api/v1/category/get-category`);
            if (data?.success) {
                setCategory(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return category;
}