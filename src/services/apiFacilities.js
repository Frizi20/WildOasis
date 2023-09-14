import supabase from "./supabase";

export async function getFacilities(id) {
    const { data, error } = await supabase
        .from("facilities")
        .select("*");

    if (error) {
        console.error(error);
        throw new Error("Could not get facilities");
    }

    return data;
}
