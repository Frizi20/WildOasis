import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from("cabins")
        .select("*,reviews(*), cabins_facilities(facilities(*)), images(*)")
        .order("id", { ascending: false });

    if (error) {
        console.error(error);
        throw new Error("Cabbins could not be loaded");
    }
    return data;
}

export async function deleteCabin(id) {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }
}

export async function createEditCabin(newCabin, id) {
    let newFacilities = newCabin.facilities;
    
    newCabin.facilities && delete newCabin.facilities;
    newCabin.cabins_facilities && delete newCabin.cabins_facilities;
    newCabin?.reviews && delete newCabin.reviews;

    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );

    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create cabin
    let query = supabase.from("cabins");

    // A) CREATE
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B) UPDATE
    if (id)
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

    const { error, data } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }

    // 2a. Update cabin facilities

    const facilities = newFacilities.map((facility) => {
        return {
            facility_id: Number(facility),
            cabin_id: Number(id || data.id),
        };
    });

    await supabase.from("cabins_facilities").delete().eq("cabin_id", id);

    const { error: savingFacilitiesError, data: savedFacilities } =
        await supabase.from("cabins_facilities").insert(facilities).select();
        
    // 2. Upload image

    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // 4. Delete cabin if there was an storage error

    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
            "Cabin image could not be uploaded and the cabin was not created"
        );
    }

    return data;
}

export async function getCabin(id) {
    const { data: cabin, error } = await supabase
        .from("cabins")
        .select("*,profile(*), reviews(*,profile(display_name,avatar)),cabins_facilities(facilities(*)),images(*)")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Cabin not found");
    }


    return cabin;
}
