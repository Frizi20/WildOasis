import supabase from "./supabase";

export async function createReview({ rating, comment, userId, cabinId }) {
    const { data, error } = await supabase
        .from("reviews")
        .insert([{ rating, comment, userId, cabinId }])
        .select()
        .single();

    if (error) throw new Error(error);

    return data;
}
